import express from 'express';
import mysql from 'mysql';
import dbconfig from '../dbinfo/database';

const router = new express.Router();

const conn = mysql.createConnection(dbconfig);

router.post('/RecommedFollow', (req, res) => {
  let username=req.session.passport.user;
  let sql = "select member.username, name, nickname, profileimgname, state, false as follow, convert(recommend.type using utf8) as type from member join "+
					  "(select * from ("+
						"(select following as username, '나를 팔로우중인 사람' as type, 1 as rank  from following where username = ?) "+
						"UNION (select follower as username, concat('함께 아는 사람 ', count(follower)) as type, 2 as rank from follower where username in "+
            "(select follower from follower where username=?) group by follower order by null) "+
						"UNION (select username, count(username) as type, 3 as rank from following group by username order by null) "+
						"UNION (select username, '' as type, 4 as rank from member)) as x "+
						"where username != ? "+
						"and username not in (select follower from follower where username=?) "+
						"group by username order by null) as recommend "+
						"on member.username=recommend.username "+
						"order by rank asc, type desc limit ?, ?";
  let params = [username, username, username, username, req.body.start, req.body.count];
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
  let username=req.session.passport.user;
  let sql = "insert into follower(username, follower) values(?, ?)";
  let params = [username, req.body.follower];
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
  let username=req.session.passport.user;
  let sql = "delete from follower where username=? and follower=?";
  let params = [username, req.body.follower];
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
