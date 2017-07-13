import express from 'express';
import mysql from 'mysql';
import Promise from 'bluebird';
import passport from 'passport';
import multer from 'multer';
import fs from 'fs';
import gm from 'gm';
import crypto from 'crypto';
import sha512 from 'sha512';

import dbconfig from '../dbinfo/database';

const router = new express.Router();

const conn = mysql.createConnection(dbconfig);

const getHisCount = (username) =>{
  return new Promise((resolve, reject)=>{
    let sql = "select count(hisnum)as count from history where username=? and `read`=0";
    let params = [username];
    conn.query(sql, params, (err, rows) =>{
      if(err) {
        reject(err);
      }
        resolve(rows[0].count);
    });
  })
}

const getFollower = (username) =>{
  return new Promise((resolve, reject)=>{
    let sql = "select follower from follower where username=?";
    let params = [username];
    conn.query(sql, params, (err, rows) =>{
      if(err) {
        reject(err);
      }
      const follower = [];
      rows.forEach((row)=>{
        follower.push(row.follower)
      })
      resolve(follower);
    });
  })
}

const getFollowing = (username) =>{
  return new Promise((resolve, reject)=>{
    let sql = "select following from following where username=?";
    let params = [username];
    conn.query(sql, params, (err, rows) =>{
      if(err) {
        reject(err);
      }
        const following = [];
        rows.forEach((row)=>{
          following.push(row.following)
        })
        resolve(following);
    });
  })
}

router.get('/check', async (req, res) => {
    let user = null;
    let followInfo = null;
    let hiscount = null;
    if (req.user) {
        const { username, name, nickname, profileimgname, intro, email, phone, gender, website, state} = req.user;
        user = {
            username,
            name,
            nickname,
            profileimgname,
            intro,
            email,
            phone,
            gender,
            website,
            state,
        };
        const hiscount=await getHisCount(req.user.username);
        const follower=await getFollower(req.user.username);
        const following=await getFollowing(req.user.username);
        followInfo ={
          follower: follower,
          following: following
        }
        res.json({sessionID: req.sessionID, user, followInfo, hiscount: hiscount, logged: true});
    }
    else{
      res.json({logged: false});
    }
});

router.get('/checkUserName/:username', async (req, res) => {
    let sql = "select username from member where username=?";
    let params = [req.params.username];
    conn.query(sql, params, function(err, rows) {
      if(err) {
        return res.status(500).json({message: err.message});
      }
      if(rows.length === 0){
        return res.json({possible: true});
      }
      else{
        return res.json({possible: false});
      }
    });
});

router.get('/checkNickName/:nickname', async (req, res) => {
    let sql = "select nickname from member where nickname=?";
    let params = [req.params.nickname];
    conn.query(sql, params, function(err, rows) {
      if(err) {
        return res.status(500).json({code: err.code, message: err.message});
      }
      if(rows.length === 0){
        return res.json({possible: true});
      }
      else{
        return res.json({possible: false});
      }
    });
});

router.get('/facebook',
  passport.authenticate('facebook',
    {authType: 'rerequest', scope: ['public_profile', 'email']}
));

router.get('/facebook/callback',
  passport.authenticate('facebook',
    {failureRedirect: '/api/auth/failure'}), (req, res) => {
      res.redirect('/api/auth/success');
});

router.get('/success', (req, res) => {
    let url = req.protocol + '://' + req.get('host');
    if (process.env.NODE_ENV === 'development') {
        url = url.replace(process.env.PORT, process.env.DEVPORT);
    }
    if(!req.user) {
        return res.redirect(url + '/auth/failure');
    }
    if (req.user.username !== null) {
        res.redirect(url + '/auth/success');
    } else {
        res.redirect(url + '/auth/register');
    }
});

router.get('/failure', (req, res) => {
    let url = req.protocol + '://' + req.get('host');
    url = url.replace(process.env.PORT, process.env.DEVPORT);
    if (process.env.NODE_ENV === 'development') {
        res.redirect(url + '/auth/failure');
    }
});


router.post('/signup', async (req, res, next) => {
  passport.authenticate('local-register', (err, user, info) => {
    if (err) {
      return res.status(500).json({code: err.code, message: err.message});
    }

    if(info){
      return res.json({...info});
    }
    req.login(user, (err) => {
        if (err) {
            return res.status(500).json({code: err.code, message: err.message});
        }
        res.json({code: 3, message: 'success'});
    });
  })(req, res, next);
});


router.post('/signin', async (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
        if (err) {
          return res.status(500).json({code: err.code, message: err.message});
        }
        if(info){
          return res.json({...info});
        }
        else{
          req.login(user, (err) => {
              if (err) {
                return res.status(500).json({code: err.code, message: "Bistagram에 로그인하는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요."});
              }
              res.json({code: 3, message: 'success'});
          });
        }
    })(req, res, next);
});

router.delete ('/logout', async (req, res) => {
    req.logout();
    req.session.destroy();
    res.json({success: true});
});


const deleteProfileimg = (profilename) =>{
  fs.unlink('upload/profile/'+profilename, (err)=>{
    if(err){
      console.log(err);
      return;
    }
  })
}

