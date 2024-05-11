import CardHand from "./Hand.js";
import SubmitHandButton from './SubmitHandButton.js';
import ChipDisplay from './ChipDisplay.js';
import DeckComponent from './Deck.js';

import "./styles.css";

export default function MainPanel(){
  return (
    <div className="mainPanel">
      <div className="topMainPanel">
        <DeckComponent />
        <ChipDisplay />
      </div>
      <SubmitHandButton />
      <CardHand />
    </div>
  )
}
