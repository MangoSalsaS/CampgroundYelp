
//make this self contain
const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
//back out one step to home
const Campground = require('../models/campground');

//27017 is the default mongodb, use yelp-camp database
mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then( () => {
            console.log("CONNECTION OPEN")
        }
    ).catch( err => {
    console.log("!!!!!!Error!!!!!")
    console.log(err)

})

const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error"));
db.once("open", () => {
    console.log("Database Connected!!!!");
});

//function to get a random index for array, input value is array,
const sample = array =>  array[Math.floor(Math.random()*array.length)];


const seedDB = async () => {
    //await Campground.deleteMany({});
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`
        })
        await camp.save();
    }
}

//when to execute the database
seedDB().then(()=>{
    mongoose.connection.close();
});