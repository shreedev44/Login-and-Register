const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const nocache = require('nocache');
const userRoute = require('./routes/usersRoutes');
const adminRoute = require('./routes/adminRoutes');

mongoose.connect('mongodb://localhost:27017/userDatabase');

const app = express();
const port = process.env.PORT || 3000;


app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/fonts', express.static(path.join(__dirname, 'public/fonts')));

app.use(nocache());


app.use('/', userRoute);
app.use('/admin', adminRoute);

app.listen(port, () => console.log('http://localhost:3000'));