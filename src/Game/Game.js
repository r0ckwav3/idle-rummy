import eventManager from '../Utils/EventManager.js';
import {dealHand, calculateHandValue} from './Card.js';

/* GAME CLASS */

class Game{
  constructor(){
    this.chips = 0;             // Chips - the standard currency
    this.deck_cooldown = 10000; // How long does the deck take to refresh
    this.deck_timer = 0;        // Counts up towards this.deck_cooldown
    this.hooks = [];
    this.hand_empty = true;
    this.cards_per_hand = 5;

    this.setHooks();
  }

  // dt: time since last game tick, in milliseconds
  gameTick(dt){
    // deck stuff
    if (this.deck_timer < this.deck_cooldown){
      this.deck_timer += dt;
      eventManager.sendEvent({name: "updateDeckTimer", value: this.chips});
      if(this.deck_timer >= this.deck_cooldown){
        this.attemptDeal();
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
      eventManager.sendEvent({name: "updateDeckTimer", value: this.chips});
    }
  }

  setHooks(){
    this.hooks.push(eventManager.createHook("submitHand", e => {
      let value = calculateHandValue(e.hand);
      this.addChips(value);
      this.hand_empty = true;
      this.attemptDeal();
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
