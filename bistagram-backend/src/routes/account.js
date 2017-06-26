import express from 'express';
import mysql from 'mysql';
import passport from 'passport';
import dbconfig from '../dbinfo/database';

const router = new express.Router();

const conn = mysql.createConnection(dbconfig);

const getHisCount = (username, callback) =>{
    let countsql = "select count(hisnum)as count from history where username=? and `read`=0;";
    let params = [username];
    conn.query(countsql, params, function(err, rows) {
      if(err) {
        callback (err, null);
      }
        callback (null, rows[0].count)
    });
}

router.get('/check', async (req, res) => {
    let user = null;
    let hiscount = null;
    if (req.user) {
        const { username, nickname, state} = req.user;
        user = {
            username,
            nickname,
            state,
        };
        getHisCount(req.user.username, (err, value)=>{

          res.json({sessionID: req.sessionID, user, hiscount: value});
        });
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

router.post('/signup', async (req, res, next) => {
  passport.authenticate('local-register', (err, user, info) => {
    if (err) {
      return res.status(500).json({code: err.code, message: err.message});
    }
    req.login(user, (err) => {
        if (err) {
            return res.status(500).json({code: err.code, message: err.message});
        }
        res.send(req.session);
    });
  })(req, res, next);
});


router.post('/signin', async (req, res, next) => {
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

router.delete ('/logout', async (req, res) => {
    req.logout();
    req.session.destroy();
    res.json({success: true});
});

module.exports = router;
