var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  /*res.render('admin/layout', { title: 'Express' });*/
  res.redirect('admin/login')
});

module.exports = router;
