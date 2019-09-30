module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql"
  },

  "development-old": {
    username: "root",
    password: "test",
    database: "movie_db",
    host: "127.0.0.1",
    port: "3306",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: "root",
    database: "movie_test_db",
    host: "127.0.0.1",
    port: "3307",
    dialect: "mysql",
    logging: false
  },
  production: {
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql"
  }
};
