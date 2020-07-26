let playerScore, dealerScore;
let playerScoreDisplay = document.getElementById('playerScore');
let dealerScoreDisplay = document.getElementById('dealerScore');
let cardValues = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
const bustScore = 21;
let deck = [];
let playerCards = [];
let dealerCards = [];
let gameOn = false;
let cardsDealt = false;
let playerTurn = false;
let statScreen = false;

let playBtn = document.getElementById('play');
let dealBtn = document.getElementById('deal');
let hitBtn = document.getElementById('hit');
let standBtn = document.getElementById('stand');
let endBtn = document.getElementById('end');
let statsBtn = document.getElementById('stats');

/* EVENT LISTENERS FOR BUTTONS */
playBtn.addEventListener('click', () =>{
  initSession();
});

dealBtn.addEventListener('click', () => {
  deal();
})

endBtn.addEventListener('click', () =>{
  gameOn = false;
  clearScore();
  clearDisplay();
  alert('thanks for playing!');
});

hitBtn.addEventListener('click', () => {
  if (gameOn === false || cardsDealt === false){
    alert("Click play to start");
  }
  else{
    hit(playerCards)
  };
});

standBtn.addEventListener('click', () => {
  stand();
});

statsBtn.addEventListener('click', () => {
  if(statScreen === false){
    statScreen = true;
    document.querySelector('.app-container').style.width = '80vw';
    document.querySelector('.statTable').style.display = 'block';
  }
  else if(statScreen === true){
    statScreen = false;
    document.querySelector('.statTable').style.display = 'none';
    document.querySelector('.app-container').style.width = '100vw';
  }
})

//assigns a full, randomly shuffled deck to the deck array
function shuffleDeck(){
  let newDeck = [];
  alert("shuffling the deck");
  //initializes a new deck in order from ace to king, 4 cards per value
  for(let value = 0; value < cardValues.length; value++){
    for(let card = 0; card < 4; card++){
      newDeck.push(cardValues[value]);
    }
  }
  let currentIndex = newDeck.length, temporaryValue, randomIndex;
  //shuffles the deck using the Fisher-Yates algorithm
  while(0 !== currentIndex){
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = newDeck[currentIndex];
    newDeck[currentIndex] = newDeck[randomIndex];
    newDeck[randomIndex] = temporaryValue;
  }
  deck = newDeck;
};

//reads the values of the hand
function assignCardValue(hand){
  let score = 0;
  for(let card = 0; card < hand.length; card++){
    if(hand[card] === "K" 
    || hand[card] === "Q" 
    || hand[card] === "J"){
      score = score + 10;
    }
    else if(hand[card] === "A"){
      //check for ace function
      if(card === 0 && hand.length < 3 
      || card === 1 && hand.length < 3
      || score <= 10){
        score = score + 11;
      }
      else{
        score = score + 1;
      }
    }
    else {
      score = score + parseInt(hand[card]);
    }
  }
  return score;
}


function updateScore(){
  dealerScore = assignCardValue(dealerCards);
  playerScore = assignCardValue(playerCards);
  checkForAce();
  playerScoreDisplay.textContent = playerScore;
  dealerScoreDisplay.textContent = dealerScore;
  if (dealerScore > bustScore){
    dealerBust();
  }
  if (playerScore > bustScore){
    playerBust();
  }
};

function checkForAce(){

}

//Deals cards at the beginning of the round
function deal(){
  if(cardsDealt === "true"){
    alert("Finish the hand before dealing again");
  }
  else{
    cardsDealt = true;
    clearScore();
    clearDisplay();
    dealerCards.push(drawCard());
    console.log("Dealer: ",dealerCards[0], dealerCards[1])
    playerTurn = true;
    playerCards.push(drawCard(), drawCard());
    console.log("Player 1: ",playerCards[0], playerCards[1])
    updateScore();
  }
}

function drawCard(){
  let card;
  if(deck.length < 1){
    shuffleDeck();
    card = deck.pop();
    displayCard(card);
    return card;
  }
  else{
    card = deck.pop();
    displayCard(card);
    return card;
  }
}

function displayCard(card){
  if(playerTurn === true){
    document.getElementById('playerCards').innerHTML += "<div class='card'>" + "<p>" + card +"</p>" + "</div>";
  }
  else{
    document.getElementById('dealerCards').innerHTML += "<div class='card'>" + "<p>" + card +"</p>" + "</div>";
  }
}


function hit(hand){
  let newCard = drawCard();
  hand.push(newCard);
  updateScore();
}

function stand(){
  dealerTurn();
}

function split(){

}

function doubleDown(){

}

function dealerTurn(){
  playerTurn = false;
  if(dealerScore < 16 || dealerCards.length < 2){
    hit(dealerCards);
    dealerTurn();
  }
  else if(dealerScore > 21){
    dealerBust();
  }
  else{
    declareWinner();
  }
}

function declareWinner(){
  if(playerScore > dealerScore){
    playerScoreDisplay.innerHTML += "<span class='winner'> WINS! </span>"
    dealerScoreDisplay.innerHTML += "<span class='loser'> LOSES! </span>"
  }
  else if(playerScore === dealerScore){
    playerScoreDisplay.innerHTML += "<span class='push'> PUSH! </span>"
    dealerScoreDisplay.innerHTML += "<span class='push'> PUSH! </span>"
  }
  else{
    playerScoreDisplay.innerHTML += "<span class='loser'> LOSES! </span>"
    dealerScoreDisplay.innerHTML += "<span class='winner'> WINS! </span>"
  }
  cardsDealt = false;
}

function playerBust(){
  playerScoreDisplay.innerHTML += "<span class='loser'> BUST! </span>"
  dealerScoreDisplay.innerHTML += "<span class='winner'> WINS! </span>"
  cardsDealt = false;
}

function dealerBust(){
  dealerScoreDisplay.innerHTML += "<span class='loser'> BUST! </span>"
  playerScoreDisplay.innerHTML += "<span class='winner'> WINS! </span>"
  cardsDealt = false;
}


function initSession(){
  gameOn = true;
  clearScore();
  shuffleDeck();
  newGame();
}

function clearScore(){
  playerScore = 0;
  dealerScore = 0;
  playerCards = [];
  dealerCards = [];
  playerScoreDisplay.textContent = 0;
  dealerScoreDisplay.textContent = 0;
  playerTurn = false;
}

function clearDisplay(){
  document.getElementById('dealerCards').innerHTML = "";
  document.getElementById('playerCards').innerHTML = "";
};

function newGame(){
  deal();
}

//add function that determines average amount of time for each action, lightning blackjack