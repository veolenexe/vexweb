var Cuisine = require('../models/cuisine');
var Hall = require('../models/hall');
var Table = require('../models/table');

var async = require('async');

exports.index = function(req, res) {

    async.parallel({
        available_table_count: function(callback) {
            Table.countDocuments({status:'Свободен'}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        hall_count: function(callback) {
            Hall.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('index', { title: 'Ресторан "4 зала" ', error: err, data: results });
    });
};
// Display list of all Cuisines.
exports.cuisine_list = function (req, res, next) {
    res.render('cuisine', {title: 'Cuisine List'});
};