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

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/admin/login'); // login.js
var novedadesRouter = require('./routes/admin/novedades');
var contactoRouter = require('./routes/contacto');
var staffRouter = require('./routes/staff');
var diseñosRouter = require('./routes/diseños');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views/admin'));
hbs.registerPartials(path.join(__dirname, "views"));

// Configuración de session (asegúrate de usar una clave en variables de entorno en producción)
app.use(session({
  secret: process.env.SESSION_SECRET || 'miClaveSecreta',
  resave: false,
  saveUninitialized: false,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/novedades', novedadesRouter);
app.use('/contacto', contactoRouter);
app.use('/staff', staffRouter);
app.use('/diseños', diseñosRouter);


const axios = require('axios');

app.get('/divisas', async (req, res) => {
  try {
    const response = await axios.get('URL_DE_LA_API', {
      params: { access_key: 'TU_CLAVE_API' }
    });
    const rates = response.data.rates; // Ajusta según la estructura de la API
    res.render('nav', { rates });
  } catch (error) {
    console.error('Error al obtener las tasas de cambio:', error);
    res.render('nav', { rates: null });
  }
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Manejo del error
app.use(function (err, req, res, next) {
  // set locals, solo desplegar el error en desarrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // renderiza la página de error
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

