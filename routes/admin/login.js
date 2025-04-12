// routes/admin/login.js
var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel');

/* Muestra el formulario de login */
router.get('/', function(req, res) {
  res.render('admin/login', {
      layout: 'admin/layout'
  });
});

/* Proceso del formulario de login */
router.post('/', async (req, res, next) => {
  try {
    var usuario = req.body.usuario;   // Captura el nombre ingresado
    var password = req.body.password; // Captura la contraseña ingresada

    // Verifica si el usuario existe (idealmente se debe usar bcrypt para comparar contraseñas)
    var data = await usuariosModel.getUserByUsernameAndPassword(usuario, password);
    
    console.log(data);
    if (data != undefined) { // Usuario encontrado
      console.log("Usuario encontrado:", data);
      // Guarda datos en la sesión
      req.session.loggedin = true;
      req.session.usuario = usuario;
      
      res.redirect('/admin/novedades');
    } else { // Usuario no encontrado
      console.log("Usuario no encontrado.");
      res.render('admin/login', {
          layout: 'admin/layout',
          error: 'Credenciales incorrectas'
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Ruta para logout (destruye la sesión)
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) console.log(err);
    res.redirect('/admin/login');
  });
});

module.exports = router;


