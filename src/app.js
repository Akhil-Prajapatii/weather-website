const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// <=======>render html file statically<=======>

const app = express();
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname,'../public');
const templatePath = path.join(__dirname,'../template/views');
const headerPath = path.join(__dirname,'../template/partials');

app.set('view engine','hbs');
app.set('views',templatePath);

hbs.registerPartials(headerPath);

app.use(express.static(publicPath));

app.get('/',(req,res) => {
    res.render('index',{
        title:'Weather',
        name:'Akhil'
    });
})

app.get('/product',(req,res) => {
    if(!req.query.search){
        return res.send('Please enter search')
    }

    res.send({
        product:[]
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About me',
        name:'Akhil'
    });
})

app.get('/help',(req,res) => {
    res.render('help',{
        helptext:'Hee is some help text',
        title:'help',
        name:'Akhil'
    });
})

app.get('/weather',(req,res) => {
    if(!req.query.location){
        return res.send({
            error:'Provide location'
        })
    }

    const location = req.query.location;

    geocode(location, (geocodeErr,{lat,lon,location} = {}) => {
        if(geocodeErr){
           return res.send({error:geocodeErr})
        }

        forecast(lat, lon, (forecastErr,{temperature,feelslike,time} = {}) => {
        if(forecastErr){
            return res.send({error:forecast})
        }

        res.send({location,lat,lon,temperature,feelslike,time})
        })
    })

    // res.send({
    //     location:req.query.location
    // });
})

app.get('/help/*',(req,res) => {
    res.send('Article Not found');
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        errorMsg:'Page not found',
        name:'Akhil'
    });
})

app.listen(port,() => {
    console.log(`Listing to the ${port} port`)
});