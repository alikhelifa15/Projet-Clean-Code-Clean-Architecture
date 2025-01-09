import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://root:example@mongodb:27017/triumphMotorcyclesDb?authSource=admin');
    console.log('MongoDB connecté');
  } catch (err) {
    console.error('Erreur de connexion à MongoDB:', err);
    process.exit(1);
  }
};

const syncDatabase = async () => {
  try {
    await connectDB();

    const modelsDir = __dirname;
    const modelFiles = fs.readdirSync(modelsDir).filter((file) => file.endsWith('.ts') || file.endsWith('.js'));

    for (const file of modelFiles) {
      if (file !== 'index.ts') {
        const modelPath = path.join(modelsDir, file);
        const modelModule = await import(modelPath);

        const model = modelModule.default;
        if (model && model.syncIndexes) {
          await model.syncIndexes();
          console.log(`Les index du modèle ${file} sont synchronisés.`);
        }
      }
    }

    mongoose.disconnect();
    console.log('Synchronisation de la base de données terminée.');
  } catch (error) {
    console.error('Erreur lors de la synchronisation de la base de données :', error);
    mongoose.disconnect();
  }
};

syncDatabase();
