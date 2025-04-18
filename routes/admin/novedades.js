var express = require('express');
var router = express.Router();
var novedadesModel = require('./../../models/novedadesModel');

// Middleware para verificar si existe sesión activa
function auth(req, res, next) {
  if (req.session && req.session.loggedin) {
    next();
  } else {
    res.redirect('/admin/login');
  }
}

// Ruta GET: Mostrar todas las novedades (protegida)
router.get('/', auth, async (req, res) => {
  try {
    const novedades = await novedadesModel.getNovedades();
    res.render('admin/novedades', {
      layout: 'admin/layout',
      hideNav: true,
      usuario: req.session.usuario,
      novedades: novedades
    });
  } catch (error) {
    console.log("Error al obtener las novedades:", error);
    res.render('admin/error', { layout: 'admin/layout', message: 'Error al cargar las novedades' });
  }
});

// Ruta GET: Mostrar formulario para agregar una novedad
router.get('/agregar', auth, (req, res) => {
  res.render('admin/agregar', { layout: 'admin/layout' });
});

// Ruta POST: Procesar formulario para agregar una novedad
router.post('/agregar', auth, async (req, res) => {
  try {
    if (req.body.Titulo && req.body["Valor-USD"] && req.body.Consulta) {
      let obj = {
        Titulo: req.body.Titulo,
        "Valor-USD": req.body["Valor-USD"],
        Consulta: req.body.Consulta
      };
      await novedadesModel.insertNovedades(obj);
      res.redirect('/admin/novedades');
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true,
        message: 'Todos los campos son obligatorios'
      });
    }
  } catch (error) {
    console.log("Error al agregar una novedad:", error);
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se pudo agregar la novedad'
    });
  }
});

// Ruta GET: Eliminar una novedad por su ID
router.get('/delete/:id', auth, async (req, res) => {
  try {
    var id = req.params.id;
    await novedadesModel.deleteNovedadesMyId(id);
    res.redirect('/admin/novedades');
  } catch (error) {
    console.error("Error al eliminar la novedad:", error);
    res.render('admin/error', {
      layout: 'admin/layout',
      message: 'Error al eliminar la novedad'
    });
  }
});

// =================================================
// Rutas para MODIFICAR una novedad (editar)
// =================================================

// Ruta GET: Mostrar el formulario para modificar una novedad por su ID
router.get('/modificar/:id', auth, async (req, res) => {
  try {
    var id = req.params.id;
    var novedad = await novedadesModel.getNovedadesById(id);
    if (!novedad) {
      return res.render('admin/error', {
        layout: 'admin/layout',
        message: 'La novedad no fue encontrada.'
      });
    }
    res.render('admin/modificar', {
      layout: 'admin/layout',
      novedad: novedad
    });
  } catch (error) {
    console.error('Error al cargar la novedad para modificar:', error);
    res.render('admin/error', {
      layout: 'admin/layout',
      message: 'Error al cargar la novedad.'
    });
  }
});

// Ruta POST: Procesar el formulario para modificar y actualizar la novedad
router.post('/modificar/:id', auth, async (req, res) => {
  try {
    var id = req.params.id;
    let obj = {
      Titulo: req.body.Titulo,
      "Valor-USD": req.body["Valor-USD"],
      Consulta: req.body.Consulta
    };
    await novedadesModel.updateNovedadById(id, obj);
    res.redirect('/admin/novedades');
  } catch (error) {
    console.error('Error al modificar la novedad:', error);
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se pudo modificar la novedad'
    });
  }
});

module.exports = router;
