import eventManager from '../Utils/EventManager.js';
import {getDeck, calculateRawHandValue, sortHand} from './Card.js';
import milestoneManager from '../Utils/MilestoneManager.js';

/* GAME CLASS */

class Game{
  constructor(){
    this.chips = 0;             // Chips - the standard currency
    this.run_chips = 0;
    this.total_chips = 0;
    this.money = 0;             // Money - ascension currency
    this.total_money = 0;

    this.deck_timer = 0;        // Counts up towards this.deck_cooldown
    this.hooks = [];
    this.hand_empty = true;
    this.ofakind_multiplier = 1.0;
    this.straight_multiplier = 1.0;
    this.current_selection = [];

    this.calculateConstants();

    this.setHooks();
    this.addChips(100000); // for debug purposes
  }

  // dt: time since last game tick, in milliseconds
  gameTick(dt){
    // deck stuff
    if (this.deck_timer < this.deck_cooldown){
      this.deck_timer += dt;
      eventManager.sendEvent({name: "updateDeckTimer", value: (this.deck_timer/this.deck_cooldown)});
      if(this.deck_timer >= this.deck_cooldown){
        this.attemptDeal();
      }
    }
  }

  calculateConstants(){
    this.deck_cooldown = 10000; // How long does the deck take to refresh (milliseconds)
    for(let i = 1; i<6; i++){
      if(milestoneManager.isActive('deck_cooldown_'+i)){
        this.deck_cooldown -= 1000;
      }
    }

    this.cards_per_hand = 5;
    for(let i = 1; i<6; i++){
      if(milestoneManager.isActive('hand_size_'+i)){
        this.cards_per_hand += 1;
      }
    }

    this.ofakind_multiplier = 1.0;
    for(let i = 1; i<6; i++){
      if(milestoneManager.isActive('ofakind_double_'+i)){
        this.ofakind_multiplier *= 2;
      }
    }

    this.straight_multiplier = 1.0;
    for(let i = 1; i<6; i++){
      if(milestoneManager.isActive('straight_double_'+i)){
        this.straight_multiplier *= 2;
      }
    }
  }

  checkPurchase(cost){
    return this.chips >= cost;
  }

  attemptPurchase(cost){
    if(this.chips < cost){
      return false;
    }else{
      this.chips-=cost;
      eventManager.sendEvent({name: "updateChips", value: this.chips});
      return true;
    }
  }

  addChips(n){
    let oldAscendValue = this.getAscendValue();

    this.chips += n;
    this.run_chips += n;
    this.total_chips += n;
    eventManager.sendEvent({name: "updateChips", value: this.chips});

    let newAscendValue = this.getAscendValue();
    if(oldAscendValue !== newAscendValue){
      eventManager.sendEvent({name: "updateAscendValue", value: newAscendValue});
    }
  }

  addMoney(n){
    this.money += n;
    this.total_money += n;
    eventManager.sendEvent({name: "updateMoney", value: this.chips});
  }

  getAscendValue(){
    let target_value = Math.floor(Math.sqrt(this.total_chips / 10000));
    return Math.max(target_value - this.total_money, 0);
  }

  attemptDeal(){
    if(this.hand_empty && this.deck_timer >= this.deck_cooldown){
      this.hand_empty = false;
      this.deck_timer = 0;
      eventManager.sendEvent({name: "dealHand", hand: this.dealHand(this.cards_per_hand)});
      eventManager.sendEvent({name: "updateDeckTimer", value: (this.deck_timer/this.deck_cooldown)});
    }
  }

  calculateHandValue(){
    let [raw_value, hand_type] = calculateRawHandValue(this.current_selection);
    if (hand_type === "ofakind"){
      raw_value *= this.ofakind_multiplier;
    }
    if (hand_type === "straight"){
      raw_value *= this.straight_multiplier;
    }
    this.current_selection.forEach(card => {
      if (card.golden){
        raw_value *= 10;
      }
    })
    return raw_value;
  }

  dealHand(cardnum){
    let deck = getDeck();
    let temp;
    for(let i = 0; i<cardnum; i++){
      // pick a card from i-decksize
      // swap with the first card to "lock in" that pick
      let idx = i+Math.floor(Math.random()*(deck.length-i));
      temp = deck[idx];
      deck[idx] = deck[i];
      deck[i] = temp;
      if (milestoneManager.isActive('golden_unlock')){
        if ((Math.random() * 100) < 1){
          deck[i].golden = true;
        }
      }
    }
    let hand = deck.slice(0, cardnum);
    if(milestoneManager.isActive('sort_hand')){
      sortHand(hand);
    }
    return hand;
  }

  setHooks(){
    this.hooks.push(eventManager.createHook("submitHand", e => {
      this.current_selection = e.hand;
      let value = this.calculateHandValue();
      this.addChips(value);
      this.hand_empty = true;
      this.current_selection = [];
      this.attemptDeal();
    }));
    this.hooks.push(eventManager.createHook("updateMilestone", _e => {
      this.calculateConstants();
      this.attemptDeal();
      eventManager.sendEvent({name: "updateHandValue", value: this.calculateHandValue()});
    }));
    this.hooks.push(eventManager.createHook("updateHandSelection", e => {
      this.current_selection = e.hand;
      eventManager.sendEvent({name: "updateHandValue", value: this.calculateHandValue()});
    }));
  }

  removeHooks(){
    this.hooks.foreach(h => h.delete());
    this.hooks.clear();
  }
}

/* EXPORTS */

let game = new Game();
export default game;
