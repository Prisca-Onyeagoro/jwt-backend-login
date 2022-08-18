import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import GoalRoutes from './routes/GoalRoutes.js';
import bodyParser from 'body-parser';
import { errorHandler } from './middleware/errormiddleware.js';
import connectDB from './Config/Db.js';
import UserRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/goals', GoalRoutes);
app.use('/api/users', UserRoutes);

const PORT = process.env.PORT || 4000;
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is serving on Port: ${PORT}`);
  //connect our database
  connectDB();
});
