import React, {useState, useEffect} from 'react';

import {dealHand, suitToSymbol, isValidHand} from '../Game/Card.js';
import eventManager from '../Utils/EventManager.js';

export default function CardHand(){
  let [handContents, setHandContents] = useState([]);

  function appendCard(suit, value){
    setHandContents(handContents.concat([
      {suit:suit, value:value, selected:false}
    ]));
    eventManager.sendEvent({name:"updateHandSelection", hand:handContents.filter((c,_j) => c.selected)});
  }

  function setSelectedIdx(i, v){
    // slightly sus but I think react is ok with it
    setHandContents(handContents.map((el, j) => {
      if(j === i){
        return {suit:el.suit, value:el.value, selected: v};
      }else{
        return el;
      }
    }));

    eventManager.sendEvent({name:"updateHandSelection", hand:handContents.filter((c,j) => j === i ? v : c.selected)});
  }

  function setHand(h){
    setHandContents(h)
    eventManager.sendEvent({name:"updateHandSelection", hand:[]});
  }

  let cardobs = handContents.map((el, i) => {
    let islast = (i === handContents.length-1);
    let set_selected = (v => setSelectedIdx(i, v));
    return (<Card key = {i+el.suit+el.value} card={el} set_selected={set_selected} islast = {islast}/>);
  });

  useEffect(()=>{
    const eventHook = eventManager.createHook("attemptSubmitHand", _e => {
      if(handContents.length !== 0 && isValidHand(handContents)){
        let temphand = handContents.filter((c,_j) => c.selected);
        setHand([]);
        eventManager.sendEvent({name: "submitHand", hand: temphand});
      }
    });

    return () => {
      eventManager.removeHook(eventHook);
    };
  });

  return (
    <div> {/* TEMP */}
      <button onClick = {() => setHand(dealHand(5))}>
        Deal a hand
      </button>
      <div className = "cardHand">
        {cardobs}
      </div>
    </div>
  );
}

function Card({card, set_selected, islast}){
  let mystyles = {"width": 200};

  if (islast){
    mystyles["min-width"] = 200;
  }else{
    mystyles["min-width"] = 0;
  }

  let myclass = card.selected ? "card selected" : "card";

  return (
    <div className = "cardcontainer" style={mystyles}>
      <div className = {myclass} onClick={() => set_selected(!card.selected)}>
        {suitToSymbol(card.suit)}
        <br/>
        {card.value}
      </div>
  </ div>
  );
}
