const express = require('express');
const cors = require('cors');
require('dotenv').config();

const weatherRoutes = require('./routes/weather-routes');
const forecastRoutes = require('./routes/forecast-routes');
const authRoutes = require('./routes/auth-routes');
const cookieSession = require('cookie-session');
const passport = require('passport');
// const expressSession = require('express-session');
const passportSetup = require('./passport');

const app = express();
const port = process.env.port || process.argv[2] || 8080;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

app.use(
  cookieSession({ name: 'session', keys: ['weatherwise'], maxAge: 24 * 60 * 60 * 100 })
);

// app.use(
//   expressSession({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true
//   })
// );

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: CORS_ORIGIN,
    methods: "GET, POST, PUT, DELETE",
    credentials: true
  })
);

app.use(express.json());
app.use(express.static('public'));

app.use((req, _res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);

  next();
})

app.use('/auth', authRoutes);
app.use('/weather', weatherRoutes);
app.use('/forecast', forecastRoutes);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
})