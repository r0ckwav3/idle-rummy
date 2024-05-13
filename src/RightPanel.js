import MilestoneBox from "./Utils/MilestoneBox.js"

export default function RightPanel(){
  return (
    <div className="rightPanel">
      I'm in the right panel
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
    </div>
  )
}
