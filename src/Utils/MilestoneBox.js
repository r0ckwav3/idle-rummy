import React, { useState, useEffect } from 'react';
import {TooltipBox} from "./Tooltip.js";
import milestoneManager from "./MilestoneManager.js";
import eventManager from "./EventManager.js";
import game from "../Game/Game.js";
import './styles.css';


// you only need one of milestoneID or milestoneName. If both are given, milestoneID will override
export default function MilestoneBox({ milestoneID, milestoneName }){
  // TODO: center the image vertically
  // this never changes, but is useful for memoization
  const trueMilestoneID = useState((milestoneID == null) ? milestoneManager.getMilestone(milestoneName).id : milestoneID)[0];
  const milestone = useMilestone(trueMilestoneID);
  const icon_img = getMilestoneImage(milestone);

  function handleClick() {
    if(!milestone.active && (milestone.cost !== -1)){
      if(game.attemptPurchase(milestone.cost)){
        milestoneManager.setActive(trueMilestoneID, true);
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

// this could be improved, but I think it works fine as is since updateMilestone shouldn't be called often
function useMilestone(milestoneID){
  const [milestone, setMilestone] = useState(milestoneManager.getMilestonebyID(milestoneID).copy());


  useEffect(()=>{
    const eventHook = eventManager.createHook("updateMilestone", e => {
      if(e.milestoneID === milestoneID){
        setMilestone(milestoneManager.getMilestonebyID(milestoneID).copy());
      }
    });

    return () => {
      eventManager.removeHook(eventHook);
    };
  });

  if(milestone.visible){
    return milestone;
  }else{
    return milestoneManager.getMilestonebyID(0).copy(); // the unknown milestone
  }
}

function getMilestoneImage(milestone){
  return (<img className="milestoneImage" src={milestone.im_path} alt={milestone.displayName + " icon"} />);
}
