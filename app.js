// app.js
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var hbs = require('hbs');
var mysql = require('mysql2');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var session = require('express-session');

// Rutas
var indexRouter     = require('./routes/index');
var usersRouter     = require('./routes/users');
var loginRouter     = require('./routes/admin/login');
var novedadesRouter = require('./routes/admin/novedades');//linea okey
var contactoRouter  = require('./routes/contacto');
var staffRouter     = require('./routes/staff');
var serviciosRouter = require('./routes/servicios');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Registrar los partials desde "views/partials"
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Configuración de session
app.use(session({
  secret: process.env.SESSION_SECRET || 'miClaveSecreta',
  resave: false,
  saveUninitialized: false
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de la aplicación
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/novedades', novedadesRouter);//linea okey
app.use('/contacto', contactoRouter);
app.use('/staff', staffRouter);
app.use('/servicios', serviciosRouter);

const axios = require('axios');
const API_URL = process.env.API_URL || 'https://api.example.com/latest';
const API_KEY = process.env.API_KEY || 'default_api_key';

app.get('/divisas', async (req, res) => {
  try {
    const response = await axios.get(API_URL, {
      params: { access_key: API_KEY },
      timeout: 5000
    });
    const rates = response.data.rates;
    res.render('nav', { rates });
  } catch (error) {
    console.error('Error al obtener las tasas de cambio:', error);
    res.render('nav', { rates: null });
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
