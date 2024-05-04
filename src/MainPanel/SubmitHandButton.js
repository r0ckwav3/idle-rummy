import React, { useState, useEffect } from 'react';

import eventManager from '../Utils/EventManager.js';
import {calculateHandValue} from "../Game/Card.js"

export default function SubmitHandButton(){
  let [buttonText, setButtonText] = useState("+0 Chips");
  let [isActive, setIsActive] = useState();

  useEffect(()=>{
    const eventHook = eventManager.createHook("updateHandSelection", e => {
      let value = calculateHandValue(e.hand);
      setButtonText(`+${value} Chips`);
      setIsActive(value !== 0);
    });

    return () => {
      eventManager.removeHook(eventHook);
    };
  });

  function buttonClicked() {
    eventManager.sendEvent({name: "attemptSubmitHand"});
  }

  let classes = "submitHandButton" + (isActive ? " active" : "");

  return (
    <button className = {classes} onClick = {buttonClicked}>
      <code>
        {buttonText}
      </code>
    </button>
  )
}
