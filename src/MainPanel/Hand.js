import React, {useState} from 'react';

export default function CardHand(){
  let [handContents, setHandContents] = useState([]);

  function append_card(suit, value){
    setHandContents(handContents.concat([
      {suit:suit, value:value, selected:false}
    ]));
  }
  function set_selected_idx(i, v){
    // slightly sus but I think react is ok with it
    setHandContents(handContents.map((el, i1) => {
      if(i1 === i){
        return {suit:el.suit, value:el.value, selected: v};
      }else{
        return el;
      }
    }));
  }

  let cardobs = handContents.map((el, i) => {
    let islast = (i == handContents.length-1);
    let set_selected = (v => set_selected_idx(i, v));
    return (<Card key = {i+el.suit+el.value} card={el} set_selected={set_selected} islast = {islast}/>);
  });

  return (
    <div> {/* TEMP */}
      <button onClick = {() => setHandContents([{suit:"spade", value:"4", selected:false},{suit:"heart", value:"4", selected:false},{suit:"diamond", value:"4", selected:false},{suit:"club", value:"4", selected:false}])}>
        Make a 4-of-a kind
      </button>
      <button onClick = {() => setHandContents([1,2,3,4,5,6,7,8,9,10,"J","Q","K"].map(v => {return {suit:"spade", value:v, seleced:false}}))}>
        Make a suit
      </button>
      <button onClick = {() => append_card(["spade","heart","diamond","club"][Math.floor(Math.random()*4)],[1,2,3,4,5,6,7,8,9,10,"J","Q","K"][Math.floor(Math.random()*13)])}>
        Add a random card
      </button>
      <div className = "cardHand">
        {cardobs}
      </div>
    </div>
  );
}

function Card({card, set_selected, islast}){
  let mystyles = {"width": 200};

  if (islast){
    mystyles["min-width"] = 200;
  }else{
    mystyles["min-width"] = 0;
  }

  let myclass = card.selected ? "card selected" : "card";

  return (
    <div className = "cardcontainer" style={mystyles}>
      <div className = {myclass} onClick={() => set_selected(!card.selected)}>
        {suit_to_symbol(card.suit)}
        <br/>
        {card.value}
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
