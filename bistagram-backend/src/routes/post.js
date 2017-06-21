import express from 'express';
import mysql from 'mysql';
import async from 'async';
import dbconfig from '../dbinfo/database';

const router = new express.Router();

const conn = mysql.createConnection(dbconfig);

const getPostData = function(username){
  return function(item, callback){
    async.waterfall([
      function(callback){
        let sql = "select username from atclike where atcnum=? and username=?";
        let params = [item.atcnum, username];
        conn.query(sql, params, function(err, boolean){
          if(boolean.length === 0){
            item.like=false;
          }
          else{
            item.like=true;
          }
          callback(null, item);
        })
      },
      function(arg1, callback){
        let sql = "select name, nickname, profileimgname from member where username=?";
        let params = [item.username];
        conn.query(sql, params, function(err, rows){
          let userinfo=JSON.stringify(rows[0]);
          item.userinfo=JSON.parse(userinfo);
          callback(null, item);
        })
      },
      function(arg1, callback){
        let sql = "select medianum, medianame, mediatype from media where atcnum=?";
        let params = [item.atcnum];
        conn.query(sql, params, function(err, rows){
          let media=JSON.stringify(rows);
          item.media=JSON.parse(media);
          callback(null, item);
        })
      },
      function(arg1, callback){
        let sql = "select * from "+
                  "(select replynum, member.username, nickname, content from reply join member on reply.username = member.username where atcnum=? "+
                  "order by replynum desc limit ?)"+
                  "as a order by replynum asc";
        let params = [item.atcnum, 4];
        conn.query(sql, params, function(err, rows){
          let replies=JSON.stringify(rows);
          item.replies=JSON.parse(replies);
          callback(null, item);
        })
      }
    ], function (err, result) {
      callback(err, result);
    });
  }
}


router.post('/SearchPosts', (req, res) => {
  let username=req.user.username;
  let sql = "select z.*, count(atclike.atcnum) as atclikecount from "+
            "(select y.*, count(reply.atcnum) as repliescount from "+
            "(select * from article where username in "+
            "(select username from ("+
            "(select following as username from following where username=? and following in (select follower from follower where username=?))"+
            "union (select member.username from follower join member on follower.username=? and follower.follower=member.username and member.state='all')"+
            "union (select username from member where username=?))x) order by atcnum desc limit ?, ?"+
            ")y left join reply on y.atcnum = reply.atcnum group by y.atcnum order by null"+
            ")z left join atclike on z.atcnum = atclike.atcnum group by z.atcnum order by null";
  let params = [username, username, username, username, req.body.start, 10];
  conn.query(sql, params, function(err, rows) {
    if(err) {
      return res.status(500).json({message: err.message});
    }
    else{
      async.map(rows, getPostData(username), function(err, posts){
        if(err){
          return res.status(500).json({message: err.message});
        }
        else{
          return res.json(posts);
        }
      })
    }
  });
});

router.post('/likeAtc', (req, res) => {
  let username=req.user.username;
  let sql = "insert into atclike(atcnum, username) values (?, ?)";
  let params = [req.body.atcnum, username];
  conn.query(sql, params, function(err, rows) {
    if(err) {
      return res.status(500).json({message: err.message});
    }
    else{
      if(rows.affectedRows===0){
        return res.json({result: false});
      }
      else{
        return res.json({result: true});
      }
    }
  });
});

router.delete('/notlikeAtc', (req, res) => {
  let username=req.user.username;
  let sql = "delete from atclike where atcnum=? and username=?";
  let params = [req.body.atcnum, username];
  conn.query(sql, params, function(err, rows) {
    if(err) {
      return res.status(500).json({message: err.message});
    }
    else{
      if(rows.affectedRows===0){
        return res.json({result: false});
      }
      else{
        return res.json({result: true});
      }
    }
  });
});

router.post('/insertReply', (req, res) => {
  let username=req.user.username;
  let sql = "insert into reply(atcnum, username, content) values(?,?,?)";
  let params = [req.body.atcnum, username, req.body.content];
  conn.query(sql, params, function(err, rows) {
    if(err) {
      return res.status(500).json({message: err.message});
    }
    else{
      if(rows.affectedRows===0){
        return res.json({message: 'fail'});
      }
      else{
        return res.json({replynum: rows.insertId, username: username, nickname: req.user.nickname, content: req.body.content});
      }
    }
  });
});

router.delete('/deleteReply', (req, res) => {
  let sql = "delete from reply where replynum=?";
  let params = [req.body.replynum];
  conn.query(sql, params, function(err, rows) {
    if(err) {
      return res.status(500).json({message: err.message});
    }
    else{
      if(rows.affectedRows===0){
        return res.json({result: false});
      }
      else{
        return res.json({result: true});
      }
    }
  });
});

router.post('/getAllReplies', (req, res) => {
  let sql = "select replynum, member.username, nickname, content from reply join member on reply.username = member.username where atcnum=? "+
            "order by replynum asc limit 0, ?";
  let params = [req.body.atcnum, req.body.count];
  conn.query(sql, params, function(err, rows) {
    if(err) {
      return res.status(500).json({message: err.message});
    }
    else{
      if(rows.affectedRows===0){
        return res.status(401).json({message: '정보불러오기 실패 잠시후에 시도해주세요'});
      }
      else{
        return res.json({rows});
      }
    }
  });
});



module.exports = router;
