const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/auth');

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '../client')));

mongoose.connect('mongodb://127.0.0.1:27018/praqcon');

app.use('/', authRoutes);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
});
