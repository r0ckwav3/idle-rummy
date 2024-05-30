import CardHand from "./Hand.js";
import SubmitHandButton from './SubmitHandButton.js';
import ChipDisplay from './ChipDisplay.js';
import DeckComponent from './Deck.js';
import tableBackgroundImage from '../images/backgrounds/Table.png'

import "./styles.css";

export default function MainPanel(){
  return (
    <div className="mainPanel" style={{'backgroundImage':`url(${tableBackgroundImage})`}}>
      <div className="topMainPanel">
        <DeckComponent />
        <ChipDisplay />
      </div>
      <SubmitHandButton />
      <CardHand />
    </div>
  )
}
