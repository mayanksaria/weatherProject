const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req, res) {

  const query = req.body.cityName;
  const apiKey = "72f41c0cdb8f1b3d9cef927c4711cb29";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" +units
  https.get(url, function(response) {
    // console.log(response);
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      console.log(weatherData);

  //    console.log(JSON.stringify(data));
      const object = {
        name: "Mayank",
        food: "Indian"
      };
      console.log(JSON.stringify(object));

      const temp = weatherData.main.temp
      const description = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      console.log(temp);
      console.log(description);
      console.log(icon);
      res.write("<p>The weather is currently " +description + "</p>");
      res.write("<h1>The temperature in " + query + " is " + temp + " in degrees</h1>");
      res.write("<img src = " + imageURL + ">");
      res.send();           // In order to send multiple data we use res.write()

      })
  })
  //  res.send("Server runnng");          Cannot send res.send() twice
    console.log("Post req received");
})

app.all("*", function(req, res) {
  res.send("Not found at all");
});

app.listen(3000, function() {
  console.log("Server running");
});
