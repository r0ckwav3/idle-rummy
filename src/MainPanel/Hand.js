import React, {useState, useEffect} from 'react';

import {isValidHand, generateCardImgPath} from '../Game/Card.js';
import eventManager from '../Utils/EventManager.js';

export default function CardHand(){
  let [handContents, setHandContents] = useState([]);

  // function appendCard(suit, value){
  //   setHandContents(handContents.concat([
  //     {suit:suit, value:value, selected:false}
  //   ]));
  //   eventManager.sendEvent({name:"updateHandSelection", hand:handContents.filter((c,_j) => c.selected)});
  // }

  function setSelectedIdx(i, v){
    // slightly sus but I think react is ok with it
    let temphand = handContents.map((el, j) => {
      if(j === i){
        return {suit:el.suit, value:el.value, selected: v};
      }else{
        return el;
      }
    })
    let tempselectedhand = temphand.filter(c => c.selected);

    if (isValidHand(tempselectedhand) || tempselectedhand.length === 0){
      setHandContents(temphand);
      eventManager.sendEvent({name:"updateHandSelection", hand:tempselectedhand});
    }
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
      let temphand = handContents.filter((c,_j) => c.selected);
      if(temphand.length !== 0 && isValidHand(temphand)){
        setHand([]);
        eventManager.sendEvent({name: "submitHand", hand: temphand});
      }
    });

    return () => {
      eventManager.removeHook(eventHook);
    };
  });

  useEffect(()=>{
    const eventHook = eventManager.createHook("dealHand", e => {
      setHand(e.hand);
    });

    return () => {
      eventManager.removeHook(eventHook);
    };
  });

  return (
    <div className = "cardHand">
      {cardobs}
    </div>
  );
}

function Card({card, set_selected, islast}){
  let mystyles = {"width": 200};

  if (islast){
    mystyles["minWidth"] = 200;
  }else{
    mystyles["minWidth"] = 0;
  }

  let myclass = card.selected ? "card selected" : "card";
  let alt_text = card.value + " of " + card.suit + "s"

  return (
    <div className = "cardContainer" style={mystyles}>
      <img className = {myclass} src={generateCardImgPath(card)} alt={alt_text} onClick={() => set_selected(!card.selected)} />
  </ div>
  );
}
