import React, {useState, useEffect} from 'react';
import eventManager from '../Utils/EventManager.js';
import cardBackImage from '../images/cards/cardBack_red4.png';

export default function DeckComponent(){
  const [timerPercent, setTimerPercent] = useState(50);

  useEffect(()=>{
    const eventHook = eventManager.createHook("updateDeckTimer", e => {
      setTimerPercent(e.value * 100);
    });

    return () => {
      eventManager.removeHook(eventHook);
    };
  });

  let component_style = {'backgroundImage':`url(${cardBackImage})`};
  let loading_style = {'top': `${timerPercent}%`, 'height': `${100-timerPercent}%`};

  return (
    <div className="deckComponent" style={component_style}>
      <div className="deckLoading" style={loading_style}/>
    </div>
  );
}
