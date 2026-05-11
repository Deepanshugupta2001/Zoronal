import dotenv from 'dotenv';
dotenv.config();

const env = {
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'https://zoronal-six.vercel.app',
    PORT: process.env.PORT || 'https://zoronal-9zsp.onrender.com',
    JWT_SECRET: process.env.JWT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL
}

export default env;