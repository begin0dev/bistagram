import express from 'express';
import mysql from 'mysql';
import async from 'async';
import dbconfig from '../dbinfo/database';


const router = new express.Router();

const conn = mysql.createConnection(dbconfig);

router.post('/SearchPosts', (req, res) => {
  let sql = "select z.*, count(atclike.atcnum) as atclikecount from "+
            "(select y.*, count(reply.atcnum) as repliescount from "+
            "(select * from article where memid in "+
            "(select id from ("+
            "(select followingid as id from following where memid=? and followingid in "+
            "(select followid from follower where memid=?))"+
            "union (select member.id from follower join member on follower.memid=? and follower.followid=member.id and member.state='all')"+
            "union (select id from member where id=?))x)"+
            ")y left join reply on y.atcnum = reply.atcnum group by y.atcnum order by null"+
            ")z left join atclike on z.atcnum = atclike.atcnum group by z.atcnum order by z.registerday desc limit ?, ?";
  let params = [req.body.id, req.body.id, req.body.id, req.body.id, req.body.start, 5];
  conn.query(sql, params, function(err, rows) {
    if(err) {
      return res.status(500).json({message: err.message});
    }
    else{
      async.map(rows, selectUserInfo, function(err_map, result){
        async.map(rows, checkLike, function(err_map, result){
          async.map(rows, selectReplyLimitFour, function(err_map, posts){

            return res.json(posts);
          })
        })
      })
    }
  });
});

function selectUserInfo(row, callback){
  let sql = "select name, nick, profileimgname from member where id = ?";
  let params = [row.memid];
  conn.query(sql, params, function(err, userinfo){
    row.userinfo=userinfo[0];
    callback(null, row);
  })
}


function selectReplyLimitFour(row, callback){
  let sql = "select * from (select replynum, memid, content from reply where atcnum=? order by replynum desc limit ?) as a order by replynum asc";
  let params = [row.atcnum, 4];
  conn.query(sql, params, function(err, replies){
    row.replies=replies;
    callback(null, row);
  })
}

function checkLike(row, callback){
  let sql = "select memid from atclike where atcnum=? and memid=?";
  let params = [row.atcnum, row.memid];
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

module.exports = router;
