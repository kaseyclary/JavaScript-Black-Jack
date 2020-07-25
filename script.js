let playerScore, dealerScore;
let cardValues = ["A",2,3,4,5,6,7,8,9,10,"J","Q","K"];
const highScore = 21;
let deck = [];

//checks to make sure that there are still cards in the deck
if(deck.length < 1){
  shuffleDeck();
};

//assigns a full, randomly shuffled deck to the deck array
function shuffleDeck(){
  let newDeck = [];
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

console.log(deck);

