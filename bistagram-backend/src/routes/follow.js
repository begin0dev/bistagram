import express from 'express';
import mysql from 'mysql';
import dbconfig from '../dbinfo/database';

const router = new express.Router();

const conn = mysql.createConnection(dbconfig);

router.post('/RecommedFollow', (req, res) => {
  if (!req.user) {
    return res.status(401).json({code: 0, message: 'NOT LOGGED IN'});
  }
  let username=req.user.username;
  let sql = "select member.username, name, nickname, profileimgname, state, convert(recommend.type using utf8) as type from member join "+
					  "(select * from ("+
						"(select follower as username, '나를 팔로우중인 사람' as type, 1 as rank  from follower where username = ?) "+
						"UNION (select following as username, concat('함께 아는 사람 ', count(following)) as type, 2 as rank from following where username in "+
            "(select following from following where username=?) group by following order by null) "+
						"UNION (select username, count(username) as type, 3 as rank from follower group by username order by null) "+
						"UNION (select username, '' as type, 4 as rank from member)) as x "+
						"where username != ? "+
						"and username not in (select following from following where username=?) "+
						"group by username order by null) as recommend "+
						"on member.username=recommend.username "+
						"order by rank asc, type desc limit ?, ?";
  let params = [username, username, username, username, req.body.start, req.body.count];
  conn.query(sql, params, function(err, rows) {
    if(err) {
      return res.status(400).json({code: 1, message: err.message});
    }
    else{
      return res.json(rows);
    }
  });
});

router.post('/following', (req, res) => {
  let username=req.user.username;
  let sql = "insert into following(username, following) values(?, ?)";
  let params = [username, req.body.username];
  conn.query(sql, params, function(err, rows) {
    if(err) {
      return res.status(500).json({message: err.message});
    }
    else{
      if(rows.affectedRows===0){
        return res.status(500).json({message: 'fail'});
      }
      else{
        return res.json({username: req.body.username});
      }
    }
  });
});

router.delete('/unfollow', (req, res) => {
  let username=req.user.username;
  let sql = "delete from following where username=? and following=?";
  let params = [username, req.body.username];
  conn.query(sql, params, function(err, rows) {
    if(err) {
      return res.status(500).json({message: err.message});
    }
    else{
      if(rows.affectedRows===0){
        return res.status(500).json({message: 'fail'});
      }
      else{
        return res.json({username: req.body.username});
      }
    }
  });
});

router.post('/searchUserFollower', (req, res) => {
  let sql = "select m.username, m.name, m.nickname, m.profileimgname, m.state "+
            "from follower fw join member m on fw.follower=m.username "+
            "where fw.username=? limit ?, ?";
  let params = [req.body.searchUser, req.body.start, 25];
  conn.query(sql, params, function(err, rows) {
    if(err) {
      return res.status(500).json({message: err.message});
    }
    else{
      return res.json(rows);
    }
  });
});


router.post('/searchUserFollowing', (req, res) => {
  let sql = "select m.username, m.name, m.nickname, m.profileimgname, m.state "+
            "from following fw join member m on fw.following=m.username "+
            "where fw.username=? limit ?, ?";
  let params = [req.body.searchUser, req.body.start, 25];
  conn.query(sql, params, function(err, rows) {
    if(err) {
      return res.status(500).json({message: err.message});
    }
    else{
      return res.json(rows);
    }
  });
});

module.exports = router;
