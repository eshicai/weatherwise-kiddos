const express = require('express');
const cors = require('cors');
require('dotenv').config();

const weatherRoutes = require('./routes/weather');
const weatherSummaryRoutes = require('./routes/weatherSummary');
const tomorrowRoutes = require('./routes/tomorrow');
const todayRoutes = require('./routes/today');

const app = express();
const port = process.env.port || process.argv[2] || 8080;
const { CORS_ORIGIN } = process.env;

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use(express.static('public'));

app.use((req, _res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);

  next();
})

app.use('/weather', weatherRoutes);
app.use('/weathersummary', weatherSummaryRoutes);
app.use('/tomorrow', tomorrowRoutes);
app.use('/today', todayRoutes);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
})