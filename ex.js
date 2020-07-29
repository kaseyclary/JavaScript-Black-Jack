/************************************************************
 * TO-DO:
 * -> Fix aces
 * -> Add double-down
 * -> Add split
 * -> Add stat screen
 *   ->Show hand history
 *   ->Show percentage win/lose/push
 *   ->Comes in on the right of the screen
 *     ->Black, mild transparency
 * -> Add chips & wager feature
 * -> Add card counting feature
 * -> Add timer
 *   -> Average time per hand
 * -> Clean up code
 ************************************************************/

playerScoreDisplay = document.getElementById('playerScore');
dealerScoreDisplay = document.getElementById('dealerScore');
hitBtn = document.getElementById('hit');
standBtn = document.getElementById('stand');
playBtn = document.getElementById('play');
dealBtn = document.getElementById('deal');
endBtn = document.getElementById('end');
let deck;
let player;
let dealer;
let gameOn = false;

class Deck {
  //Creates a shuffled deck of cards
  constructor(){
    this.cardNames = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
    this.cardSuits = ["Spade", "Club", "Diamond", "Heart"]
    this.cards;
    this.initialize();
    this.shuffle();
  }
  //Builds out an ordered deck of cards
  initialize(){
    let newDeck = [];
    for(let i = 0; i < this.cardNames.length; i++){
      for(let cardCount = 0; cardCount < 4; cardCount++){
        let card = new Card();
        card.suit = this.cardSuits[cardCount];
        card.cardName = this.cardNames[i];
        if(card.cardName === "K"
          ||card.cardName === "Q"
          ||card.cardName === "J"){
            card.value = 10;
          }else if(card.cardName ==="A"){
            card.value = 11;
          }else{
            card.value = parseInt(card.cardName);
          }
        newDeck.push(card);
      }
    }
    this.cards = newDeck;
  }
  //shuffles the deck
  shuffle(){
    let currentIndex = this.cards.length, temporaryValue, randomIndex;
  //shuffles the deck using the Fisher-Yates algorithm
    while(0 !== currentIndex){
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = this.cards[currentIndex];
      this.cards[currentIndex] = this.cards[randomIndex];
      this.cards[randomIndex] = temporaryValue;
    }
  }
}

class Card {
  //creates a card with a suit and value
  constructor(){
    this.cardName = '';
    this.suit = '';
    this.value = 0;
    this.countedAce = false;
  }
  //Assigns an integer value to the card based on its name
  getSuit(){
    return this.suit;
  }
  getValue(){
    return this.value;
  }
  getCardName(){
    return this.cardName;
  }
  ace(){

  }
}

class Participant{
  constructor(){
    this.turn = false;
    this.score = 0;
    this.hand = [];
  }
  drawCard(deck){
    this.deck = deck;
    if(this.deck.cards.length < 1){
      this.deck.initialize();
      this.deck.shuffle();
      this.drawnCard = this.deck.cards.pop();
    } else{
      this.drawnCard = this.deck.cards.pop();
    }
    this.hand.push(this.drawnCard);
    this.displayCard(this.id, this.drawnCard);
    this.score += this.drawnCard.value;
    this.checkAce();
    updateScore();
    if(this.score >= 21){
      declareWinner();
    }
  }
  getScore(){
    return this.score;
  }
  checkAce(){
    for(let i = 0; i<this.hand.length; i++){
      if(this.hand[i].cardName === "A" && this.hand[i].countedAce === false){
        if(this.score > 11){
          this.score = this.score - 10;
          this.hand[i].countedAce = true;
          updateScore();
        } else {
          this.score = this.score;
        }
      } 
    }
  }
  displayCard(id, card){
    this.id = id;
    this.card = card;
    if(this.id === "player"){
      document.getElementById('playerCards').innerHTML += "<div class='card'>" + card.cardName + "</div>";
    }
    else{
      document.getElementById('dealerCards').innerHTML += "<div class='card'>" + card.cardName + "</div>";
    }
  }
}

class Player extends Participant{
  constructor(){
    super();
    this.id = "player";
  }
  stand(){
    this.turn = false;
    dealer.dealerTurn();
  }
}

class Dealer extends Participant{
  constructor(){
    super();
    this.id = "dealer";
  }
  dealerTurn(){
    this.turn = true;
    this.checkAce();
    if(this.score < 16){
      this.drawCard(deck);
      this.dealerTurn();
    }
    else{
      declareWinner();
    }
  }
}

function deal(){
  player.turn = true;
  player.drawCard(deck);
  player.drawCard(deck);
  dealer.drawCard(deck);
}

function updateScore(){
  playerScoreDisplay.innerHTML = "<h1> Player: " + player.getScore(); + "</h1>";
  dealerScoreDisplay.innerHTML = "<h1> Dealer: " + dealer.getScore(); + "</h1>";
}

function declareWinner(){
  let playerStatus = document.getElementById('playerStatus');
  let dealerStatus = document.getElementById('dealerStatus');
  let winner = "<h2 class='winner'> WINNER! </h2>";
  let loser = "<h2 class='loser'> LOSER! </h2>";
  let bust = "<h2 class='loser'> BUST! </h2>";
  let push = "<h2 class='push'> PUSH! </h2>";
  if(player.score > 21){
    playerStatus.innerHTML = bust;
    dealerStatus.innerHTML = winner;
  } else if(dealer.score > 21){
    playerStatus.innerHTML = winner;
    dealerStatus.innerHTML = bust;
  } else if(player.score > dealer.score){
    playerStatus.innerHTML = winner;
    dealerStatus.innerHTML = loser;
  }else if(dealer.score > player.score){
    playerStatus.innerHTML = loser;
    dealerStatus.innerHTML = winner;
  } else{
    playerStatus.innerHTML = push;
    dealerStatus.innerHTML = push;
  }
  player.turn = false;
  dealer.turn = false;
}

function clear(){
  dealer.score = 0;
  player.score = 0;
  dealer.hand = [];
  player.hand = [];
  document.getElementById('playerStatus').innerHTML = "";
  document.getElementById('dealerStatus').innerHTML = "";
  document.getElementById('playerCards').innerHTML = "";
  document.getElementById('dealerCards').innerHTML = "";
}

playBtn.addEventListener('click', ()=>{
  deck = new Deck();
  player = new Player();
  dealer = new Dealer();
  clear();
  deal();
})
dealBtn.addEventListener('click', ()=>{
  if(player.hand === [] && dealer.hand === []){
    deal();
  }else{
    clear();
    deal();
  }
})
hitBtn.addEventListener('click', ()=>{
  if(player.turn === true){
    player.drawCard(deck);
    player.checkAce();
  } else {
    null;
  }
})
standBtn.addEventListener('click', ()=>{
  if(player.turn === true){
    player.stand();
  } else {
    null;
  }
})
endBtn.addEventListener('click', ()=>{
  
})
