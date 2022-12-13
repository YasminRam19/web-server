const request = require("request");
//const forecast = (latitude, longitude, callback) => {
const forecast = (address, callback) => {
  //The default units are metric, if we want to change e.j to Fahrenheit, we add at the of the query &units=f
  //const url = `http://api.weatherstack.com/current?access_key=a14c6b9c01c18c0cb1600d8f96ef1510&query=${latitude},${longitude}&units=m`;
  const url = `http://api.weatherstack.com/current?access_key=a14c6b9c01c18c0cb1600d8f96ef1510&query=${address}&units=m`;
  request({ url, json: true }, (error, { body }) => {
    //Low level error, pass string for error
    if (error) {
      callback("Unable to connect to weather sevice", undefined);
    } else if (body.error) {
      //Coordinate error, pass string for error
      callback("Unable to find location", undefined);
    } else {
      //Success, pass forcast string for data
      callback(
        undefined,
        //`${body.current.weather_descriptions[0]}. It's currently ${body.current.temperature} C degrees out. It feels like ${body.current.feelslike}`
        {
          forecast: `${body.current.weather_descriptions[0]}. It's currently ${body.current.temperature} C degrees out. It feels like ${body.current.feelslike}`,
          location: body.request.query,
        }
      );
    }
  });
};
module.exports = forecast;
