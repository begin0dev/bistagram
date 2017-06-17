import express from 'express';
import mysql from 'mysql';
import dbconfig from '../dbinfo/database';

const router = new express.Router();

const conn = mysql.createConnection(dbconfig);

router.get('/', (req, res) => {
    res.json({sessionID: req.sessionID, session: req.session});
});

router.get('/idCheck/:id', (req, res) => {
    let sql = "select id from member where id=?";
    let params = [req.params.id];
    conn.query(sql, params, function(err, rows) {
      if(err) {
        return res.status(500).json({message: err.message});
      }
      if(rows.length === 0){
        return res.json({possible: true});
      }
      else{
        return res.json({possible: false});
      }
    });
});

router.get('/nickCheck/:nick', (req, res) => {
    let sql = "select nick from member where nick=?";
    let params = [req.params.nick];
    conn.query(sql, params, function(err, rows) {
      if(err) {
        return res.status(500).json({message: err.message});
      }
      if(rows.length === 0){
        return res.json({possible: true});
      }
      else{
        return res.json({possible: false});
      }
    });
});

router.post('/signup', (req, res) => {
    console.log(req.body)
    let sql = "insert into member(id, name, nick, pw, state) values(?, ?, ?, ?, ?)";
    let params = [req.body.id, req.body.name, req.body.nick, req.body.pw, 'all'];
    conn.query(sql, params, function(err, rows) {
      if(err) {
        return res.status(500).json({message: err.message});
      }
      if(rows.affectedRows === 0){
        return res.json({result: false});
      }
      return res.json({result: true});
    });
});

router.post('/signin', (req, res) => {
    let sql = "select * from member where id=? and pw=?";
    let params = [req.body.id, req.body.pw];
    conn.query(sql, params, function(err, rows) {
      if(err) {
        return res.status(500).json({message: err.message});
      }
      return res.json(rows[0]);
    });
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({success: true});
});

module.exports = router;
