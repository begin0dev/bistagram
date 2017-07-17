import express from 'express';
import mysql from 'mysql';
import async from 'async';

import dbconfig from '../dbinfo/database';

const router = new express.Router();

const conn = mysql.createConnection(dbconfig);

const getPostData = (keyword) =>{
  return (item, callback) =>{
    async.waterfall([
      function(callback){
        let sql = "select y.*, media.medianame, media.mediatype from "+
                  "(select x.*, count(reply.atcnum)as replycount from "+
                  "(select u.atcnum, count(atclike.username) as likecount from "+
                  "(select z.atcnum from "+
                  "(select hashtag.atcnum from hashtag join article "+
                  "join member on hashtag.atcnum = article.atcnum "+
                  "and  article.username=member.username "+
                  "where hashtag.tag like ? and member.state='all' "+
                  "group by hashtag.atcnum order by null)z left join media "+
                  "on z.atcnum = media.atcnum where media.medianame is not null group by z.atcnum order by null)u "+
                  "left join atclike on u.atcnum = atclike.atcnum group by u.atcnum order by null)x "+
                  "left join reply on x.atcnum = reply.atcnum group by x.atcnum order by null)y "+
                  "left join media on y.atcnum = media.atcnum where media.medianame is not null group by y.atcnum order by y.likecount desc, y.replycount desc limit 9";
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
                    "(select u.atcnum, count(atclike.username) as likecount from "+
                    "(select z.atcnum from "+
                    "(select hashtag.atcnum from hashtag join article "+
                    "join member on hashtag.atcnum = article.atcnum "+
                    "and  article.username=member.username "+
                    "where hashtag.tag like ? and member.state='all' "+
                    "group by hashtag.atcnum order by null)z left join media "+
                    "on z.atcnum = media.atcnum where media.medianame is not null group by z.atcnum order by null)u "+
                    "left join atclike on u.atcnum = atclike.atcnum where u.atcnum not in (?,?,?,?,?,?,?,?,?) "+
                    "group by u.atcnum order by null)x "+
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
          arg1.recent=[];
          callback(null, arg1);
        }
      }
    ], function (err, result) {
      callback(err, result);
    });
  }
}

router.post('/searchHash', async (req, res) => {
  let sql = "select count(x.atcnum) as atccount from "+
            "(select z.atcnum from "+
            "(select hashtag.atcnum from hashtag join article "+
            "join member on hashtag.atcnum = article.atcnum "+
            "and  article.username=member.username "+
            "where hashtag.tag like ? and member.state='all' "+
            "group by hashtag.atcnum order by null)z left join media "+
            "on z.atcnum = media.atcnum where media.medianame is not null group by z.atcnum order by null)x";
  let params = ['%'+req.body.keyword+'%'];
  conn.query(sql, params, function(err, rows) {
    if(err) {
      return res.status(500).json({message: err.message});
    }
    else{
      async.map(rows, getPostData('%'+req.body.keyword+'%'), function(err, posts){
        if(err){
          return res.status(500).json({message: err.message});
        }
        else{
          return res.json(...posts);
        }
      })
    }
  });
});

router.post('/addHash', async (req, res) => {
  let sql = "select y.*, media.medianame, media.mediatype from "+
            "(select x.*, count(reply.atcnum)as replycount from "+
            "(select u.atcnum, count(atclike.username) as likecount from "+
            "(select z.atcnum from "+
            "(select hashtag.atcnum from hashtag join article "+
            "join member on hashtag.atcnum = article.atcnum "+
            "and  article.username=member.username "+
            "where hashtag.tag like ? and member.state='all' "+
            "group by hashtag.atcnum order by null)z left join media "+
            "on z.atcnum = media.atcnum where media.medianame is not null group by z.atcnum order by null)u "+
            "left join atclike on u.atcnum = atclike.atcnum where u.atcnum<? and u.atcnum not in (?,?,?,?,?,?,?,?,?) "+
            "group by u.atcnum order by null)x "+
            "left join reply on x.atcnum = reply.atcnum group by x.atcnum order by null)y "+
            "left join media on y.atcnum = media.atcnum where media.medianame is not null group by y.atcnum order by atcnum desc limit 9";
  let params = ['%'+req.body.keyword+'%'];
  req.body.atcnums.forEach(value=>{
    params=[...params, value]
  })
  conn.query(sql, params, function(err, rows) {
    if(err) {
      return res.status(500).json({message: err.message});
    }
    return res.json(rows);
  });
});


