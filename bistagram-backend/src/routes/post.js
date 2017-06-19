import express from 'express';
import mysql from 'mysql';
import async from 'async';
import dbconfig from '../dbinfo/database';

const router = new express.Router();

const conn = mysql.createConnection(dbconfig);

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
      async.map(rows, selectUserInfo, function(err_map, result){
        async.map(rows, selectAtcMedia, function(err_map, result){
          async.map(rows, checkLike, function(err_map, result){
            async.map(rows, selectReplyLimitFour, function(err_map, posts){

              return res.json(posts);
            })
          })
        })
      })
    }
  });
});

function selectUserInfo(row, callback){
  let sql = "select name, nickname, profileimgname from member where username=?";
  let params = [row.username];
  conn.query(sql, params, function(err, userinfo){
    row.userinfo=userinfo[0];
    callback(null, row);
  })
}

function selectAtcMedia(row, callback){
  let sql = "select medianum, medianame, mediatype from media where atcnum=?";
  let params = [row.atcnum];
  conn.query(sql, params, function(err, media){
    row.media=media;
    callback(null, row);
  })
}

function selectReplyLimitFour(row, callback){
  let sql = "select * from "+
            "(select replynum, member.username, nickname, content from reply join member on reply.username = member.username where atcnum=? "+
            "order by replynum desc limit ?)"+
            "as a order by replynum asc";
  let params = [row.atcnum, 4];
  conn.query(sql, params, function(err, replies){
    row.replies=replies;
    callback(null, row);
  })
}

function checkLike(row, callback){
  let sql = "select username from atclike where atcnum=? and username=?";
  let params = [row.atcnum, row.username];
  conn.query(sql, params, function(err, boolean){
    if(boolean.length === 0){
      row.like=false;
    }
    else{
      row.like=true;
    }
    callback(null, row);
  })
}

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
