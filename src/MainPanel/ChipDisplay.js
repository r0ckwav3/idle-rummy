import React, { useState, useEffect } from 'react';

import eventManager from '../Utils/EventManager.js';

export default function ChipDisplay(){
  let [labelText, setLabelText] = useState("You have 0 chips.")

  useEffect(()=>{
    const eventHook = eventManager.createHook("updateChips", e => {
      setLabelText(`You have ${e.value} chips.`)
    });

    return () => {
      eventManager.removeHook(eventHook);
    };
  });

  return (
    <div className = "chipDisplay">
      {labelText}
    </div>
  )
}
