import MilestoneBox from "../Utils/MilestoneBox.js"

import "./styles.css";

const upgrades = [
  ["hand_size_1", "deck_cooldown_1", "ofakind_double_1", "straight_double_1"],
  [null, "deck_cooldown_2", null, null],
  ["hand_size_2", "deck_cooldown_3", "ofakind_double_2", "straight_double_2"],
  ["golden_unlock", "deck_cooldown_4", null, null],
  [null, "deck_cooldown_5", "ofakind_double_3", "straight_double_3"],
  ["hand_size_3", "ofakind_double_4", "straight_double_4"],
  ["sort_hand", null, null],
  ["hand_size_4", "ofakind_double_5", "straight_double_5"],
  ["hand_size_5"],
]

export default function RightPanel(){
  let rows = upgrades.map((row, i) => {
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
  return (
    <div className="rightPanel">
      {rows}
    </div>
  )
}
