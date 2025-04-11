var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('admin/login', { // Renderiza login.hbs
        layout: 'admin/layout'  // Layout global
    });
});

router.post('/', async (req, res, next) => {
    try {
        var usuario = req.body.usuario; // Captura el nombre ingresado
        var password = req.body.password; // Captura la contraseña ingresada

        // Verifica si el usuario existe
        var data = await usuariosModel.getUserByUsernameAndPassword(usuario, password);
        console.log(data);
        
        if (data != undefined) {
            res.redirect('/admin/novedades'); // Ajustado: agrega "/" al inicio
        } else {
            res.render('admin/login', {
                layout: 'admin/layout',
                error: true // Muestra un mensaje de error si los datos son incorrectos
            });
        }
    } catch (error) {
        console.log(error); // Muestra el error en la consola para depuración
    }
}); // Finaliza router.post

module.exports = router;
