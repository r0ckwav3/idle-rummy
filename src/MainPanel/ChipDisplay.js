import React, { useState, useEffect } from 'react';

import chipImage from "../images/icons/chipRedWhite_border.png";
import eventManager from '../Utils/EventManager.js';

export default function ChipDisplay(){
  let [labelText, setLabelText] = useState("0 ")

  useEffect(()=>{
    const eventHook = eventManager.createHook("updateChips", e => {
      setLabelText(`${e.value} `)
    });

    return () => {
      eventManager.removeHook(eventHook);
    };
  });

  return (
    <div className = "chipDisplay">
      {labelText}
      <img className="chipIcon" src={chipImage} alt="red poker chip" />
    </div>
  )
}
