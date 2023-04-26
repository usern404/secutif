const express = require('express');
const cors = require('cors');

const bankRouter = require('../routes/bank');
const landRouter = require('../routes/landTitle');
const clientRouter = require('../routes/client');
const loansRouter = require('../routes/loans');

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/bank', bankRouter);
app.use('/api/land', landRouter);
app.use('/api/client', clientRouter);
app.use('/api/loans', loansRouter);

module.exports = app;