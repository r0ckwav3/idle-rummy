import React, {useState} from 'react';
import useEventHook from '../Utils/EventHooks.js';
import cardBackImage from '../images/cards/cardBack_red4.png';

export default function DeckComponent(){
  const [timerPercent, setTimerPercent] = useState(50);

  useEventHook("updateDeckTimer", e => {
    setTimerPercent(e.value * 100);
  });

  let component_style = {'backgroundImage':`url(${cardBackImage})`};
  let loading_style = {'top': `${timerPercent}%`, 'height': `${100-timerPercent}%`};

  return (
    <div className="deckComponent" style={component_style}>
      <div className="deckLoading" style={loading_style}/>
    </div>
  );
}
