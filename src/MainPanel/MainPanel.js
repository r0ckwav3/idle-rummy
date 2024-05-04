import CardHand from "./Hand.js";
import SubmitHandButton from './SubmitHandButton.js';
import ChipDisplay from './ChipDisplay.js';

import "./styles.css";

export default function MainPanel(){
  return (
    <div className="mainPanel">
      <ChipDisplay />
      <SubmitHandButton />
      <CardHand />
    </div>
  )
}
