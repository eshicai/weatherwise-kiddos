const express = require('express');
const cors = require('cors');
require('dotenv').config();

const weatherRoutes = require('./routes/weather-routes');
const forecastRoutes = require('./routes/forecast-routes');

const app = express();
const port = process.env.port || process.argv[2] || 8080;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';


app.use(
  cors({
    origin: CORS_ORIGIN
  })
);

app.use(express.json());
app.use(express.static('public'));

app.use((req, _res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);

  next();
})

app.use('/weather', weatherRoutes);
app.use('/forecast', forecastRoutes);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
})