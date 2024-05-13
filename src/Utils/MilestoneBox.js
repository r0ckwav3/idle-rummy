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
    // TODO: Hook this up to the game file when I finish it
    // console.log("Clicked milestone: " + milestoneName);
    if(!milestone.active && (milestone.cost !== -1)){
      // console.log("Purchasable");
      if(game.attemptPurchase(milestone.cost)){
        // console.log("Purchased");
        milestoneManager.setActive(trueMilestoneID, true);
      }
    }
  }

  return (
  <button onClick={handleClick} className="milestoneBox">
    <TooltipBox>
      {icon_img}
      <div>
        <b> {milestone.displayName} </b>
        {milestone.cost===-1?"":"cost: "+milestone.cost} {/*TODO:  right align this*/}
        <br />
        {milestone.description}
        <br />
        {milestone.active?"active":"inactive"}
      </div>
    </ TooltipBox>
  </button>
  );
}

// I've got to find a good way to do this
function cloneMilestone(milestone){
  return {
    name: milestone.name,
    kind: milestone.kind,
    displayName: milestone.displayName,
    cost: milestone.cost,
    description: milestone.description,
    active: milestone.active
  };
}

// this could be improved, but I think it works fine as is since updateMilestone shouldn't be called often
function useMilestone(milestoneID){
  const [milestone, setMilestone] = useState(cloneMilestone(milestoneManager.getMilestonebyID(milestoneID)));

  useEffect(()=>{
    const eventHook = eventManager.createHook("updateMilestone", e => {
      if(e.milestoneID === milestoneID){
        setMilestone(cloneMilestone(milestoneManager.getMilestonebyID(milestoneID)));
      }
    });

    return () => {
      eventManager.removeHook(eventHook);
    };
  });

  return milestone;
}

function getMilestoneImage(milestone){
  return (<img className="milestoneImage" src={"/images/milestones/"+milestone.kind+"/"+milestone.name+".png"} alt={milestone.displayName + " icon"} />);
}
