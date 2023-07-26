let Timer = document.getElementById("timer");
let Loader = document.getElementById("loader");
let QuoteDisplay = document.getElementById("quoteDisplay");
let QuoteInput = document.getElementById("quoteInput");
let Result = document.getElementById("result");
let SubmitBtn = document.getElementById("submitBtn");
let ResetBtn = document.getElementById("resetBtn");

let intervalId;
let countdown;
Loader.classList.remove("d-none");

function timestart() {
    Loader.classList.add("d-none");
    countdown = 0;
    intervalId = setInterval(function() {
        countdown = countdown + 1;
        Timer.textContent = countdown + " seconds";
    }, 1000);
}

function randomQuation() {
    let options = {
        method: "GET"
    };
    fetch("https://apis.ccbp.in/random-quote", options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsondata) {
            let quote = jsondata.content;
            QuoteDisplay.textContent = quote;
        });
}

timestart();
randomQuation();

ResetBtn.onclick = function() {
    ResetBtn.addEventListener("click", randomQuation());
    clearInterval(intervalId);
    timestart();
};

SubmitBtn.addEventListener("click", function() {
    if (QuoteDisplay.textContent === QuoteInput.value) {
        clearInterval(intervalId);
        Result.textContent = "You completed in " + countdown + "seconds'";
    } else {
        Result.textContent = "You typed Incorrect Answer";
    }
});
