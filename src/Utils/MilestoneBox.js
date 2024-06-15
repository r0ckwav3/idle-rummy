import React, { useState, useEffect } from 'react';
import {TooltipBox} from "./Tooltip.js";
import milestoneManager from "./MilestoneManager.js";
import eventManager from "./EventManager.js";
import {useHiddenMilestone} from "./MilestoneHooks.js"
import game from "../Game/Game.js";
import './styles.css';


// you only need one of milestoneID or milestoneName. If both are given, milestoneID will override
export default function MilestoneBox({ milestoneID, milestoneName }){
  // TODO: center the image vertically
  // this never changes, but is useful for memoization
  const milestone = useHiddenMilestone({ milestoneID, milestoneName });
  const icon_img = getMilestoneImage(milestone);

  function handleClick() {
    if(!milestone.active && (milestone.cost !== -1)){
      if(game.attemptPurchase(milestone.cost)){
        milestoneManager.setActive(milestone.id, true);
      }
    }
  }

  let className = "milestoneBox"
  if (!milestone.active && milestone.name !== "unknown"){
    className += " inactive";
  }

  return (
  <button onClick={handleClick} className={className}>
    <TooltipBox>
      {icon_img}
      <div>
        <div className="milestoneBoxTop">
          <b> {milestone.displayName} </b>
          <div className={"upgradeCost" + (milestone.active?" purchased":"")}>
            {milestone.cost===-1?"":"cost: "+milestone.cost}
          </div>
        </div>
        <br/>
        {milestone.description}
        <br/>
        <i className="flavortext">{milestone.flavor}</i>
      </div>
    </ TooltipBox>
  </button>
  );
}

function getMilestoneImage(milestone){
  return (<img className="milestoneImage" src={milestone.im_path} alt={milestone.displayName + " icon"} />);
}
