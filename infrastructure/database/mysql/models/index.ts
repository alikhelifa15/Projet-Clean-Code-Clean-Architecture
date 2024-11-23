import { Sequelize } from "sequelize-typescript";
import config from "../confing";
import path from "path";
import fs from "fs";
import mysql from "mysql2";
import "reflect-metadata";
import { seedDatabase } from "../seedData"; // Assurez-vous que ce fichier existe et contient les données de seed

const modelsDirectory = path.join(__dirname); 
const models = fs.readdirSync(modelsDirectory)
  .filter(file => file.endsWith('.ts') || file.endsWith('.js'))
  .map(file => require(path.join(modelsDirectory, file)).default)
  .filter(model => model !== null && model !== undefined);

console.log('models:', models);

const dbConfig = config.getDatabaseSequilizeConfig();

const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.username,
  password: dbConfig.password
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
      models,
    });

    sequelize.authenticate()
      .then(() => {
        console.log('Connection to the database has been established successfully.');
        return sequelize.sync({ force: true }); // Synchronise les modèles avec la base
      })
      .then(async () => {
        console.log('Database synchronized (force mode).');
        await seedDatabase(); // Appelle la fonction de seed pour insérer les données
        console.log('Database seeded successfully.');
      })
      .catch((error) => {
        console.error('Unable to connect to the database or synchronize:', error);
      });
  }
});
