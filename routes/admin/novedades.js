// routes/admin/novedades.js
var express = require('express');
var router = express.Router();

// Middleware que verifica si existe sesión activa
function auth(req, res, next) {
  if (req.session && req.session.loggedin) {
    next();
  } else {
    res.redirect('/admin/login');
  }
}

// Ruta para mostrar novedades (protegida)
router.get('/', auth, (req, res) => {
  res.render('admin/novedades', {
    layout: 'admin/layout',
    usuario: req.session.usuario
  });
});

module.exports = router;
