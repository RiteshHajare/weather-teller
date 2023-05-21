const express = require("express");
const https = require("node:https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
  res.sendFile(__dirname+"/index.html" );
});

app.post("/",function(req,res){
  const query = req.body.cityName;
  const apiKey = "bc079ed1ebaa9cd34b6ad4da706a2019";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<h1>temp in "+query+" is "+temp+" degrees</h1>");
      res.write("<p>the discription is "+description+"</p>");
      res.write("<img src="+imageURL+">");
      res.send();

    });
  });
});




app.listen('3000',function(){
  console.log("server is runnning on port 3000.");
});
