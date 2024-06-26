// Helper functions that deal with cards
// expects card objects to have two keys "suit" and "value"


// CONSTANTS
export let suits = ["spade", "heart", "club", "diamond"]; // this order makes sorting look nicer
export let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

// PUBLIC FUNCTIONS
export function getDeck(){
  return suits.flatMap(s =>
    values.map(v =>
      ({suit:s, value:v})
    )
  );
}

export function randomCard(){
  let s = suits[Math.floor(Math.random()*suits.length)];
  let v = values[Math.floor(Math.random()*values.length)];
  return {suit: s, value: v};
}

export function suitToSymbol(suit){
  if(suit === "spade"){
    return "♠";
  }else if(suit === "heart"){
    return "♡";
  }else if(suit === "diamond"){
    return "♢";
  }else if(suit === "club"){
    return "♣";
  }else{
    return "?";
  }
}

export function isValidHand(hand){
  if(hand.length === 0){
    return false;
  }
  let uniquevalues = new Set();
  let uniquesuits = new Set();
  hand.forEach(card => {
    uniquevalues.add(card.value);
    uniquesuits.add(card.suit);
  });
  // check for n-of-a-kind
  if(uniquevalues.size === 1){
    return true;
  }
  //check for straights
  if(uniquesuits.size === 1){
    let values = Array.from(uniquevalues).map(valueToNum);
    values.sort((a,b)=>a-b);
    for(let i = 0; i<values.length-1; i++){
      if(values[i] !== values[i+1]-1){
        return false;
      }
    }
    return true;
  }
  return false;
}

// returns (value, type)
// type is "ofakind" or "straight"
export function calculateRawHandValue(hand){
  if (!isValidHand(hand)){
    return [0, "ofakind"];
  }
  // From README.md:
  //  * For a single card, you get the written value + 10 (face cards are 20 points)
  //  * For a pair, you get 5 * point value
  //  * For a 3oaK, you get 50 * point value
  //  * For a 4oaK, you get 500 * point value
  //  * n in a row is n^2*point sum

  let uniquevalues = new Set();
  let uniquesuits = new Set();
  hand.forEach(card => {
    uniquevalues.add(card.value);
    uniquesuits.add(card.suit);
  });

  // n-of-a-kinds
  if(uniquevalues.size === 1){
    if(hand.length === 1){
      return [singleCardPointValue(hand[0]), "ofakind"];
    }else if(hand.length === 2){
      return [singleCardPointValue(hand[0]) * 5, "ofakind"];
    }else if(hand.length === 3){
      return [singleCardPointValue(hand[0]) * 50, "ofakind"];
    }else if(hand.length === 4){
      return [singleCardPointValue(hand[0]) * 500, "ofakind"];
    }
  }

  // straights
  let cardsum = hand.map(c => singleCardPointValue(c)).reduce((a,b)=>a+b);
  return [cardsum * (hand.length ** 2), "straight"];
}

let card_paths = {};
getDeck().forEach(card => {
  let camel_suit = card.suit.at(0).toUpperCase() + card.suit.substr(1);
  let path = require("../images/cards/card" + camel_suit + "s" + card.value + ".png");
  card_paths[card.suit+card.value] = path;
  let gpath = require("../images/golden_cards/card" + camel_suit + "s" + card.value + ".png");
  card_paths["g"+card.suit+card.value] = gpath;
});
export function generateCardImgPath(card){
  if (card["golden"]){
    return card_paths["g"+card.suit+card.value]
  }
  return card_paths[card.suit+card.value]
}

export function sortHand(hand){
  hand.sort(compare);
}

// PRIVATE FUNCTIONS

function singleCardPointValue(card){
  let valueid = valueToNum(card.value);
  if(valueid > 9){
    return 20;
  }else{
    return valueid + 11;
  }
}

function valueToNum(value){
  return values.findIndex(x => x===value);
}

function compare(card1, card2){
  if (card1.suit !== card2.suit){
    return suits.findIndex(x => x===card1.suit) - suits.findIndex(x => x===card2.suit);
  }else{
    return values.findIndex(x => x===card1.value) - values.findIndex(x => x===card2.value);
  }
}
