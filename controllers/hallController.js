var Hall = require('../models/hall');

// Display list of all Halls.
exports.hall_list = function (req, res, next) {
    Hall.find({}, 'name cuisines picture_src description')
        .populate('cuisines')
        .exec(function (err, list_halls) {
            if (err)
                return next(err);
            //Successful, so render

            res.render('hall_list', {title: 'Список залов', hall_list: list_halls});
        });
};
