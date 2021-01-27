var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TableSchema = new Schema(
    {
        number: {type: Number, required: true},
        position: {type: String, required: true, enum:['Возле окна', 'центр', 'Веранда'], default: 'центр'},
        hall: { type: Schema.Types.ObjectId, ref: 'Hall', required: true },
        MaxPersons: {type: Number, required: true},
        status: {type: String, required: true, enum: ['Свободен', 'Забронирован'], default: 'Свободен'}
    }
);

// Virtual for Table's URL
TableSchema
    .virtual('url')
    .get(function () {
        return '/catalog/table/' + this._id;
    });


//Export model
module.exports = mongoose.model('Table', TableSchema);