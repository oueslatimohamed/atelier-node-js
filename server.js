import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';


import gameRoutes from './routes/game.js';
import userRoutes from './routes/user.js';
import achatRoutes from './routes/achat.js';
import { errorHandler, notFoundError } from './middleware/error-handler.js';

const app = express();
const port = process.env.PORT || 9090;
const databaseName = 'exerice4gamix2122';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://localhost:27017/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });


app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// middlewares testing 
app.use((req,res,next) => {
  console.log("middleware executed ....");
  next();
})



app.use('/game', gameRoutes);
app.use('/user', userRoutes);
app.use('/buy', achatRoutes);

app.use(notFoundError)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});