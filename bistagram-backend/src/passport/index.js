import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy }  from 'passport-facebook';
import crypto from 'crypto';
import sha512 from 'sha512';
import mysql from 'mysql';

import download from 'image-downloader';
import Promise from 'bluebird';

import dbconfig from '../dbinfo/database';
import fbConfig from './fb';

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
    let sql = "select username from member where username=?";
    let params = [username];
    conn.query(sql, params, function(err, rows) {
      if(err) {
        return done(err);
      }
      if(rows.length>0){
        return done(null, false, {code: 1,  msg: "다른 사람이 이용 중인 사용자 이름입니다." })
      }
      crypto.randomBytes(64, (err, buf) => {
        crypto.pbkdf2(password, buf.toString('base64'), 100000, 64, 'sha512', (err, key) => {
          let insertsql = "insert into member(username, name, nickname, password, salt) values(?, ?, ?, ?, ?)";
          let insertparams = [username, req.body.name, req.body.nickname, key.toString('base64'), buf.toString('base64')];
          conn.query(insertsql, insertparams, function(err, rows) {
            if(err) {
              return done(err);
            }
            if(rows.affectedRows===0){
              return done(null, false, {code: 1,  msg: "회원등록에 실패하였습니다" })
            }
            return done(null, {username:username, password:password});
          });
        });
      });
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
      crypto.randomBytes(64, (err, buf) => {
        crypto.pbkdf2(password, user[0].salt, 100000, 64, 'sha512', (err, key) => {
          if(user[0].password !== key.toString('base64')){
            return done(null, false, {code: 2,  msg: "잘못된 비밀번호입니다. 다시 확인하세요." })
          }
          return done(null, user[0]);
        });
      });
    });
  })
)


const downloadIMG = async (options) =>{
  try {
    const { filename, image } = await download.image(options);
    console.log("success image download")
  } catch (e) {
    console.log(e)
  }
}

passport.use(
    new FacebookStrategy({
        clientID: fbConfig.appID,
        clientSecret: fbConfig.appSecret,
        callbackURL: fbConfig.callbackURL,
        profileFields: fbConfig.profileFields
    },
        (access_token, refresh_token, profile, done) => {
            let logchecksql = "select * from member where username=?";
            let logparams = ["fb:"+profile.id];
            conn.query(logchecksql, logparams, (err, user) => {
                if(err) {return done(err);}
                if(user.length>0){
                  return done(null, user[0]);
                }
                else{
                  if(profile.photos){
                    const options ={
                      url: profile.photos[0].value,
                      dest: 'upload/profile/'+profile.id+'.png'
                    };
                    downloadIMG(options);
                  }
                  let newUser = {
                    'username': "fb:"+profile.id,
                    'email': profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null,
                    'gender': profile.gender
                  };
                  let insertsql = "insert into member(username, email, gender) values(?, ?, ?)";
                  let insertparams = [newUser.username, newUser.email, newUser.gender];
                  conn.query(insertsql, insertparams, (err, user) => {
                      if(err) {return done(err);}
                      done(null, newUser);
                  });
                }
            });
        }
    )
);
