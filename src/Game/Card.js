import eventManager from '../Utils/EventManager.js';
import game from "./Game"

// Helper functions that deal with cards
// expects card objects to have two keys "suit" and "value"



// CONSTANTS
export let suits = ["spade", "heart", "diamond", "club"];
export let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

// EVENT HOOKS

eventManager.createHook("submitHand", e => {
  let value = calculateHandValue(e.hand);
  console.log(`You got ${value} chips!`);
  game.addChips(value);
});

// PUBLIC FUNCTIONS
export function getDeck(){
  return suits.flatMap(s =>
    values.map(v =>
      ({suit:s, value:v})
    )
  );
}

export function dealHand(cardnum){
  let deck = getDeck();
  let temp;
  for(let i = 0; i<cardnum; i++){
    // pick a card from i-decksize
    // swap with the first card to "lock in" that pick
    let idx = i+Math.floor(Math.random()*(deck.length-i));
    temp = deck[idx];
    deck[idx] = deck[i];
    deck[i] = temp;
  }
  return deck.slice(0, cardnum);
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
    console.log(values);
    for(let i = 0; i<values.length-1; i++){
      if(values[i] !== values[i+1]-1){
        return false;
      }
    }
    return true;
  }
  return false;
}

export function calculateHandValue(hand){
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

  if(uniquevalues.size === 1){
    console.log(hand.length, uniquevalues.size, uniquesuits.size);
    if(hand.length === 1){
      return singleCardPointValue(hand[0]);
    }else if(hand.length === 2){
      return singleCardPointValue(hand[0]) * 5;
    }else if(hand.length === 3){
      return singleCardPointValue(hand[0]) * 50;
    }else if(hand.length === 4){
      return singleCardPointValue(hand[0]) * 500;
    }
  }

  return hand.length;
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
