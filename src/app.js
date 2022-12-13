const forecast = require("./utils/forecast");
const path = require("path"); //built in
const express = require("express");
const hbs = require("hbs");
const { isGeneratorFunction } = require("util/types");
const { response } = require("express");

const app = express();

//Define path for Express configuration
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../public/templates/views");
const partialsPath = path.join(__dirname, "../public/templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to server
//Express will work through the application until finds a match for that route
//In case of our express static call,it is indeed going to find a match
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Yasmin",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Yasmin",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Yasmin",
    helpText: "This is some helpful text",
  });
});

/*
app.get("/help", (req, res) => {
  res.send({
    name: "Yasmin",
    age: 27,
  });
});

app.get("/about", (req, res) => {
  res.send("<h1>About page</h1>");
});*/

//Weather
app.get("/weather", (req, res) => {
  //If no address is provided
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  //Address is provided
  forecast(req.query.address, (error, forecastData) => {
    console.log(req.query.address);
    console.log(forecastData);
    if (error) {
      return res.send({
        error: error,
      });
    }
    res.send({
      forecast: forecastData.forecast,
      location: forecastData.location,
    });
  });
});

//Example for products
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

//404 PAGE NOT FOUND
//We can match a specific pattern, ej, anything after /help/ as long as it wasn't matched previously
app.get("/help/*", (req, res) => {
  //res.send("Help article not found");
  res.render("404", {
    title: "404",
    name: "Yasmin",
    errorMessage: "Help article not found",
  });
});
//URL for everything that did not exist before
app.get("*", (req, res) => {
  //res.send("My 404 page");
  res.render("404", {
    title: "404",
    name: "Yasmin",
    errorMesage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
