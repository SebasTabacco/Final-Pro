var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
    res.render("contacto", { 
        title: "Contacto", // Título dinámico de la página
        layout: "admin/layout", // Especifica el uso de layout.hbs
        hideNav: true
    });
});

module.exports = router;
