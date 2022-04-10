const { Console } = require('console');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// CORS para que permita la consulta a diferentes destinos
const cors = require('cors');
const path = require('path');
router.get('/elsocialista', function(req, res, next) {  
  res.sendFile(path.resolve('views/750-el-socialista-n-530'));
  //res.end();
  

  return;
  res.set('Content-Type', 'application/rss+xml');
  res.send(xml);
  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.redirect('https://izquierdasocialista.org.ar/2020/index.php/blog/elsocialista/itemlist/category/750-el-socialista-n-530?format=feed');  
});
module.exports = router;
