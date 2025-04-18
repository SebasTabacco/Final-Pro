var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
    console.log("Ruta GET /disenos llamada."); // Util para depurar
    res.render("servicios", { 
        title: "servicios", // Título dinámico de la página
        layout: "admin/layout", // Especifica el uso de layout.hbs
        hideNav: true
    });
});

module.exports = router;