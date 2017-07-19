module.exports = {
  host     : process.env.DB_IP,
  user     : 'root',
  password : process.env.DB_PASS,
  port     : 3306,
  database : 'bistagram',
  connectionLimit: 50
};
