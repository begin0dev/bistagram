import express from 'express';
import mysql from 'mysql';
import async from 'async';

import dbconfig from '../dbinfo/database';

const router = new express.Router();

const conn = mysql.createConnection(dbconfig);


const getPostData = (keyword, atcnum) =>{
  return (item, callback) =>{
    async.waterfall([
      function(callback){
        let sql = "select y.*, media.medianame, media.mediatype from "+
                  "(select x.*, count(reply.atcnum)as replycount from "+
                  "(select hashtag.atcnum, count(atclike.username) as likecount from hashtag left join atclike "+
                  "on hashtag.atcnum = atclike.atcnum where hashtag.tag = ? group by hashtag.atcnum order by null)x "+
                  "left join reply on x.atcnum = reply.atcnum group by x.atcnum order by null)y "+
                  "left join media on y.atcnum = media.atcnum where media.medianame is not null group by y.atcnum order by y.likecount desc limit 9";
        let params = [keyword];
        conn.query(sql, params, function(err, rows){
          if(err) console.log(err);
          let popular=JSON.stringify(rows);
          item.popular=JSON.parse(popular);
          callback(null, item);
        })
      },
      function(arg1, callback){
        if(arg1.atccount>9){
          let sql = "select y.*, media.medianame, media.mediatype from "+
                    "(select x.*, count(reply.atcnum)as replycount from "+
                    "(select hashtag.atcnum, count(atclike.username) as likecount from hashtag left join atclike "+
                    "on hashtag.atcnum = atclike.atcnum where hashtag.tag = ? and hashtag.atcnum not in (?,?,?,?,?,?,?,?,?) "+
                    "group by hashtag.atcnum order by null)x "+
                    "left join reply on x.atcnum = reply.atcnum group by x.atcnum order by null)y "+
                    "left join media on y.atcnum = media.atcnum where media.medianame is not null group by y.atcnum order by atcnum desc limit 9";
          let params = [keyword];
          arg1.popular.forEach((value)=>{
            params = [...params, value.atcnum]
          })
          conn.query(sql, params, function(err, rows){
            let recent=JSON.stringify(rows);
            item.recent=JSON.parse(recent);
            callback(null, item);
          })
        }else{
          callback(null, arg1);
        }
      }
    ], function (err, result) {
      callback(err, result);
    });
  }
}


router.post('/SearchHash', async (req, res) => {
  let sql = "select count(x.atcnum) as atccount from"+
            "(select hashtag.atcnum from hashtag left join media "+
            "on hashtag.atcnum = media.atcnum where hashtag.tag = ?"+
            "and media.medianame is not null group by hashtag.atcnum order by null)x";
  let params = [req.body.keyword];
  conn.query(sql, params, function(err, rows) {
    if(err) {
      return res.status(500).json({message: err.message});
    }
    else{
      async.map(rows, getPostData(req.body.keyword, req.body.atcnum), function(err, posts){
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

router.post('/addHash', async (req, res) => {
  let sql = "select y.*, media.medianame, media.mediatype from "+
            "(select x.*, count(reply.atcnum)as replycount from "+
            "(select hashtag.atcnum, count(atclike.username) as likecount from hashtag left join atclike "+
            "on hashtag.atcnum = atclike.atcnum where hashtag.tag = ? and hashtag.atcnum<? and hashtag.atcnum not in (?,?,?,?,?,?,?,?,?) "+
            "group by hashtag.atcnum order by null)x "+
            "left join reply on x.atcnum = reply.atcnum group by x.atcnum order by null)y "+
            "left join media on y.atcnum = media.atcnum where media.medianame is not null group by y.atcnum order by atcnum desc limit 9";
  let params = [req.body.keyword];
  req.body.atcnums.forEach(value=>{
    params=[...params, value]
  })
  console.log(params)
  conn.query(sql, params, function(err, rows) {
    if(err) {
      return res.status(500).json({message: err.message});
    }
    return res.json(rows);
  });
});

module.exports = router;
