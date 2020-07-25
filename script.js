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

let playBtn = document.getElementById('play');
let dealBtn = document.getElementById('deal');
let hitBtn = document.getElementById('hit');
let standBtn = document.getElementById('stand');
let endBtn = document.getElementById('end');

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
    || hand[card] === "J"
    //Need a special option for Ace 
    || hand[card] === "A"){
      score = score + 10;
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
  if (dealerScore > bustScore){
    dealerBust();
  }
  if (playerScore > bustScore){
    playerBust();
  }
  console.log(playerScore);
  console.log(dealerScore);
  playerScoreDisplay.textContent = playerScore;
  dealerScoreDisplay.textContent = dealerScore;
};

//Deals two cards to the dealer and the player at the start of the round
function deal(){
  cardsDealt = true;
  clearScore();
  clearDisplay();
  dealerCards.push(drawCard(), drawCard());
  console.log("Dealer: ",dealerCards[0], dealerCards[1])
  playerTurn = true;
  playerCards.push(drawCard(), drawCard());
  console.log("Player 1: ",playerCards[0], playerCards[1])
  updateScore();
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
    document.getElementById('playerCards').innerHTML += "<div class='card'>" + card + "</div>";
  }
  else{
    document.getElementById('dealerCards').innerHTML += "<div class='card'>" + card + "</div>";
  }
}


function hit(hand){
  let newCard = drawCard();
  hand.push(newCard);
  console.log(newCard);
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
  if(dealerScore < 16){
    hit(dealerCards);
    dealerTurn();
  }
  else{
    declareWinner();
  }
}

function declareWinner(){
  if(playerScore > dealerScore){
    alert('Player Wins!');
  }
  else if(playerScore === dealerScore){
    alert("push!")
  }
  else{
    alert("Dealer Wins!")
  }
  clearScore();
  cardsDealt = false;
}

function playerBust(){
  alert("Player busts!")
  cardsDealt = false;
  clearScore();
}

function dealerBust(){
  alert("Dealer busts!")
  cardsDealt = false;
  clearScore();
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