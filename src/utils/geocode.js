const request = require("request");
//Geocoding
//Process of taking the process of taking an address and convert that into a latitude and longitude
//const geocodeURL = "";
/*request({ url: geocodeURL, json: true }, (error, response) => {
  if(error){
    console.log("Unable to connect to location services");
  }else if( response.body.features.lenght === 0){
    console.log("Unable to find location. Try another search");
  } else{
  const latitude = response.body.features[0].center[1];
  const longitude = response.body.features[0].center[0];
  console.log(latitude, longitude);
  }
});*/
const geocode = (address, callback) => {
  //encodeURIComponent(value) encodes special characters like ?, which becomes %3F
  const url = `GeoCodeURL${encodeURIComponent(address)}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};
module.exports = geocode;
