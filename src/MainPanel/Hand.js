import React, {useState} from 'react';

const card_dims = [200, 300];

export default function CardHand(){
  let [handContents, setHandContents] = useState([])

  let cardobs = handContents.map((el, i) => (
    <Card key = {i+el.suit+el.value} suit={el.suit} value={el.value} islast = {(i == handContents.length-1)}/>
  ));
  return (
    <div> {/* TEMP */}
      <button onClick = {() => setHandContents([{suit:"heart", value:"9"},{suit:"heart", value:"10"},{suit:"heart", value:"J"},{suit:"heart", value:"Q"},{suit:"heart", value:"K"}])}>
        Make a straght flush
      </button>
      <button onClick = {() => setHandContents([{suit:"spade", value:"4"},{suit:"heart", value:"4"},{suit:"diamond", value:"4"},{suit:"club", value:"4"}])}>
        Make a 4-of-a kind
      </button>
      <button onClick = {() => setHandContents([1,2,3,4,5,6,7,8,9,10,"J","Q","K"].map(v => {return {suit:"spade", value:v}}))}>
        Make a suit
      </button>
      <div className = "cardHand">
        {cardobs}
      </div>
    </div>
  );
}

function Card({suit, value, islast}){
  let mystyles = {"width": 200};
  if (islast){
    mystyles["min-width"] = 200;
  }else{
    mystyles["min-width"] = 0;
  }
  return (
    <div className = "cardcontainer" style={mystyles}>
      <div className = "card">
        {suit_to_symbol(suit)}
        <br/>
        {value}
      </div>
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
