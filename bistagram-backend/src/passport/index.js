import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import mysql from 'mysql';
import dbconfig from '../dbinfo/database';

const conn = mysql.createConnection(dbconfig);

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  let sql = "select * from member where username=?";
  let params = [username];
  conn.query(sql, params, function(err, user) {
    if(err) {
      return done(err);
    }
      done(null, user[0]);
  });
});


passport.use('local-register',
  new LocalStrategy({passReqToCallback: true}, (req, username, password, done) => {
    let sql = "insert into member(username, name, nickname, password, state) values(?, ?, ?, ?, ?)";
    let params = [username, req.body.name, req.body.nickname, password, 'all'];
    conn.query(sql, params, function(err, rows) {
      if(err) {
        return done(err);
      }
      if(rows.affectedRows===0){
        return done(null, false, {code: 1,  msg: "회원등록에 실패하였습니다.." })
      }
      return done(null, {username:username, password:password});
    });
  })
)

passport.use('local-login',
  new LocalStrategy((username, password, done) => {
    let sql = "select * from member where username=?";
    let params = [username];
    conn.query(sql, params, function(err, user) {
      if(err) {
        return done(err);
      }
      if(user.length === 0){
        return done(null, false, {code: 1,  msg: "입력한 사용자 이름이 계정과 일치하지 않습니다. 사용자 이름을 확인하고 다시 시도하세요." })
      }
      if(user[0].password !== password){
        return done(null, false, {code: 2,  msg: "잘못된 비밀번호입니다. 다시 확인하세요." })
      }
      return done(null, user[0]);
    });
  })
)
