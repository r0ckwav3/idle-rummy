import React, { useState, useEffect } from 'react';

import eventManager from '../Utils/EventManager.js';
import {calculateHandValue} from "../Game/Card.js"

export default function SubmitHandButton(){
  let [buttonText, setButtonText] = useState("+0 Chips")

  useEffect(()=>{
    const eventHook = eventManager.createHook("updateHandSelection", e => {
      let value = calculateHandValue(e.hand);
      setButtonText(`+${value} Chips`)
    });

    return () => {
      eventManager.removeHook(eventHook);
    };
  });

  function buttonClicked() {
    eventManager.sendEvent({name: "attemptSubmitHand"});
  }
  return (
    <button className = "submitHandButton" onClick = {buttonClicked}>
      {buttonText}
    </button>
  )
}
