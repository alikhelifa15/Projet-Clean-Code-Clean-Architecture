import dotenv from 'dotenv';
dotenv.config();

const config = {
    env: process.env.NODE_ENV || 'development',
    isDev: process.env.NODE_ENV === 'development',
    isTest: process.env.NODE_ENV === 'test',
    isProd: process.env.NODE_ENV === 'production',
    port: Number(process.env.PORT) || 3000,
    getDatabaseSequilizeConfig() {
        return {
            dialect: 'mysql',
            host: process.env.DB_HOST || 'mysql',
            port: Number(process.env.DB_PORT) || 3306,
            username: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || 'rootpassword',
            database: process.env.DB_NAME || 'triumphMotorcyclesDb',
        };
    }
}

export default config;
