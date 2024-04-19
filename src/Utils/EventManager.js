class EventManager{
  constructor(){
    // maps event names to EventHooks
    this.eventmap = new Map();
    this.currentid = 0; // I just need some way to uniquely identify hooks
  }

  // event is either an object with a name field or a string of the event name
  sendEvent(event){
    let eventname;
    if(typeof event === "string"){
      eventname = event;
    }else{
      eventname = event.name;
    }
    if(this.eventmap.has(eventname)){
      this.eventmap.get(eventname).forEach((eHook)=>{
        eHook.func(event);
      })
    }
  }

  createHook(eventname, func){
    let newHook = new EventHook(eventname, this.currentid, func, this);
    this.currentid += 1;
    if(this.eventmap.has(eventname)){
      this.eventmap.set(eventname, this.eventmap.get(eventname).concat([newHook]));
    }else{
      this.eventmap.set(eventname, [newHook]);
    }
    return newHook;
  }

  // this actually removes all events with matching events and ids,
  // which is the same thing as removeing just that event unless I messed up somewhere
  removeHook(target){
    if(!this.eventmap.has(target.event)){
      return;
    }
    this.eventmap.set(target.event, this.eventmap.get(target.event).filter(eHook => eHook.id !== target.id));
  }
}

class EventHook{
  constructor(event, id, func, parent){
    this.event = event;
    this.id = id;
    this.func = func;
    this.parent = parent;
  }

  delete(){
    this.parent.removeHook(this);
  }
}

let eventManager = new EventManager();
export default eventManager;
