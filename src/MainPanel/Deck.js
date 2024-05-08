import React, {useState, useEffect} from 'react';

export default function DeckComponent(){
  const [timerPercent, setTimerPercent] = useState(50);

  return (
    <div className="deckComponent">
      <div className="deckLoadingContainer">
        <div className="deckLoading" style={{'width': `${timerPercent}%`}}/>
      </div>
    </div>
  );
}
