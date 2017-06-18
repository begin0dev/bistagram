import express from 'express';
import mysql from 'mysql';
import dbconfig from '../dbinfo/database';

const router = new express.Router();

const conn = mysql.createConnection(dbconfig);

router.get('/', (req, res) => {
    res.json({sessionID: req.sessionID, session: req.session});
});

router.get('/checkUserName/:username', (req, res) => {
    let sql = "select username from member where username=?";
    let params = [req.params.username];
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

router.get('/checkNickName/:nickname', (req, res) => {
    let sql = "select nickname from member where nickname=?";
    let params = [req.params.nickname];
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
    let sql = "insert into member(username, name, nickname, password, state) values(?, ?, ?, ?, ?)";
    let params = [req.body.username, req.body.name, req.body.nickname, req.body.password, 'all'];
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
    let sql = "select username, name, nickname, profileimgname, state from member where username=? and password=?";
    let params = [req.body.username, req.body.password];
    conn.query(sql, params, function(err, rows) {
      if(err) {
        return res.status(500).json({message: err.message});
      }
      console.log(rows[0])
      return res.json(rows[0]);
    });
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({success: true});
});

module.exports = router;
