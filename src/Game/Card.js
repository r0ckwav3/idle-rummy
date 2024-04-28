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
export function get_deck(){
  return suits.flatMap(s =>
    values.map(v =>
      ({suit:s, value:v})
    )
  );
}

export function deal_hand(cardnum){
  let deck = get_deck();
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

export function random_card(){
  let s = suits[Math.floor(Math.random()*suits.length)];
  let v = values[Math.floor(Math.random()*values.length)];
  return {suit: s, value: v};
}

export function suit_to_symbol(suit){
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

export function is_valid_hand(hand){
  return true;
}

export function calculateHandValue(hand){
  return hand.length;
}

// PRIVATE FUNCTIONS

function value_to_num(value){
  return values.findIndex(x => x===value);
}
