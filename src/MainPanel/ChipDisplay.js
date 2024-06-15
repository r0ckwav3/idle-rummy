import React, { useState } from 'react';

import chipImage from "../images/icons/chipRedWhite_border.png";
import useEventHook from '../Utils/EventHooks.js';

export default function ChipDisplay(){
  let [labelText, setLabelText] = useState("0 ")

  useEventHook("updateChips", e => {
      setLabelText(`${e.value} `)
  });

  return (
    <div className = "chipDisplay">
      {labelText}
      <img className="chipIcon" src={chipImage} alt="red poker chip" />
    </div>
  )
}
