const { JWT_SECRET, DB_URL, PORT = 3001 } = process.env;

module.exports = {
  JWT_SECRET,
  DB_URL,
  PORT,
};
