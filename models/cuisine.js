const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CuisineSchema = new Schema(
    {
        italian: {type: Boolean, required: true},
        japanese: {type: Boolean, required: true},
        russian: {type: Boolean, required: true}
    }
);

// Virtual for cuisine's URL
CuisineSchema
    .virtual('url')
    .get(function () {
        return '/catalog/cuisine/' + this._id;
    });

CuisineSchema
    .virtual('available')
    .get(function () {
        let available_cuisines = ''
        if (this.italian) available_cuisines += 'итальянская '
        if (this.japanese) available_cuisines += 'японская '
        if (this.russian) available_cuisines += 'русская '
        available_cuisines = available_cuisines.trim().split(' ').join(', ');
        return available_cuisines
    });

//Export model
module.exports = mongoose.model('Cuisine', CuisineSchema);