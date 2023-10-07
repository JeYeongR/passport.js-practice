const { DataSource } = require("typeorm");

const myDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: true,
  bigNumberStrings: false,
  supportBigNumbers: true,
});

myDataSource.initialize().then(() => console.log("Data Source has been initialized!"));

module.exports = { myDataSource };