const deleteTmp = (filename) =>{
  fs.unlink('upload/tmp/'+filename, (err)=>{
    if(err){
      console.log(err);
      return;
    }
  })
}

let storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, 'upload/tmp/')
  },
  filename: (req, file, cb) =>{
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, req.user.username + Date.now() + '.' + extension)
  }
})

let upload = multer({ storage: storage }).single('profileimg');

const thumbnail = (filename) => {
  return new Promise((resolve, reject)=>{
    gm('upload/tmp/'+filename)
      .thumb(250, 250, 'upload/profile/'+filename, (err) => {
        if (err) reject(err);
        else{
          deleteTmp(filename);
          resolve('done - thumb');
        }
      });
  })
}

router.post('/profileImgUpdate', (req, res) => {
  upload(req, res, (err) =>{
    if(err) {
      console.log(err);
      return res.state(500).json({code: err.code, message: err.message});
    }
    thumbnail(req.file.filename).then((text)=>{
      let sql = "update member set profileimgname=? where username=?;";
      let params = [req.file.filename, req.user.username];
      conn.query(sql, params, (err, rows) =>{
        if(err) {
          return res.status(500).json({code: err.code, message: err.message});
        }
        if(rows.affectedRows === 0){
          return res.status(400).json({code: 1, message: "error"});
        }
        else{
          if(req.body.preprofilename){
            deleteProfileimg(req.body.preprofilename);
            res.json({profileimgname: req.file.filename});
          }
        }
      });
    },(err)=>{
      console.log(err)
    });
  })
})


router.delete('/profileImgDelete', (req, res) => {
  deleteProfileimg(req.body.preprofilename);
  let sql = "update member set profileimgname=? where username=?;";
  let params = [null, req.user.username];
  conn.query(sql, params, (err, rows) =>{
    if(err) {
      console.log(err)
      return res.status(500).json({code: err.code, message: err.message});
    }
    if(rows.affectedRows === 0){
      return res.status(400).json({code: 1, message: "error"});
    }
    else{
      res.json({profileimgname: null});
    }
  });
})


const checkNickname = (nickname) =>{
  return new Promise((resolve, reject)=>{
    let sql = "select nickname from member where nickname=?";
    let params = [nickname];
    conn.query(sql, params, (err, rows) =>{
      if(err) {
        reject(err);
      }
      if(rows.length===0){
        resolve(true);
      }else{
        resolve(false);
      }
    });
  })
}

router.post('/profileUpdate', async (req, res) => {
  let user = req.body;
  if(user.nickname!==req.user.nickname){
    const nickpossible = await checkNickname(user.nickname);
    if(!nickpossible){
      return res.json({code: 1, message: "다른 사람이 이용 중인 사용자 이름입니다."});
    }
  }
  let sql ="update member set name=?, nickname=?, phone=?, email=?, gender=?, intro=?, website=? where username=? ";
  let params = [user.name, user.nickname, user.phone, user.email, user.gender, user.intro.replace('\r\n', '<br />'), user.website, req.user.username];
  conn.query(sql, params, (err, rows) =>{
    if(err) {
      console.log(err)
      return res.status(500).json({code: 0, message: "프로필 저장에 실패하였습니다."});
    }
    if(rows.affectedRows===0){
      return res.status(500).json({code: 0, message: "프로필 저장에 실패하였습니다."});
    }else{
      res.json({code: 3, message: "프로필이 저장되었습니다!"});
    }
  });
})


const getPassword = (username) =>{
  return new Promise((resolve, reject)=>{
    let sql = "select password, salt from member where username=?";
    let params = [username];
    conn.query(sql, params, (err, rows) =>{
      if(err) {
        reject(err);
      }
      let userinfo=JSON.stringify(...rows);
      resolve(JSON.parse(userinfo));
    });
  })
}

const updatePassword = (password, username) =>{
  return new Promise((resolve, reject)=>{
    crypto.randomBytes(64, (err, buf) => {
      crypto.pbkdf2(password, buf.toString('base64'), 100000, 64, 'sha512', (err, key) => {
        let sql = "update member set password=?, salt=? where username=?";
        let params = [key.toString('base64'), buf.toString('base64'), username];
        conn.query(sql, params, function(err, rows) {
          if(err) {
            reject (err);
          }
          if(rows.affectedRows===0){
            resolve(false)
          }
          resolve(true);
        });
      });
    });
  })
}

router.post('/passwordUpdate', async (req, res) => {
  const userinfo = await getPassword(req.user.username);
  crypto.randomBytes(64, (err, buf) => {
    crypto.pbkdf2(req.body.prepassword, userinfo.salt, 100000, 64, 'sha512', async (err, key) => {
      if(userinfo.password !== key.toString('base64')){
        return res.json({code: 1, message: "이전 비밀번호가 잘못 입력되었습니다. 다시 입력해주세요."});
      }
      const changepassword = await updatePassword(req.body.changepassword, req.user.username);
      if(changepassword){
        return res.json({code: 3, message: "비밀번호가 저장되었습니다!"});
      }
       res.json({code: 2, message: "비밀번호 저장에 실패하였습니다."});
    });
  });
})

module.exports = router;
