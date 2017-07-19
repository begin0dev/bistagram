import express from 'express';
import multer from 'multer';
import mysql from 'mysql';
import async from 'async';
import fs from 'fs';
import gm from 'gm';
import ffmpeg from 'fluent-ffmpeg';

import dbconfig from '../dbinfo/database';

const router = new express.Router();

const conn = mysql.createConnection(dbconfig);

const getPostData = (username) =>{
  return (item, callback) =>{
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
          item.mdindex=0;
          item.play=false;

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
          item.setreply='';
          callback(null, item);
        })
      }
    ], function (err, result) {
      callback(err, result);
    });
  }
}


router.post('/SearchPosts', async (req, res) => {
  let username=req.user.username;
  let sql ="";
  let params = [];
  if(req.body.atcnum===-1){
      sql = "select z.*, count(atclike.atcnum) as atclikecount from "+
            "(select y.*, count(reply.atcnum) as repliescount from "+
            "(select * from article where username in "+
            "(select username from ("+
            "(select follower as username from follower where username=? and follower in (select following from following where username=?))"+
            "union (select member.username from following join member on following.username=? and following.following=member.username and member.state='all')"+
            "union (select username from member where username=?))x) order by atcnum desc limit ?"+
            ")y left join reply on y.atcnum = reply.atcnum group by y.atcnum order by null"+
            ")z left join atclike on z.atcnum = atclike.atcnum group by z.atcnum order by null";
      params = [username, username, username, username, 10];
  }else{
      sql = "select z.*, count(atclike.atcnum) as atclikecount from "+
            "(select y.*, count(reply.atcnum) as repliescount from "+
            "(select * from article where username in "+
            "(select username from ("+
            "(select follower as username from follower where username=? and follower in (select following from following where username=?))"+
            "union (select member.username from following join member on following.username=? and following.following=member.username and member.state='all')"+
            "union (select username from member where username=?))x) and atcnum<? order by atcnum desc limit ?"+
            ")y left join reply on y.atcnum = reply.atcnum group by y.atcnum order by null"+
            ")z left join atclike on z.atcnum = atclike.atcnum group by z.atcnum order by null";
      params = [username, username, username, username, req.body.atcnum, 10];
  }

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

const deletefiles = (files) =>{
  files.forEach((file, i)=>{
    if(i===0){
      let _lastDot = file.medianame.lastIndexOf('.');
      let imgfilename = file.medianame.substring(0, _lastDot)
      fs.unlink('upload/thumb/'+imgfilename+'.png', (err)=>{
        if(err){
          console.log(err);
          return;
        }
      })
    }
    fs.unlink('upload/'+file.medianame, (err)=>{
      if(err){
        console.log(err);
        return;
      }
    })
  })
}

router.delete('/deletePost', async (req, res) => {
  let sql = "delete from article where atcnum=?";
  let params = [req.body.atcnum];
  conn.query(sql, params, function(err, rows) {
    if(err) {
      return res.status(500).json({message: err.message});
    }
    else{
      if(rows.affectedRows===0){
        return res.json({result: false});
      }
      else{
        deletefiles(req.body.media);
        return res.json({result: true});
      }
    }
  });
});

router.post('/likeAtc', async (req, res) => {
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

router.delete('/notlikeAtc', async (req, res) => {
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

router.delete('/deleteReply', async (req, res) => {
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

router.post('/getAllReplies', async (req, res) => {
  let sql = "select replynum, member.username, nickname, content from reply join member on reply.username = member.username "+
            "where atcnum=? and replynum<?";
  let params = [req.body.atcnum, req.body.replynum];
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

const DBpool  = mysql.createPool({...dbconfig, connectionLimit:50});

const getHashTag = params =>{
  let tagString=params.content;
  let atcnum=params.atcnum;
  let tagListArray = [];
  let regexp = new RegExp('#([a-z0-9가-힣][a-z0-9가-힣\-_]*)', 'ig');
  let tmplist = tagString.match(regexp);
  for (let w in tmplist) {
      let hashSub = tmplist[ w ].split('#');
      for (let x in hashSub) {
          if (hashSub[x] != "")
          {
              if (hashSub[x].substr(hashSub[x].length - 1) == ":")
              {
                  hashSub[x] = hashSub[x].slice(0, -1);
              }
              if (hashSub[x] != "") {
                  tagListArray.push([atcnum, hashSub[x]]);
              }
          }
      }
  }
  return tagListArray;
}

const getNickName = params =>{
  let tagString=params.content;
  let tagListArray = [];
  let regexp = new RegExp('@([a-z0-9][a-z0-9\-_]*)', 'ig');
  let tmplist = tagString.match(regexp);
  for (let w in tmplist) {
      let hashSub = tmplist[ w ].split('@');
      for (let x in hashSub) {
          if (hashSub[x] != ""){
              if (hashSub[x].substr(hashSub[x].length - 1) == ":"){
                  hashSub[x] = hashSub[x].slice(0, -1);
              }
              if (hashSub[x] != "" && hashSub[x]!==params.nickname && hashSub[x]!==params.postnick) {
                  tagListArray.push(hashSub[x]);
              }
          }
      }
  }
  return tagListArray;
}


router.post('/insertReply', async (req, res) => {
    let username=req.user.username;
    let postuser=req.body.username;
    let postnick=req.body.nickname;
    let replynum=-1;
    DBpool.getConnection((err, con) => {
        if (err) {
          callback(error => {
              throw new Error('에러 발생')
          });
        }
        con.beginTransaction(err => {
            if (err) {
                con.release();
                console.log(err)
            }
            let insertsql = "insert into reply(atcnum, username, content) values(?,?,?)";
            let params = [req.body.atcnum, username, req.body.content];
            con.query(insertsql, params, (err, rows) => {
                if(err) {
                  return res.status(500).json({message: err.message});
                }

                replynum=rows.insertId;
                if(username!==postuser){
                  let inserthis = "insert into history(username, who, type, atcnum, replynum, content) values (?, ?, ?, ?, ?, ? )";
                  let inserthisparams = [postuser, username, 'reply', req.body.atcnum, replynum, req.body.content];

                  con.query(inserthis, inserthisparams, (err, rows) => {
                      if(err) {
                        return res.status(500).json({message: err.message});
                      }

                  });
                }

                let nickNames=getNickName({content:req.body.content, nickname:req.user.nickname, postnick: postnick});
                if(nickNames.length>0){
                  let checkNicksql="select username from member where "
                  nickNames.forEach((value, i)=>{
                    if(i===0){
                      checkNicksql += "nickname=? "
                    }
                    else{
                      checkNicksql += "or nickname=? "
                    }
                  })
                  con.query(checkNicksql, nickNames, (err, data) => {
                      if(err) {
                          return con.rollback(() => {
                              con.release();
                              console.log(err)
                          });
                      }
                      let checkNick = [];
                      data.forEach((value)=>{
                        checkNick =[...checkNick, [value.username, username, 'call', req.body.atcnum, replynum, req.body.content]]
                      })
                      let historysql='insert into history(username, who, type, atcnum, replynum, content) values ?';
                      con.query(historysql, [checkNick], (err, data) => {
                          if(err) {
                              return con.rollback(() => {
                                  con.release();
                                  console.log(err)
                              });
                          }
                      });
                  });
                }
                con.commit((err) => {
                  if (err) {
                      return con.rollback(() => {
                          con.release();
                          console.log(err)
                      });
                  }
                  con.release();
                  return res.json({replynum: rows.insertId, username: username, nickname: req.user.nickname, content: req.body.content});
                });
            });
        });
    })
});

let storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, 'upload/')
  },
  filename: (req, file, cb) =>{
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, req.user.username + Date.now()+req.files.length+'.'+extension)
  }
})

let upload = multer({ storage: storage }).array('media', 6);

const thumbnail = (filename) => {
  let _lastDot = filename.lastIndexOf('.');
  let imgfilename = filename.substring(0, _lastDot)
  gm('upload/'+filename)
    .thumb(400, 400, 'upload/thumb/'+imgfilename+'.png', (err) => {
      if (err) console.error(err);
      console.log('done - thumb');
    });
}

const videothumbnail = (filename) => {
  let _lastDot = filename.lastIndexOf('.');
  let imgfilename = filename.substring(0, _lastDot)

  let proc = new ffmpeg('upload/'+filename)
  .setFfmpegPath('E://java/react/ffmpeg/bin/ffmpeg.exe')
  .setFfprobePath('E://java/react/ffmpeg/bin/ffprobe.exe')
  .applyAutopadding(true, 'white')
  .takeScreenshots({count: 1, timemarks: [ '00:00:00.010' ], size: '400x400', filename: imgfilename+'.png'}, 'upload/thumb', (err) => {
    if (err) console.error(err);
    console.log('screenshots were saved')
  });
}


router.post('/uploadPost', (req, res) => {
  upload(req, res, (err) =>{
    if(err) {
      console.log(err);
      return res.state(500).end("Error uploading file.");
    }
    let username = req.user.username;
    let atcnum = -1;
    DBpool.getConnection((err, con) => {
        if (err) {
          callback(error => {
              throw new Error('에러 발생')
          });
        }
        con.beginTransaction(err => {
            if (err) {
                con.release();
                console.log(err)
            }
            con.query('insert into article(username, content) values(?, ?)',
            [username, req.body.content.replace(/\r\n/g, "<br />")], (err, data) => {
                if(err) {
                    return con.rollback(() => {
                        con.release();
                        console.log(err)
                    });
                }

                atcnum=data.insertId;
                let insertfiles = [];
                if(req.files.length>0){
                  if(req.files[0].mimetype.match('image')){
                    thumbnail(req.files[0].filename);
                  }
                  else{
                    videothumbnail(req.files[0].filename);
                  }

                  req.files.forEach(function(md){
                    insertfiles=[...insertfiles, [atcnum, md.filename, md.mimetype]]
                  })
                  let mediasql='insert into media(atcnum, medianame, mediatype) values ?';
                  con.query(mediasql, [insertfiles], (err, data) => {
                      if(err) {
                          return con.rollback(() => {
                              con.release();
                              console.log(err)
                          });
                      }
                      insertfiles=[];
                      req.files.forEach(function(md, i){
                        insertfiles=[...insertfiles, {medianame:md.filename, medianum:(data.insertId+i), mediatype: md.mimetype}];
                      })
                  });
                }

                let hashtags=getHashTag({atcnum:atcnum, content:req.body.content});
                if(hashtags.length>0){
                  let hashtagsql='insert into hashtag(atcnum, tag) values ?';
                  con.query(hashtagsql, [hashtags], (err, data) => {
                      if(err) {
                          return con.rollback(() => {
                              con.release();
                              console.log(err)
                          });
                      }
                  });
                }

                let nickNames=getNickName({content:req.body.content, username:username});
                if(nickNames.length>0){
                  let checkNicksql="select username from member where "
                  nickNames.forEach((value, i)=>{
                    if(i===0){
                      checkNicksql += "nickname=? "
                    }
                    else{
                      checkNicksql += "or nickname=? "
                    }
                  })
                  con.query(checkNicksql, nickNames, (err, data) => {
                      if(err) {
                          return con.rollback(() => {
                              con.release();
                              console.log(err)
                          });
                      }
                      let checkNick = [];
                      data.forEach((value)=>{
                        checkNick =[...checkNick, [value.username, username, 'call', atcnum, req.body.content]]
                      })
                      let historysql='insert into history(username, who, type, atcnum, content) values ?';
                      con.query(historysql, [checkNick], (err, data) => {
                          if(err) {
                              return con.rollback(() => {
                                  con.release();
                                  console.log(err)
                              });
                          }
                      });
                  });
                }

                con.commit((err) => {
                  if (err) {
                      return con.rollback(() => {
                          con.release();
                          console.log(err)
                      });
                  }
                  con.release();

                  let sql = "select article.*, 0 as atclikecount, 0 as repliescount from article where atcnum = ?";
                  let params = [atcnum];
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
            });
        });
    });
  })
});


module.exports = router;
