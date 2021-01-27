var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var HallSchema = new Schema(
    {
        name: {type: String, required: true, maxlength: 100},
        cuisines: {type: Schema.Types.ObjectId, ref: 'Cuisine', required: true},
        picture_src: {type: String, required: true, maxlength: 100},
        description: {type: String, required: true, maxlength: 1000}
    }
);


// Virtual for hall's URL
HallSchema
    .virtual('url')
    .get(function () {
        return '/catalog/hall/' + this._id;
    });

//Export model
module.exports = mongoose.model('Hall', HallSchema);