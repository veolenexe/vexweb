var express = require('express');
var router = express.Router();


var cuisine_controller = require('../controllers/cuisineController');
var hall_controller = require('../controllers/hallController');
var table_controller = require('../controllers/tableController');

/// cuisine ROUTES ///

router.get('/', cuisine_controller.index);  //This actually maps to /catalog/ because we import the route with a /catalog prefix

router.get('/cuisine', cuisine_controller.cuisine_list);

/// HALL ROUTES ///

router.get('/hall', hall_controller.hall_list);

/// TABLE ROUTES ///

router.get('/table/:id/update', table_controller.table_update_get);

router.post('/table/:id/update', table_controller.table_update_post);

router.get('/tables', table_controller.table_list);

module.exports = router;