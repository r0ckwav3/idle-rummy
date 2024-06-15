import React, { useState } from 'react';

import eventManager from '../Utils/EventManager.js';
import useEventHook from '../Utils/EventHooks.js';
import {useMilestoneActive} from '../Utils/MilestoneHooks.js'
import game from '../Game/Game.js';

export default function CollectButtons(){
  const ascensionUpgradeActive = useMilestoneActive({milestoneName: 'unlock_ascension'});
  const showCashOut = ascensionUpgradeActive;

  return (
    <div className="collectButtons">
      <SubmitHandButton/>
      {showCashOut ? <CashOutButton/> : ""}
    </div >
  )
}

function CashOutButton(){
  // TODO: set up default value
  function getText(v){
    return `Cash Out ($${v})`;
  }
  let [buttonText, setButtonText] = useState(getText(game.getAscendValue()));

  useEventHook("updateAscendValue", e => {
    setButtonText(getText(e.value));
  });

  function buttonClicked() {
    eventManager.sendEvent({name: "attemptAscend"});
  }

  return (
      <button className = "cashOutButton" onClick = {buttonClicked}>
        <code>
          {buttonText}
        </code>
      </button>
    )
}

function SubmitHandButton(){
  let [buttonText, setButtonText] = useState("+0 Chips");
  let [isActive, setIsActive] = useState();

  useEventHook("updateHandValue", e => {
    let value = e.value;
    setButtonText(`+${value} Chips`);
    setIsActive(value !== 0);
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
