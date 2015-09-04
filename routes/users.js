var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated() == true){
    res.json(req.isAuthenticated());
  } else {
    res.send('Not Authorized');
  }
});

module.exports = router;
