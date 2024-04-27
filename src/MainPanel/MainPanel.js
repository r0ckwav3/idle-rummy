import React, { useState, useEffect } from 'react';
import CardHand from "./Hand.js";

import eventManager from '../Utils/EventManager.js';
import {calculateHandValue} from "../Game/Card.js"

import "./styles.css";

export default function MainPanel(){
  return (
    <div className="mainPanel">
      <SubmitHandButton />
      <CardHand />
    </div>
  )
}

function SubmitHandButton(){
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
    eventManager.sendEvent({name: "submitHand", value: null});
  }
  return (
    <button className = "submitHandButton" onClick = {buttonClicked}>
      {buttonText}
    </button>
  )
}
