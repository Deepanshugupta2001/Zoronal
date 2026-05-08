import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import {PrismaClient} from '@prisma/client';
import authRoutes from './http/routes/auth.routes.js';
import companyRoutes from './http/routes/company.routes.js';
import reviewRoutes from './http/routes/review.routes.js';
import errorMiddleware from './http/middleware/errorMiddleware.js';

const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT = process.env.PORT || 4444;
const prisma = new PrismaClient();

app.use((req, res, next) => {
  req.prisma = prisma
  next()
})

app.use('/api/auth', authRoutes)

app.use('/api/company', companyRoutes)

app.use('/api/reviews', reviewRoutes)

app.use(errorMiddleware)

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})