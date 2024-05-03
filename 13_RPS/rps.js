
var playerChoice = '';
var games = 0;
var playerWins = 0;
var botWins = 0;
var readyForNewGame = false;

function initialize() {
    readyForNewGame = false;
    currentPhase = 0;
    playerChoice = '';

    document.getElementById('phase2').hidden = true;
    document.getElementById('phase0').classList.remove('fade-out');
    document.getElementById('phase0').hidden = false;
}

function onClick() {
    if(readyForNewGame) {
        document.getElementById('phase2').classList.add('fade-out');
        setTimeout(() => {
            initialize();
        }, 1000);
    }   
}

function onChooseWeapon(choice) {
    playerChoice = choice;
    transitionToPhase1();
}

function transitionToPhase1() {
    document.getElementById('phase0').classList.add('fade-out');
    setTimeout(phase1, 700);
}

function phase1() {
    document.getElementById('phase0').hidden = true;
    document.getElementById('phase1').hidden = false;
    explodeMessage('ROCK!');
    setTimeout(() => {
        explodeMessage('PAPER!');
    }, 1000); 
    setTimeout(() => {
        explodeMessage('SCISSORS!');
    }, 2000);

    setTimeout(phase2, 3000);
}

function explodeMessage(msg) {
    let txt = document.getElementById('explode-txt');
    txt.innerHTML = msg;
    txt.style.opacity = 0;
    let animTime = 1;
    for(let t = 0; t < 1; t += 1 / (30 * animTime)) {
        console.log(evalExplodeFadeCurve(t));
        setTimeout(() => {txt.style.opacity = evalExplodeFadeCurve(t)}, t * animTime * 1000);
    }
}
// animation curve function
function evalExplodeFadeCurve(t) {
    if(t < .2)
        return -1 * (t - 1) ** 40 + 1;
    if(t < .4)
        return 1;
    return -4.63 * (t - .4) ** 3 + 1
}

function phase2() {
    document.getElementById('phase1').hidden = true;
    document.getElementById('phase2').classList.remove('fade-out');
    document.getElementById('phase2').hidden = false;

    document.getElementById('player').classList.remove('fade-in');
    document.getElementById('player').hidden = false;
    document.getElementById('bot').classList.remove('fade-in');
    document.getElementById('bot').hidden = false;
    document.getElementById('results').classList.remove('fade-in');
    document.getElementById('results').hidden = false;

    let botChoice = '';
    switch(Math.floor(Math.random() * 3)) {
        case 0:
            botChoice = 'p';
            break;
        case 1:
            botChoice = 's';
            break;
        case 2:
            botChoice = 'r';
            break;
    }

    document.getElementById('bot-img').src = botChoice + '.png';
    document.getElementById('player-img').src = playerChoice + '.png';

    let result = 0; // 0 = tie  1 = player  2 = bot
    if(('sp pr rs').includes(playerChoice + botChoice))
        result = 1;
    else if(('sp pr rs').includes(botChoice + playerChoice))
        result = 2;

    games++;
    playerWins += result == 1 ? 1 : 0;
    botWins += result == 2 ? 1 : 0;
    document.getElementById('result').innerHTML = result == 0 ? 'A Tie!' : (result == 1 ? 'You Win!' : 'You Lose!');
    document.getElementById('games-played').innerHTML = games;
    document.getElementById('player-wins').innerHTML = '' + playerWins + ' (' + Math.round(playerWins / games * 100) + '%)';
    document.getElementById('bot-wins').innerHTML = '' + botWins + ' (' + Math.round(botWins / games * 100) + '%)';

    setTimeout(() => {
        document.getElementById('player').classList.add('fade-in');
    }, 500);

    setTimeout(() => {
        document.getElementById('bot').classList.add('fade-in');
    }, 1500);

    setTimeout(() => {
        document.getElementById('results').classList.add('fade-in');
        readyForNewGame = true;
    }, 3500);
}  

initialize();