import eventManager from '../Utils/EventManager.js';
import {dealHand, calculateRawHandValue} from './Card.js';
import milestoneManager from '../Utils/MilestoneManager.js';

/* GAME CLASS */

class Game{
  constructor(){
    this.chips = 10000000;             // Chips - the standard currency
    this.deck_timer = 0;        // Counts up towards this.deck_cooldown
    this.hooks = [];
    this.hand_empty = true;
    this.ofakind_multiplier = 1.0;
    this.straight_multiplier = 1.0;
    this.current_selection = [];

    this.calculateConstants();

    this.setHooks();
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
    this.chips += n;
    eventManager.sendEvent({name: "updateChips", value: this.chips});
  }

  attemptDeal(){
    if(this.hand_empty && this.deck_timer >= this.deck_cooldown){
      this.hand_empty = false;
      this.deck_timer = 0;
      eventManager.sendEvent({name: "dealHand", hand: dealHand(this.cards_per_hand)});
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
    return raw_value;
  }

  setHooks(){
    this.hooks.push(eventManager.createHook("submitHand", e => {
      this.current_selection = e.hand;
      let value = this.calculateHandValue();
      this.addChips(value);
      this.hand_empty = true;
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
