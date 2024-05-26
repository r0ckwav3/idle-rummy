import React, { useState, useEffect } from 'react';

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
      <img className="chipIcon" src={require("../images/kenney_boardgame-pack/chipRedWhite_border.png")} alt="red poker chip" />
    </div>
  )
}
