var openWeatherLocation="Debrecen,hu"
var openWeatherMapApiKey = "*"
var openWeatherMapApiBaseUrl = "http://api.openweathermap.org/data/2.5/weather?q="+openWeatherLocation+"&appid=" + openWeatherMapApiKey
var openWeatherUpdateFrequency = 60

// updates the weather data and saves it to localstorage every 30 minutes 
// WIP
function updateWeatherInfo() {

    var lastUpdated = moment(localStorage.getItem("weatherLastUpdated"));
    var timeCheck = lastUpdated.add(openWeatherUpdateFrequency, 'm')
    var now = moment()

    if (now.isAfter(timeCheck)) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                localStorage.setItem("weatherData", this.responseText);
                localStorage.setItem("weatherLastUpdated", moment());
            }
        };
    
        xhttp.open("GET", openWeatherMapApiBaseUrl, true);
        xhttp.send();
    }

}

// Selects the weather icon (Rain/Snow/Sunny) to display 
function getWeatherIcon(data){
    // Get icon for weather
    var icon = ""
    if (data.weather.id >= 200 && data.weather.id < 300) {
        console.log("Thunderstorm")
        icon = '<i class="wi wi-thunderstorm" ></i >'

    }
    if (data.weather.id >= 300 && data.weather.id < 400) {
        console.log("Drizzle")
        icon = '<i class="wi wi-sprinkle" ></i >'
    }
    if (data.weather.id >= 500 && data.weather.id < 600) {
        console.log("Rain")
        icon = '<i class="wi wi-rain" ></i >'
    }
    if (data.weather.id >= 600 && data.weather.id < 700) {
        console.log("Snow")
        icon = '<i class="wi wi-snow" ></i >'
    }
    if (data.weather.id >= 700 && data.weather.id < 800) {
        console.log("Fog/Dust/Ash/Tornado")
        icon = '<i class="wi wi-fog" ></i >'

    }

    if (data.weather.id == 800) {
        console.log("Clear")
        icon = '<i class="wi wi-day-sunny"></i>'
    }

    if (data.weather.id == 801) {
        console.log("Cloud, 11-25%")
        icon = '<i class="wi wi-cloud"></i>'
    }

    if (data.weather.id == 802) {
        console.log("Cloud, 25-50%")
        icon = '<i class="wi wi-cloudy"></i>'

    }

    if (data.weather.id == 803 || data.weather.id == 804) {
        console.log("Cloud, 50%-100%")
    }
    return icon
}


function getCurrentWeather() {
    var data = {
        "coord": {
            "lon": 21.63,
            "lat": 47.53
        },
        "weather": [
            {
                "id": 800,
                "main": "Clear",
                "description": "clear sky",
                "icon": "01n"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 285.13,
            "pressure": 1024,
            "humidity": 28,
            "temp_min": 284.26,
            "temp_max": 286.15
        },
        "visibility": 10000,
        "wind": {
            "speed": 1
        },
        "clouds": {
            "all": 0
        },
        "dt": 1553364000,
        "sys": {
            "type": 1,
            "id": 6665,
            "message": 0.0032,
            "country": "HU",
            "sunrise": 1553315480,
            "sunset": 1553359737
        },
        "id": 721472,
        "name": "Debrecen",
        "cod": 200
    }

    getWeatherIcon(data)    

}
