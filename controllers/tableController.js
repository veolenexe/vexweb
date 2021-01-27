var Table = require('../models/table');
var Hall = require('../models/hall');
const { body,validationResult } = require("express-validator");
var async = require('async');


// Display list of all Tables.
exports.table_list = function(req, res) {
    Hall.find({}, 'name')
        .exec(function (err, list_halls) {
            if (err)
                return next(err);
            //Successful, so render
            Table.find({}, 'number position hall MaxPersons status')
                .populate('hall')
                .exec(function (err, list_tables) {
                    if (err)
                        return next(err);
                    res.render('table_list', {title: '', hall_list: list_halls, table_list: list_tables});
                })
        });
};

// Display detail page for a specific Table.
exports.table_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Table detail: ' + req.params.id);
};

// Display Table create form on GET.
exports.table_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Table create GET');
};

// Handle Table create on POST.
exports.table_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Table create POST');
};

// Display Table delete form on GET.
exports.table_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Table delete GET');
};

// Handle Table delete on POST.
exports.table_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Table delete POST');
};

// Display Table update form on GET.
exports.table_update_get = function(req, res, next) {

    // Get table, authors and genres for form.
    async.parallel({
        table: function(callback) {
            Table.findById(req.params.id).populate('hall').exec(callback);
        }
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.table==null) { // No results.
            var err = new Error('Table not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        // Mark our selected genres as checked.

        res.render('table_form', { title: 'Update Table', table: results.table });
    });

};
// Handle Table update on POST.
exports.table_update_post = [

    // Validate and sanitise fields.
    body('person_name', 'Введено некорректное имя.').trim().matches(/^((?!<script[^>]*?>.*?(<\/script>|)?.*).)*$/si).isLength({ min: 1 }).escape(),
    body('time', 'Введено некоректное время.').trim().isLength({ min: 1 }).escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Table object with escaped/trimmed data and old id.
        var table = new Table(
            { number: req.params.number,
                position: req.params.position,
                hall: req.params.hall,
                MaxPersons: req.params.MaxPersons,
                status: 'Забронирован',
                _id:req.params.id //This is required, or a new ID will be assigned!
            });
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all authors and genres for form.
            async.parallel({
                table: function(callback) {
                    Table.findById(req.params.id).populate('hall').exec(callback);
                }
            }, function(err, results) {
                if (err) { return next(err); }
                res.render('table_form', { title: 'Update Table', table: results.table, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Table.findByIdAndUpdate(req.params.id, table, {}, function (err,thetable) {
                if (err) { return next(err); }
                // Successful - redirect to table detail page.
                res.redirect('/catalog/tables');
            });
        }
    }
];
