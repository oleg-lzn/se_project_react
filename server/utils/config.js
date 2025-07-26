const {
  JWT_SECRET = "CAT_FISH",
  DB_URL = "mongodb://127.0.0.1:27017/wtwr_db",
  PORT = 3001,
} = process.env;

module.exports = {
  JWT_SECRET,
  DB_URL,
  PORT,
};
