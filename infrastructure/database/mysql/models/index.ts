import { Sequelize } from "sequelize-typescript";
import config from "../confing";
import path from "path";
import fs from "fs";

const modelsDirectory = path.join(__dirname); 
const models = fs.readdirSync(modelsDirectory)
  .filter(file => file.endsWith('.ts') || file.endsWith('.js'))
  .map(file => require(path.join(modelsDirectory, file)).default)
  .filter(model => model !== null && model !== undefined)
  console.log('models:',models);

const sequelize = new Sequelize({
  ...config.getDatabaseSequilizeConfig(),
  dialect: 'mysql',
  models,
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  sequelize.sync({ force: true })
  .then(() => console.log('Database synchronized (force mode)'))
  .catch((error) => console.error('Error synchronizing the database:', error));
