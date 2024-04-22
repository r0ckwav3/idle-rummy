import React, {useState} from 'react';

export default function CardHand(){
  let [handContents, setHandContents] = useState([])

  let cardobs = handContents.map((el, i) => (
    <Card key = {i+el.suit+el.value} suit={el.suit} value={el.value} />
  ));
  return (
    <div className = "cardHand">
      <button onClick = {() => setHandContents([{suit:"heart", value:"9"},{suit:"heart", value:"10"},{suit:"heart", value:"J"},{suit:"heart", value:"Q"},{suit:"heart", value:"K"}])}>
        Make a straght flush
      </button>
      <button onClick = {() => setHandContents([{suit:"spade", value:"4"},{suit:"heart", value:"4"},{suit:"diamond", value:"4"},{suit:"club", value:"4"}])}>
        Make a 4-of-a kind
      </button>
      {cardobs}
    </div>
  );
}

function Card({suit, value}){
  return (
  <div className = "card">
    {suit_to_symbol(suit)}
    <br/>
    {value}
  </ div>
  );
}

function suit_to_symbol(suit){
  if(suit === "spade"){
    return "♠";
  }else if(suit === "heart"){
    return "♡";
  }else if(suit === "diamond"){
    return "♢";
  }else if(suit === "club"){
    return "♣";
  }else{
    return "?";
  }
}
