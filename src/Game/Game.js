import eventManager from '../Utils/EventManager.js';

class Game{
  constructor(){
    this.chips = 0;
  }

  // dt: time since last game tick, in milliseconds
  gameTick(dt){

  }

  checkPurchase(cost){
    return this.chips >= cost;
  }

  attemptPurchase(cost){
    if(this.chips < cost){
      return false;
    }else{
      this.chips-=cost;
      eventManager.sendEvent({name: "updateChips", value: this.chips})
      return true;
    }
  }

  addChips(n){
    this.chips += n;
    eventManager.sendEvent({name: "updateChips", value: this.chips})
  }
}

let game = new Game();
export default game;
