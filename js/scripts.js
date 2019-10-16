(function () {
    //Submit Button Event Handler
    $("#submit").click(function() {
        //Get the value the user has entered in the search bar and store it
        const searchLocation = $("#searchBar").val();
        //Call the geocode function and pass in the value
        geocode(searchLocation);
        //Clear out the search bar
        $("#searchBar").val("");

    });
})();

//Function to connect to the Dark Sky API and get weather data
function getWeatherInfo(latitude, longitude, city, state, temperature, precipitation, tempHigh, tempLow) {
    //Base-URL/APIKey/Latitude,Longitude

    $.ajax("https://api.darksky.net/forecast/" + darkSkyKey + "/" + latitude + "," + longitude, { dataType: "jsonp"}) 
    .done(function(data) {
        console.log(data);

        let currently = data.results[0].currently[0];
        // let daily = results[0].daily[0];

        //See if you can get the following data from the JSON:

        //1. Get the current temperature

        // let temperature = currently.temperature;

        // //2. Get the probability of precipitation

        // let precipitation = currently.precipProbability;

        // //3. Get the high and low temperature for the current day (first element in the data array in the daily object)

        // let tempHigh = daily.temperatureHigh;
        // let tempLow = daily.temperatureLow;

        // console.log(temperature);
        // console.log(precipitation);
        // console.log(tempHigh + "/" + tempLow);

    }) 
    .fail(function(error) {
        console.log(error);
    })
    .always(function() {
        console.log("Weather call complete!");
    })
}

//Function to connect to the MapQuest Geocoding API and get geocoding data
function geocode(location) {
    //Base-URL=APIKey + &location= + Address
    $.ajax("http://www.mapquestapi.com/geocoding/v1/address?key=" + mapQuestKey + "&location=" + location)
    .done(function(data) {
        //Get the lat and lng from the response
        let locations = data.results[0].locations[0];

        let city = locations.adminArea5;
        let state = locations.adminArea3;
        let lat = locations.latLng.lat; 
        let lng = locations.latLng.lng;

        console.log(city);
        console.log(state);
        console.log(lat);
        console.log(lng);
        
        //Pass the lat and lng to our getWeatherInfo function
        getWeatherInfo(lat, lng, city, state);

    })

    .fail(function(error) {
        console.log(error);
    })

    .always(function() {
        console.log("Geocoding call finished!");
    })
}