
let messages = ["It is certain", "Wihtout a doubt", "Yes definitely", "Yes", "Ask again later", "Better not tell you now", "My sources say no", "Outlook not so good"]

function onClick() {
    
    let displayText = document.getElementById("output-text");
    displayText.innerHTML = messages[randomRangeInt(0, messages.length)];

}

function randomRangeInt(min, max) {
    return min + Math.floor((Math.random() * max-min));
}