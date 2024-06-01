import React, {useState, useEffect} from 'react';

import {isValidHand, generateCardImgPath} from '../Game/Card.js';
import eventManager from '../Utils/EventManager.js';

export default function CardHand(){
  let [handContents, setHandContents] = useState([]);
  let [resetToggle, setResetToggle] = useState(true);

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
        let el2 = Object.assign({}, el)
        el2.selected = v
        return el2
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
    setHandContents(h);
    setResetToggle(resetToggle/2);
    eventManager.sendEvent({name:"updateHandSelection", hand:[]});
  }

  let cardobs = handContents.map((el, i) => {
    let set_selected = (v => setSelectedIdx(i, v));
    return (<Card key = {i+el.suit+el.value+resetToggle} card={el} set_selected={set_selected} idx={i} card_count={handContents.length}/>);
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

function Card({card, set_selected, idx, card_count}){
  let container_style = {
    "width": 200,
    "minWidth": (idx ===card_count-1) ? 200 : 0
  };

  let card_style = {
    "animationDelay": `${(idx/card_count * 0.2)}s`
  }

  let myclass = card.selected ? "card selected" : "card";
  let alt_text = card.value + " of " + card.suit + "s"

  return (
    <div className = "cardContainer" style={container_style}>
      <img className = {myclass} src={generateCardImgPath(card)} alt={alt_text} onClick={() => set_selected(!card.selected)} style={card_style}/>
    </ div>
  );
}
