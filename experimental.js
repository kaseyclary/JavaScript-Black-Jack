playerScoreDisplay = document.getElementById('playerScore');
dealerScoreDisplay = document.getElementById('dealerScore');
hitBtn = document.getElementById('hit');
standBtn = document.getElementById('stand');
playBtn = document.getElementById('play');
dealBtn = document.getElementById('deal');
let game;

//Contains the rules for the game and how it progresses
class Game {
  //Starts the game by creating the participants and dealing the cards
  constructor(){
    this.deck = new Deck();
    this.player = new Player("Kasey");
    this.dealer = new Dealer();
    this.scoreboard = new Scoreboard(this.player, this.dealer);
    this.cardsDealt = false;
    this.deal();
    hitBtn.addEventListener('click', ()=> {
      if(this.cardsDealt === true){
        this.hit(game.player)
      }else{
        hitBtn.style.backgroundColor = "#ccc";
      }
    });
    standBtn.addEventListener('click', ()=> {
      if(this.cardsDealt === true){
        this.stand()
      } else {
        standBtn.style.backgroundColor = "#ccc";
      }
    });
    dealBtn.addEventListener('click', ()=> {
      if(this.cardsDealt === true){
        standBtn.style.backgroundColor = "#ccc";
      } else {
        this.deal();
      }
    });
  }
  //Adds two cards to the player's hand and one to the dealer's hand
  //TO-DO: Deal two cards to dealer, but have one hidden until dealer turn
  deal(){
    //this.player.cards += this.deck.drawCard();
    this.cardsDealt = true;
    this.clearBoard();
    this.deck.drawCard(this.player, this.scoreboard);
    this.deck.drawCard(this.player, this.scoreboard);
    this.deck.drawCard(this.dealer, this.scoreboard);
  }
  hit(participant){
    this.deck.drawCard(participant, this.scoreboard)
  }

  stand(){
    this.dealer.dealerTurn(this.dealer, this.scoreboard);
  }
  declareWinner(){
    if(this.player.score > 21){
      alert("bust!");
    }
    else if(this.dealer.score > 21){
      alert("dealer bust");
    }
    else if(this.player.score > this.dealer.score){
      alert("player wins!")
    }
    else{
      alert("dealer wins!");
    }
    this.cardsDealt = false;
  }
  clearBoard(){
    this.player.score = 0;
    this.dealer.score = 0;
    this.player.cards = [];
    this.dealer.cards = [];
    this.scoreboard.updateScore(this.player, this.player.score);
    this.scoreboard.updateScore(this.dealer, this.dealer.score);
  }
}

class Scoreboard{
  constructor(player, dealer){
    this.player = player;
    this.dealer = dealer;
  }
  updateScore(participant, value){
    participant.score += value;
    this.displayScore()
    if(this.player.score > 21){
      game.declareWinner();
    }
  }
  displayScore(){
    playerScoreDisplay.innerHTML = "<p> Player: " + this.player.score + "<p>"
    dealerScoreDisplay.innerHTML = "<p> Dealer: " + this.dealer.score + "<p>"
  }
}

//Classes related to the cards and deck
class Deck {
  //Creates a shuffled deck of cards
  constructor(){
    this.cardNames = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
    this.cardSuits = ["Spade", "Club", "Diamond", "Heart"]
    this.cards;
    this.initializeDeck();
    this.shuffleDeck();
  }
  //Builds out an ordered deck of cards
  initializeDeck(){
    let newDeck = [];
    for(let i = 0; i < this.cardNames.length; i++){
      for(let cardCount = 0; cardCount < 4; cardCount++){
        let card = new Card();
        card.suit = this.cardSuits[cardCount];
        card.cardName = this.cardNames[i];
        if(card.cardName === "A"
          ||card.cardName === "K"
          ||card.cardName === "Q"
          ||card.cardName === "J"){
            card.value = 10;
          }else{
            card.value = parseInt(card.cardName);
          }
        newDeck.push(card);
      }
    }
    this.cards = newDeck;
  }
  //shuffles the deck
  shuffleDeck(){
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

  drawCard(participant, scoreboard){
    let drawnCard;
    //Checks to make sure there are cards in the deck
    //If there aren't any cards left, shuffles a new deck
    if(this.cards.length < 1){
      this.initializeDeck();
      this.shuffleDeck();
      drawnCard = this.cards.pop();
    } else{
      drawnCard = this.cards.pop();
    }
    participant.cards.push(drawnCard);
    scoreboard.updateScore(participant, drawnCard.value);
  }

}

class Card {
  //creates a card with a suit and value
  constructor(){
    this.cardName = '';
    this.suit = '';
    this.value = 0;
  }
  //Assigns an integer value to the card based on its name
  getSuit(){
    return this.suit;
  }
  getValue(){
    return this.value;
  }
  setValue(card){
    this.card = card;
    if(this.card.cardName === "A"
    ||this.card.cardName === "K"
    ||this.card.cardName === "Q"
    ||this.card.cardName === "J"){
      this.card.value = 10;
    } else{
      this.card.value = parseInt(this.card.cardName);
    }
    return card;
  }
  getCardName(){
    return this.cardName;
  }
}

//Classes related to the participants in the game
class Participant {
  //super class, applies to dealer and players
  constructor(){
    this.cards = [];
    this.score = 0;
    this.turn = false;
  }
}

class Player extends Participant {
  //class for human players
  constructor(id){
    super();
    this.id = id;
  }
}

class Dealer extends Participant {
  //creates a dealer for the table
  constructor(){
    super();
    id: 'dealer';
  }
  dealerTurn(dealer, scoreboard){
    this.dealer = dealer;
    this.scoreboard = scoreboard;
    if(this.dealer.score < 16){
      game.hit(this.dealer)
      this.dealer.dealerTurn(this.dealer);
    }else{
      game.declareWinner();
    }
  }
}

class NPC extends Participant {
  //creates NPC to populate table
  //Will be added in later development
  constructor(){
    super()
    this.id = 0;
  }
}

//Core logic & flow

playBtn.addEventListener('click', ()=> {
  game = new Game();
})