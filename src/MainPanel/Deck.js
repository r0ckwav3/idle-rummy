import React, {useState, useEffect} from 'react';
import eventManager from '../Utils/EventManager.js';

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

  // I need to add this runtime so that the its in the right file location
  let component_style = {'backgroundImage':'url("images/kenney_boardgame-pack/PNG/Cards/cardBack_red4.png")'};
  let loading_style = {'top': `${timerPercent}%`, 'height': `${100-timerPercent}%`};

  return (
    <div className="deckComponent" style={component_style}>
      <div className="deckLoading" style={loading_style}/>
    </div>
  );
}
