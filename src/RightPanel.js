import MilestoneBox from "./Utils/MilestoneBox.js"

export default function RightPanel(){
  return (
    <div className="rightPanel">
      I'm in the right panel
      <br />
      <MilestoneBox milestoneName = "deck_cooldown_1"/>
      <br />
      <MilestoneBox milestoneName = "deck_cooldown_2"/>
      <br />
      <MilestoneBox milestoneName = "deck_cooldown_3"/>
      <br />
      <MilestoneBox milestoneName = "deck_cooldown_4"/>
      <br />
      <MilestoneBox milestoneName = "deck_cooldown_5"/>
    </div>
  )
}
