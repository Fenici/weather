'use strict';


var getAddress = document.getElementById('location');
var getWeather = document.getElementById('weather');
var background = document.getElementById('header');
var tempreture = document.getElementById("temp")
function getLocation() {


    var requestLocation = new XMLHttpRequest();
    requestLocation.open('GET', 'http://ip-api.com/json');

    var locationData;

    requestLocation.onload = function () {
        locationData = JSON.parse(requestLocation.responseText);

        var lat = locationData.lat;
        var lon = locationData.lon;
        console.log(locationData.lat);
        console.log(locationData.lon);
        renderHTML(locationData);

    };

    requestLocation.send();


}


getLocation();

function renderHTML(data) {

    var htmlString = "";

    htmlString += "<p class='location'>" + data.city + " " + data.zip + " , " + data.regionName + " , " + data.country + ".</p>";
    // console.log(data[i].city);

    getAddress.insertAdjacentHTML("beforeend", htmlString);
// global cache
    var currentTemp,
        currentUnit;
    var requestWeather = new XMLHttpRequest();


    requestWeather.open('GET', 'https://fcc-weather-api.glitch.me/api/current?lat=' + data.lat + '&lon=' + data.lon);
    requestWeather.onload = function () {
        var weatherData = JSON.parse(requestWeather.responseText);
        console.log(weatherData);
        getHTML(weatherData);
        getTemp(weatherData);
    };

    requestWeather.send();

    function getHTML(data) {
        var weatherString = "";

        for (var i in data.weather) {

            var weather = data.weather[i].main;
            var icon = data.weather[i].icon;
            weatherString += "<p class='weather'>" + weather + "</p>";
            weatherString += "<img src= " + icon + " />"
            console.log();
            if (weather.toString() == "Clear") {
                var urlString = 'url(images/clear.jpg)';
                background.style.background = urlString, "no-repeat";

            } else if (weather.toString() == "Clouds") {

                var urlString = 'url(images/Cloudy.jpg)';
                background.style.background = urlString, "no-repeat";

            } else if (weather.toString() == "Rain") {
                var urlString = 'url(images/rain.jpg)';
                background.style.background = urlString, "no-repeat";

            } else if (weather.toString() == "Thunderstorm") {
                var urlString = 'url(images/thunder_storm.jpg)';
                background.style.background = urlString, "no-repeat";

            }
            else if (weather.toString() == "Snow") {
                var urlString = 'url(images/snow.jpg)';
                background.style.background = urlString, "no-repeat";
            }
            else if (weather.toString() == "Extreme") {
                var urlString = 'url(images/extrem.jpg)';
                background.style.background = urlString, "no-repeat";
            } else {
                weatherString += "<p class='weather'>" + weather + "</p>";
                var urlString = 'url(images/no-weather.jpg)';
                background.style.background = urlString, "no-repeat";

            }

        }
        //

        getWeather.insertAdjacentHTML("beforeend", weatherString);
    }


    function getTemp(data) {
        var ct =  data.main.temp;
        var cc =  Math.round(ct);

        //The typeof operator returns a string indicating the type of the unevaluated operand.

        currentTemp = typeof data === 'object' ? cc : null; // save new value in global cache

        currentUnit = 'celsius';

        tempreture.innerHTML = currentTemp + '&#x2103;';
    }

    tempreture.addEventListener("click", function() {
        tempreture.innerHTML = changeTemp();
    }, false);

    function changeTemp() {
        if(currentUnit === 'celsius') {
            var tp = currentTemp * 1.8 + 32;
            var fh = Math.round(tp);

            currentUnit = 'fahrenheit';

            return fh + '° F';
        } else {
            currentUnit = 'celsius';
            return currentTemp + '&#x2103;';
        }
    };



}