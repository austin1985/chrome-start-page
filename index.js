// Default
var user = "Mihály!"

/**
 *  
 * Message block
 *  
 * */
function addDayTimeMessage() {
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
        message.textContent = "Good Evening " + user
        message.innerText = "Good Evening " + user
    }
    setTimeout("getCurrentTime()", 60000)
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

    setTimeout("getCurrentTime()", 5000)
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
            window.open(baseUrl+input.value, '_blank');
            input.value = ""
            //window.location.replace(baseUrl+input.value);
        }
    });

}





/**
*  
* Weather block
*  
* */


// Running the functions
getCurrentTime()
addDayTimeMessage()
googleSearch()