import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://root:example@mongodb:27017/triumphMotorcyclesDb?authSource=admin';
const MAX_RETRIES = 5;
const RETRY_INTERVAL = 5000;

export const connectDB = async (retryCount = 0): Promise<typeof mongoose> => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('MongoDB déjà connecté');
      return mongoose;
    }

    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
    };

    console.log('Tentative de connexion à MongoDB...');
    const connection = await mongoose.connect(MONGODB_URI, options);
    console.log('MongoDB connecté avec succès');
    
    mongoose.connection.on('error', (err) => {
      console.error('Erreur MongoDB:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB déconnecté');
    });

    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('MongoDB déconnecté suite à l\'arrêt de l\'application');
        process.exit(0);
      } catch (err) {
        console.error('Erreur lors de la déconnexion de MongoDB:', err);
        process.exit(1);
      }
    });

    return connection;
  } catch (error) {
    console.error(`Erreur de connexion à MongoDB (tentative ${retryCount + 1}/${MAX_RETRIES}):`, error);
    
    if (retryCount < MAX_RETRIES) {
      console.log(`Nouvelle tentative dans ${RETRY_INTERVAL/1000} secondes...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
      return connectDB(retryCount + 1);
    }
    
    throw new Error(`Impossible de se connecter à MongoDB après ${MAX_RETRIES} tentatives`);
  }
};

export const syncDatabase = async (): Promise<void> => {
  try {
    await connectDB();
    console.log('Début de la synchronisation de la base de données');

    const modelsDir = __dirname;
    const modelFiles = fs.readdirSync(modelsDir).filter(file => 
      (file.endsWith('.ts') || file.endsWith('.js')) && file !== 'index.ts'
    );

    for (const file of modelFiles) {
      try {
        const modelPath = path.join(modelsDir, file);
        const modelModule = await import(modelPath);
        const model = modelModule.default;

        if (model && model.syncIndexes) {
          await model.syncIndexes();
          console.log(`Indexes synchronisés pour le modèle ${file}`);
        }
      } catch (error) {
        console.error(`Erreur lors de la synchronisation du modèle ${file}:`, error);
      }
    }

    console.log('Synchronisation de la base de données terminée');
  } catch (error) {
    console.error('Erreur lors de la synchronisation de la base de données:', error);
    throw error;
  }
};