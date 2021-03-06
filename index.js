// Default variables
var user = "User!"
var facebook = "https://www.facebook.com/"
var playstation = "https://store.playstation.com/en-hu/home/games"
var linuxGaming = "https://www.gamingonlinux.com/"
var github = "https://github.com/"
var youtube = "https://www.youtube.com"
var website = "#"


/**
 * api.openweathermap.org/data/2.5
 *  
 * Message block
 *  
 * */
function displayTimeMessage() {
    var currentMessageDate = new Date();
    var message_hour = currentMessageDate.getHours()
    var message = document.getElementById("message");

    // Evening
    if (message_hour >= 18 && message_hour < 24) {
        message.textContent = "Good Evening " + user
        message.innerText = "Good Evening " + user
    }
    // Afternoon
    if (message_hour >= 12 && message_hour < 18) {
        message.textContent = "Good Afternoon " + user
        message.innerText = "Good Afternoon " + user
    }
    // Morning
    if (message_hour >= 0 && message_hour < 12) {
        message.textContent = "Good Morning " + user
        message.innerText = "Good Morning " + user
    }
    setTimeout(function() { displayTimeMessage(); }, 60000)
}


/**
 *  
 * Current time block
 *  
 * */
function getCurrentTime() {
    var currentDate = new Date();
    var hour = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var clock = document.getElementById("clock");

    if (hour == 24) {
        hour = 0
    }

    if (hour < 10) {
        hour = "0" + hour;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    clock.textContent = hour + ":" + minutes
    clock.innerText = hour + ":" + minutes
    
    setTimeout(function() { getCurrentTime(); }, 5000)
}


/**
 *  
 * Google search block
 *  
 * */

function googleSearch() {
    var baseUrl = "https://www.google.com/search?q="

    var input = document.getElementById("google-search");

    // Execute a function when the user releases a key on the keyboard
    input.addEventListener("keyup", function (event) {
        // Number 13 is Enters
        if (event.keyCode === 13) {
            event.preventDefault();
            window.open(baseUrl + input.value, '_blank');
            input.value = ""
            //window.location.replace(baseUrl+input.value);
        }
    });

}

/**
 * 
 * Icon block
 * 
 */

function displayIcons() {
    var markup = ""
    var icons = document.getElementById("icon-wrapper");

    if (facebook !== null) {
        markup += '<a href="' + facebook + '" target="_blank"><i class="fab fa-facebook-square"></i></a>'
    }
    if (github !== null) {
        markup += '<a href="' + github + '" target="_blank"><i class="fab fa-github"></i></a>'
    }
    if (playstation !== null) {
        markup += '<a href="' + playstation + '" target="_blank"><i class="fab fa-playstation"></i></a>'
    }
    if (linuxGaming !== null) {
        markup += '<a href="' + linuxGaming + '" target="_blank"><i class="fab fa-linux"></i></a>'
    }
    if (youtube !== null) {
        markup += '<a href="' + youtube + '" target="_blank"><i class="fab fa-youtube"></i></a>'
    }
    if (website !== null) {
        markup += '<a href="' + website + '" target="_blank"><i class="fas fa-globe"></i></a>'
    }

    icons.innerHTML = markup
}


/**
 * 
 * Weatcher block
 * 
 */
function displayWeather(){
    
    displayWeatherWidget()
}

// Running the functions
getCurrentTime()
displayTimeMessage()
displayIcons()
displayWeather()
googleSearch()