router.post('/searchUser', async (req, res) => {
  let usersql = "select y.*, count(following.username) as followingcount from "+
                "(select x.*, count(follower.username) as followercount from "+
                "(select member.*, count(m.username) as atccount from member left join "+
                "(select article.* from article left join media "+
                "on article.atcnum=media.atcnum where media.medianame is not null "+
                "group by article.atcnum order by null)m "+
                "on member.username=m.username where member.nickname=?)x join follower on "+
                "x.username=follower.username)y join following on y.username=following.username";
  let userparam = [req.body.nickname];
  conn.query(usersql, userparam, (err, userinfo) =>{
    if(err) {
      return res.status(500).json({message: err.message});
    }
    let posts = [];
    let userdata={
      atccount: userinfo[0].atccount,
      userinfo: {
        username: userinfo[0].username,
        name: userinfo[0].name,
        nickname: userinfo[0].nickname,
        profileimgname: userinfo[0].profileimgname,
        intro: userinfo[0].intro,
        state: userinfo[0].state,
        followercount: userinfo[0].followercount,
        followingcount: userinfo[0].followingcount
      }
    }
    if(userinfo[0].state!=="all"){
      return res.json({...userdata, posts})
    }
    else{
      let postsql = "select y.*, count(reply.atcnum)as replycount from "+
                    "(select x.*, count(atclike.username) as likecount from "+
                    "(select article.atcnum, media.medianame, media.mediatype "+
                    "from article left join media on article.atcnum=media.atcnum "+
                    "where article.username=? and media.medianame is not null group by article.atcnum order by article.atcnum desc limit 12)x "+
                    "left join atclike on x.atcnum = atclike.atcnum group by x.atcnum order by null)y "+
                    "left join reply on y.atcnum = reply.atcnum group by y.atcnum order by null"
      let postparam = [userinfo[0].username];
      conn.query(postsql, postparam, function(err, getposts){
        if(err) {
          return res.status(500).json({message: err.message})
        }
        posts=getposts;
        return res.json({...userdata, posts})
      })
    }
  });
});

router.post('/addUserPost', async (req, res) => {
  let sql = "select y.*, count(reply.atcnum)as replycount from "+
            "(select x.*, count(atclike.username) as likecount from "+
            "(select article.atcnum, media.medianame, media.mediatype "+
            "from article left join media on article.atcnum=media.atcnum "+
            "where username=? and article.atcnum<? group by article.atcnum order by article.atcnum desc limit 9)x "+
            "left join atclike on x.atcnum = atclike.atcnum group by x.atcnum order by null)y "+
            "left join reply on y.atcnum = reply.atcnum group by y.atcnum order by null"
  let params = [req.body.username, req.body.atcnum];
  conn.query(sql, params, (err, rows) =>{
    if(err) {
      return res.status(500).json({message: err.message});
    }
    return res.json(rows)
  });
});

const getModalData = (atcnum, user) =>{
  return (item, callback) =>{
    async.waterfall([
      function(callback){
        let sql = "select medianame, mediatype from media where atcnum=?";
        let params = [atcnum];
        conn.query(sql, params, function(err, rows){
          if(err) console.log(err);
          let media=JSON.stringify(rows);
          item.media=JSON.parse(media);
          callback(null, item);
        })
      },
      function(arg1, callback){
        let sql = "select member.username, member.nickname, reply.replynum, reply.content "+
                  "from reply join member on reply.username=member.username where atcnum=?";
        let params = [atcnum];
        conn.query(sql, params, function(err, rows){
          let replies=JSON.stringify(rows);
          item.replies=JSON.parse(replies);
          callback(null, item);
        })
      },
      function(arg1, callback){
        let sql = "";
        let params = [];
        if(user){
          sql = "select count(atcnum) as likecount, exists(select username from atclike where atcnum=? and username=?) as `like` "+
                "from atclike where atcnum=?";
          params = [atcnum, user.username, atcnum];
        }else{
          sql = "select count(atcnum) as likecount, 0 as `like` from atclike where atcnum=? ";
          params = [atcnum];
        }
        conn.query(sql, params, function(err, rows){
          let atclike=JSON.stringify(rows[0]);
          item.atclike=JSON.parse(atclike);
          callback(null, item);
        })
      }
    ], function (err, result) {
      callback(err, result);
    });
  }
}

router.post('/getModalPost', async (req, res) => {
  let sql = "select x.*, count(reply.atcnum) as replycount from "+
            "(select article.atcnum, article.username, member.nickname, member.profileimgname, article.content, "+
            "article.registerday from article join member on article.username=member.username where atcnum = ?)x "+
            "join reply on x.atcnum=reply.atcnum";
  let params = [req.body.atcnum];
  conn.query(sql, params, function(err, rows) {
    if(err) {
      console.log(err)
      return res.status(500).json({message: err.message});
    }
    async.map(rows, getModalData(req.body.atcnum, req.user), (err, posts) =>{
      if(err){
        console.log(err)
        return res.status(500).json({message: err.message});
      }
      else{
        return res.json(...posts);
      }
    })
  });
});


module.exports = router;
