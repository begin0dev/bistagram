import express from 'express';
import mysql from 'mysql';
import dbconfig from '../dbinfo/database';

const router = new express.Router();

const conn = mysql.createConnection(dbconfig);

router.post('/RecommedFollow', (req, res) => {
  let sql = "select id, name, nick, profileimgname, state, false as follow, convert(recommend.type using utf8) as type from member join "+
					  "(select * from ("+
						"(select followingid as memid, '나를 팔로우중인 사람' as type, 1 as rank  from following where memid=?) "+
						"UNION (select followid as memid, concat('함께 아는 사람 ', count(followid)) as type, 2 as rank from follower where memid in "+
            "(select followid from follower where memid=?) group by followid) "+
						"UNION (select memid, count(memid) as type, 3 as rank from following group by memid) "+
						"UNION (select id as memid, '' as type, 4 as rank from member)) as x "+
						"where memid != ? "+
						"and memid not in (select followid from follower where memid=?) "+
						"group by memid) as recommend "+
						"on member.id=recommend.memid "+
						"order by rank asc, type desc limit ?, ?";
  let params = [req.body.id, req.body.id, req.body.id, req.body.id, req.body.start, req.body.count];
  conn.query(sql, params, function(err, rows) {
    if(err) {
      return res.status(500).json({message: err.message});
    }
    else{
      return res.json(rows);
    }
  });
});

router.post('/following', (req, res) => {
  let sql = "insert into follower(memid, followid) values(?, ?)";
  let params = [req.body.id, req.body.followid];
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

router.delete('/unfollow', (req, res) => {
  let sql = "delete from follower where memid=? and followid=?";
  let params = [req.body.id, req.body.followid];
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

module.exports = router;
