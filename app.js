const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

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

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));//check the tutorial on why we use path.join

//to parse the body
app.use(express.urlencoded({extended: true}))



//the very basic route
app.get('/', (req, res) => {
    res.render('home')
});


app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    //res.render(view [, locals] [, callback])
    //render {campgrounds}, pass the data into the ejs file and display on webpage
    res.render('campgrounds/index',{campgrounds});
});

//this need to be before the '/campgrounds/:id'
app.get('/campgrounds/new', (req,res) => {
    res.render('campgrounds/new');
});

app.post('/campgrounds', async (req,res) => {
    //by default, req.body is empty
    //res.send(req.body);
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
})

app.get('/campgrounds/:id', async(req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show',{campground});
});


app.get('/', (req, res) => {
    res.render('home');
});




//only hear the request from port 3000
app.listen(3000, () => {
    console.log('Serving on port 3000')
});
