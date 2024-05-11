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

  return (
    <div className="deckComponent">
      <div className="deckLoadingContainer">
        <div className="deckLoading" style={{'width': `${timerPercent}%`}}/>
      </div>
    </div>
  );
}
