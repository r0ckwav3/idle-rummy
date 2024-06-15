import React, { useState } from 'react';
import MilestoneBox from "../Utils/MilestoneBox.js"
import milestoneManager from "../Utils/MilestoneManager.js";
import useEventHook from "../Utils/EventHooks.js";
import woodPanelImage from "../images/backgrounds/wood_panel.png";

import "./styles.css";


const upgrades = [
  ["hand_size_1", "deck_cooldown_1", "ofakind_double_1", "straight_double_1"],
  [null, "deck_cooldown_2", null, null],
  ["hand_size_2", "deck_cooldown_3", "ofakind_double_2", "straight_double_2"],
  [null, "golden_unlock", "deck_cooldown_4", null, null],
  [null, "deck_cooldown_5", "ofakind_double_3", "straight_double_3"],
  ["hand_size_3", "unlock_ascension", "ofakind_double_4", "straight_double_4"],
  ["hand_size_4", "sort_hand", "ofakind_double_5", "straight_double_5"],
  ["hand_size_5"],
]

export default function RightPanel(){
  const [firstVisibleRow, setFirstVisibleRow] = useState(0);

  function updateVisibleRows(){
    let best = 0;
    upgrades.forEach((row, i) =>{
      row.forEach(m => {
        if(m!==null && milestoneManager.getMilestone(m).visible){
          if(i>best){
            best = i;
          }
        }
      });
    });
    setFirstVisibleRow(best);
  }

  useEventHook("updateMilestone", e => {
    if(Object.hasOwn(e, "visible")){
      updateVisibleRows();
    }
  });

  let rows = upgrades.slice(0,firstVisibleRow+1).map((row, i) => {
    let milestones = row.map(name => {
      if (name === null){
        return (<div className="milestoneBoxFiller"/>);
      }else{
        return (<MilestoneBox milestoneName = {name} key={name}/>);
      }
    });
    return (
      <div className="upgradeRow" key={i}>
        {milestones}
      </ div>
    );
  });

  let component_style = {'backgroundImage':`url(${woodPanelImage})`};

  return (
    <div className="rightPanel" style={component_style}>
      {rows}
    </div>
  );
}
