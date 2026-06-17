// imports
import express from "express";
import morgan from 'morgan';          
import cors from 'cors';
import passport from "./auth/passport_handler.js";
import session from 'express-session';
import auth_routes from './routes/auth_routes.js'

// init express
const app = new express();
const port = 3001;

app.use(morgan('dev'));
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));


app.use(session({
  secret: 'LastRace server secret!!!',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));

app.use('/api', auth_routes);


app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: 'Internal server error' });
});


// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


