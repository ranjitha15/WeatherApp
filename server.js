const express = require('express');//Require express
const request = require('request');//Require request
const bodyParser = require('body-parser'); //Require body parser(make use of req.body object)
const app = express();//create an instance by invoking express
const apiKey = process.env.MYAPIKEY;
//--SERVE STATIC FILES--//
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
//--SETUP VIEW ENGINE EJS--//
app.set('view engine', 'ejs');

//--ROUTES--//
app.get('/', function(req,res){ //Root URL
    res.render('index', {weather: null, error: null});//Render view
});
app.post('/', function(req,res) {
    let city = req.body.city;
    let url =`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    request(url, function(err, response, body){
        if(err){
            res.render('index', {weather: null, error:'Try again'});
        }else{
            let weather = JSON.parse(body);
            if(weather.main == undefined){
                res.render('index', {weather: null, error:'Try again'});
            }
            else{

                let message = `Its ${weather.main.temp} degrees in ${weather.name}`;
                res.render('index', {weather: message, error:null});
            }
        }
    });

});
//--SERVER--//
app.listen(3000,function(){
    console.log("Listening on port 3000");
});
