//model template
const mongoose = require('mongoose');
const Schema = mongoose.Schema;//to make the path short

const CampGroundSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String
});
//pay attention to the spell
//this model has mame campgrounds with Schema CampGroundSchema
module.exports = mongoose.model('campground', CampGroundSchema);


//any file that calls this model will and write data, will update the data in db.campground model