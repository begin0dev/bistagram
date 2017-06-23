import express from 'express';
import multer from 'multer';
import mysql from 'mysql';
import async from 'async';

const router = new express.Router();

const DBpool  = mysql.createPool({
  connectionLimit : 10,
  host     : 'localhost',
  user     : 'root',
  password : '',
  port     : 3306,
  database : 'bistagram'
});

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/')
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];

    cb(null, req.user.username+Date.now()+'.'+extension)
  }
})

let upload = multer({ storage: storage }).any();


const getHashTag = params =>{
  let tagString=params.content;
  let atcnum=params.atcnum;
  let tagListArray = [];
  let regexp = new RegExp('#([^\\s\@\$\&\8]*)', 'g');
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

const insert = params => {
    let username = params.req.user.username;
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
            [username, params.req.body.content.replace(/\r\n/g, "<br />")], (err, data) => {
                if(err) {
                    return con.rollback(() => {
                        con.release();
                        console.log(err)
                    });
                }
                atcnum=data.insertId;
                let insertfiles = [];
                params.req.files.forEach(function(md){
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
                    let hashtags=getHashTag({atcnum:atcnum, content:params.req.body.content});
                    let hashtagsql='insert into hashtag(atcnum, hashtag) values ?';
                    con.query(hashtagsql, [hashtags], (err, data) => {
                        if(err) {
                            return con.rollback(() => {
                                con.release();
                                console.log(err)
                            });
                        }
                        con.commit((err) => {
                          if (err) {
                              return con.rollback(() => {
                                  con.release();
                                  console.log(err)
                              });
                          }
                          return con.release();
                        });
                    });
                });
            });
        });
    });
}

router.post('/uploadPost', function (req, res) {
  upload(req, res, function(err){
    insert({req: req});
  })
});

module.exports = router;
