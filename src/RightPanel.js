import MilestoneBox from "./Utils/MilestoneBox.js";
import woodPanelImage from "./images/backgrounds/wood_panel.png";

export default function RightPanel(){
  let component_style = {'backgroundImage':`url(${woodPanelImage})`};
  return (
    <div className="rightPanel" style={component_style}>
      <br />
      <MilestoneBox milestoneName = "deck_cooldown_1"/>
      <MilestoneBox milestoneName = "deck_cooldown_2"/>
      <MilestoneBox milestoneName = "deck_cooldown_3"/>
      <MilestoneBox milestoneName = "deck_cooldown_4"/>
      <MilestoneBox milestoneName = "deck_cooldown_5"/>
      <br />
      <MilestoneBox milestoneName = "hand_size_1"/>
      <MilestoneBox milestoneName = "hand_size_2"/>
      <MilestoneBox milestoneName = "hand_size_3"/>
      <MilestoneBox milestoneName = "hand_size_4"/>
      <MilestoneBox milestoneName = "hand_size_5"/>
      <br />
      <MilestoneBox milestoneName = "ofakind_double_1"/>
      <MilestoneBox milestoneName = "ofakind_double_2"/>
      <MilestoneBox milestoneName = "ofakind_double_3"/>
      <MilestoneBox milestoneName = "ofakind_double_4"/>
      <MilestoneBox milestoneName = "ofakind_double_5"/>
      <br />
      <MilestoneBox milestoneName = "straight_double_1"/>
      <MilestoneBox milestoneName = "straight_double_2"/>
      <MilestoneBox milestoneName = "straight_double_3"/>
      <MilestoneBox milestoneName = "straight_double_4"/>
      <MilestoneBox milestoneName = "straight_double_5"/>
      <br />
      <MilestoneBox milestoneName = "golden_unlock"/>
      <MilestoneBox milestoneName = "sort_hand"/>
    </div>
  )
}
