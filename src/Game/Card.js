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
  return hand.length !== 0;
}

export function calculateHandValue(hand){
  return hand.length;
}

// PRIVATE FUNCTIONS

function valueToNum(value){
  return values.findIndex(x => x===value);
}
