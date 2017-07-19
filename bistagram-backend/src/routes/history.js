import express from 'express';
import mysql from 'mysql';

import dbconfig from '../dbinfo/database';

const router = new express.Router();

const DBpool  = mysql.createPool({...dbconfig, connectionLimit:50});

router.get('/getHistory', (req, res) => {
  DBpool.getConnection((err, con) => {
      if (err) {
        callback(error => {
            return res.status(500).json({message: error});
        });
      }
      let username=req.user.username;
      let sql = "select y.*, media.medianame, media.mediatype from "+
                "(select x.*, member.nickname, member.profileimgname from "+
                "(select * from history where username=? order by hisnum desc limit ?)x "+
                "join member on x.who=member.username)y "+
                "left join media on y.atcnum=media.atcnum group by y.hisnum order by null";
      let params = [username, 35];
      con.query(sql, params,(err, history) =>{
        if(err) {
          return res.status(500).json({message: err.message});
        }
        if(history.length>0){
          let readsql = "update history set `read`=1 where username=? and hisnum<=?";
          let readparam = [username, history[0].hisnum];
          con.query(readsql, readparam, (err, rows) =>{
            if(err) {
              return res.status(500).json({message: err.message});
            }
          });
        }
        con.release();
        return res.json({history});
      });
  });
});

module.exports = router;
