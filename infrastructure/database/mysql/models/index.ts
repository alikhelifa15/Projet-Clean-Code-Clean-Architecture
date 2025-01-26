import { Sequelize } from "sequelize-typescript";
import config from "../confing";
import path from "path";
import fs from "fs";
import mysql from "mysql2";
import "reflect-metadata";

const modelsDirectory = path.join(__dirname);
const models = fs.readdirSync(modelsDirectory)
  .filter(file => file.endsWith('.ts') || file.endsWith('.js'))
  .map(file => require(path.join(modelsDirectory, file)).default)
  .filter(model => model !== null && model !== undefined);

const dbConfig = config.getDatabaseSequilizeConfig();


const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.username,
  password: dbConfig.password,
  connectTimeout: 60000,
});

connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`, (err) => {
  if (err) {
    console.error('Error creating database:', err);
    process.exit(1);
  } else {
    console.log('Database is ready (created if not existing).');
    
    const sequelize = new Sequelize({
      ...dbConfig,
      dialect: 'mysql',
    
      dialectOptions: {
        connectTimeout: 60000,
        connectionLimit: 10,
        queueLimit: 0,
        waitForConnections: true,
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 60000,
        idle: 10000
      },
      retry: {
        max: 5
      },
      models,
  
    });

    sequelize.authenticate()
      .then(() => {
        console.log('Connection to the database has been established successfully.');
        return sequelize.sync({ force: true });
      })
      .then(async () => {
        console.log('Database synchronized (force mode).');
        console.log('Database seeded successfully.');
      })
      .catch((error) => {
        console.error('Unable to connect to the database or synchronize:', error);
      });
  }
});

