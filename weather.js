var openWeatherLocation = "Debrecen,hu"
var openWeatherMapApiKey = "*"
var openWeatherMapApiBaseUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + openWeatherLocation + "&appid=" + openWeatherMapApiKey
var openWeatherUpdateFrequency = 30

// updates the weather data and saves it to localstorage every 30 minutes 
// WIP
function updateWeatherInfo() {

    var lastUpdated = moment(localStorage.getItem("weatherLastUpdated"));
    var timeCheck = lastUpdated.add(openWeatherUpdateFrequency, 'm')
    var now = moment()

    if (now.isAfter(timeCheck) || localStorage.getItem("weatherData") === null) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(this.response)
                console.log(response)
                localStorage.setItem("weatherDataWeatherId", response.weather[0].id)
                localStorage.setItem("weatherDataLocation", response.name)
                localStorage.setItem("weatherDataCurrentTemp", response.main.temp)
                localStorage.setItem("weatherDataHumidity", response.main.humidity)
                localStorage.setItem("weatherDataWindSpeed", response.wind.speed)
                localStorage.setItem("weatherDataWindDeg", response.wind.deg)
                localStorage.setItem("weatherData", JSON.stringify(this.responseText));
                localStorage.setItem("weatherLastUpdated", moment().format());
            }
        };

        xhttp.open("GET", openWeatherMapApiBaseUrl, true);
        xhttp.send();
    }
}

// Selects the weather icon (Rain/Snow/Sunny) to display 
function getWeatherIconMainDiv() {
    // Get icon for weather
    var icon = ""
    var weatherId = localStorage.getItem("weatherDataWeatherId")
    var location = localStorage.getItem("weatherDataLocation")


    if (weatherId === null) {
        icon = '<i class="wi wi-na" ></i >'
        return
    }

    if (weatherId >= 200 && weatherId < 300) {
        console.log("Thunderstorm")
        icon = '<i class="wi wi-thunderstorm" ></i >'

    }
    if (weatherId >= 300 && weatherId < 400) {
        console.log("Drizzle")
        icon = '<i class="wi wi-sprinkle" ></i >'
    }
    if (weatherId >= 500 && weatherId < 600) {
        console.log("Rain")
        icon = '<i class="wi wi-rain" ></i >'
    }
    if (weatherId >= 600 && weatherId < 700) {
        console.log("Snow")
        icon = '<i class="wi wi-snow" ></i >'
    }
    if (weatherId >= 700 && weatherId < 800) {
        if (weatherId == 721) {
            icon = '<i class="wi wi-day-haze" ></i >'
        } else {
            console.log("Fog/Dust/Ash/Tornado")
            icon = '<i class="wi wi-fog" ></i >'
        }
    }

    if (weatherId == 800) {
        console.log("Clear")
        icon = '<i class="wi wi-day-sunny"></i>'
    }

    if (weatherId == 801) {
        console.log("Cloud, 11-25%")
        icon = '<i class="wi wi-cloud"></i>'
    }

    if (weatherId == 802) {
        console.log("Cloud, 25-50%")
        icon = '<i class="wi wi-cloudy"></i>'

    }

    if (weatherId == 803 || weatherId == 804) {
        console.log("Cloud, 50%-100%")
        icon = '<i class="wi wi-cloudy"></i>'
    }

    let locationDiv = "\n" + '<div>' + location + '</div>' + "\n"
    return '<span class="weather-main-icon-wrapper">' + icon + locationDiv + "</span>"
}

function getTemperatureDiv() {

    var temp = localStorage.getItem("weatherDataCurrentTemp")
    var humidity = localStorage.getItem("weatherDataHumidity")
    var windSpeed = localStorage.getItem("weatherDataWindSpeed");
    var windDeg = localStorage.getItem("weatherDataWindDeg");
    var windDirection = '<i class="wi wi-direction-up"></i>'; // default direction set

    if ((windDeg > 345 && windDeg <= 359) || (windDeg >= 0 && windDeg <= 15)) {
        windDirection = '<i class="wi wi-direction-up"></i>'
    }

    if (windDeg > 15 && windDeg <= 75) {
        windDirection = '<i class="wi wi-direction-up-right"></i>'
    }

    if (windDeg > 75 && windDeg <= 105) {
        windDirection = '<i class="wi wi-direction-right"></i>'
    }

    if (windDeg > 105 && windDeg <= 165) {
        windDirection = '<i class="wi wi-direction-down-right"></i>'
    }

    if (windDeg > 165 && windDeg <= 195) {
        windDirection = '<i class="wi wi-direction-down"></i>'
    }

    if (windDeg > 195 && windDeg <= 255) {
        windDirection = '<i class="wi wi-direction-down-left"></i>'
    }

    if (windDeg > 255 && windDeg <= 285) {
        windDirection = '<i class="wi wi-direction-left"></i>'
    }

    if (windDeg > 285 && windDeg <= 345) {
        windDirection = '<i class="wi wi-direction-up-left"></i>'
    }


    var tempWithIcon = ""//'<div>'+humidity+'</div>'
    tempWithIcon += '<span class="weather-temp">' + "\n"
    var celsius = Math.round((temp - 273.15) * 1) / 1
    tempWithIcon += '<div class="weather-temp-number">' + celsius + '</div>' + "\n"
    tempWithIcon += '<i class="wi wi-celsius"></i>' + "\n"
    tempWithIcon += '<hr>'
    tempWithIcon += '<div class="weather-temp-misc">'
    tempWithIcon += '<div class="weather-temp-misc-humidity" style="display:inline-block">' + humidity + '<i class="wi wi-humidity"></i></div>'
    tempWithIcon += '<div class="weather-temp-misc-wind" style="display:inline-block">' + windSpeed + windDirection + '</div>'
    tempWithIcon += '</div>'
    tempWithIcon += '</span>'
    return tempWithIcon
}




function weatherWidgetLoop() {
    console.log("test")
    var widget = document.getElementById('weather-wrapper')

    if (localStorage.getItem("weatherDataWeatherId") === null) {
        updateWeatherInfo()
        widget.innerHTML = '<div class="weather-content">' + "N/A" + '</div>'

    } else {

        var widgetMainIcon = getWeatherIconMainDiv()
        var widgetTempBlock = getTemperatureDiv()

        widget.innerHTML = '<div class="weather-content">' + widgetMainIcon + widgetTempBlock + '</div>'

    }
    //setTimeout("weatherWidgetLoop()", 5000)
}


function displayWeatherWidget() {

    weatherWidgetLoop()



    // var data = {
    //     "coord": {
    //         "lon": 21.63,
    //         "lat": 47.53
    //     },
    //     "weather": [
    //         {
    //             "id": 300,
    //             "main": "Clear",
    //             "description": "clear sky",
    //             "icon": "01n"
    //         }
    //     ],
    //     "base": "stations",
    //     "main": {
    //         "temp": 285.13,
    //         "pressure": 1024,
    //         "humidity": 28,
    //         "temp_min": 284.26,
    //         "temp_max": 286.15
    //     },
    //     "visibility": 10000,
    //     "wind": {
    //         "speed": 1
    //     },
    //     "clouds": {
    //         "all": 0
    //     },
    //     "dt": 1553364000,
    //     "sys": {
    //         "type": 1,
    //         "id": 6665,
    //         "message": 0.0032,
    //         "country": "HU",
    //         "sunrise": 1553315480,
    //         "sunset": 1553359737
    //     },
    //     "id": 721472,
    //     "name": "Debrecen",
    //     "cod": 200
    // }

}
