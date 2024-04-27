import React, {useState} from 'react';

import {deal_hand, suit_to_symbol} from '../Game/Card.js';
import eventManager from '../Utils/EventManager.js';

export default function CardHand(){
  let [handContents, setHandContents] = useState([]);

  function append_card(suit, value){
    setHandContents(handContents.concat([
      {suit:suit, value:value, selected:false}
    ]));
    eventManager.sendEvent({name:"updateHandSelection", hand:handContents.filter((c,_j) => c.selected)});
  }

  function set_selected_idx(i, v){
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

  function set_hand(h){
    setHandContents(h)
    eventManager.sendEvent({name:"updateHandSelection", hand:[]});
  }

  let cardobs = handContents.map((el, i) => {
    let islast = (i === handContents.length-1);
    let set_selected = (v => set_selected_idx(i, v));
    return (<Card key = {i+el.suit+el.value} card={el} set_selected={set_selected} islast = {islast}/>);
  });

  return (
    <div> {/* TEMP */}
      <button onClick = {() => set_hand(deal_hand(5))}>
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
        {suit_to_symbol(card.suit)}
        <br/>
        {card.value}
      </div>
  </ div>
  );
}
