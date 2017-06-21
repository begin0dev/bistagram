import express from 'express';
import mysql from 'mysql';
import passport from 'passport';
import dbconfig from '../dbinfo/database';

const router = new express.Router();

const conn = mysql.createConnection(dbconfig);

router.get('/', (req, res) => {
    res.json({sessionID: req.sessionID, session: req.session});
});

router.get('/check', async (req, res) => {
  console.log(req.user)
    let user = null;
    if (req.user) {
        const { username, nickname, state} = req.user;
        // const followers = await Follow.getFollowerCount(req.user._id);
        // const following = await Follow.getFollowingCount(req.user._id);
        // followInfo = {
        //     followers,
        //     following
        // }
        user = {
            username,
            nickname,
            state,
        };
    }
    res.json({sessionID: req.sessionID, user});
});

router.get('/checkUserName/:username', (req, res) => {
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

router.get('/checkNickName/:nickname', (req, res) => {
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

router.post('/signup', (req, res) => {
    let sql = "insert into member(username, name, nickname, password, state) values(?, ?, ?, ?, ?)";
    let params = [req.body.username, req.body.name, req.body.nickname, req.body.password, 'all'];
    conn.query(sql, params, function(err, rows) {
      if(err) {
        return res.status(500).json({message: err.message});
      }
      if(rows.affectedRows===0){
        return res.json({code: err.code, message: err.message});
      }
      else{
        let user = {...req.body, state: 'all'}
        req.login(user, function(err){
          req.session.save(function(){
            res.send(req.session);
          })
        })
      }
    });
});

router.post('/signin', (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
        if (err) {
          return res.status(500).json({code: err.code, message: err.message});
        } else {
            if(info){
              return res.json({...info});
            }
            else{
              req.login(user, (err) => {
                  if (err) {
                      return res.status(500).json({code: err.code, message: err.message});
                  }
                  res.send(req.session);
              });
            }
        }
    })(req, res, next);
});

router.delete('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.json({success: true});
});

module.exports = router;
