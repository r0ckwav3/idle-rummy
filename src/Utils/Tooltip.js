import React, { useState, useEffect, useRef, useContext, useReducer, createContext } from 'react';
import useWindowDimensions from './WindowDimensions.js'
import './styles.css';

const tooltipPaddingTop = 10;
const tooltipPaddingBottom = 10;
const tooltipPaddingHori = 20;

// this is some scuffed code that I might look into fixing
// this is probably something I can do with a flexbox and relative positioning

function Tooltip({ state }) {
  const [componentRect, setComponentRect] = useState([0,0]);
  const w_dims = useWindowDimensions();
  const thisRef = useRef();

  useEffect(() =>{
    const box = thisRef.current.getBoundingClientRect()
    setComponentRect([box.right-box.left,box.bottom-box.top]);
  }, [state.content])

  let my_left = state.x - (componentRect[0]/2);
  console.log(my_left, componentRect[0], w_dims.width);
  if (my_left<=tooltipPaddingHori) {
    my_left = componentRect[0]/2 + tooltipPaddingHori;
  } else if (my_left + componentRect[0] >= w_dims.width-tooltipPaddingHori){
    my_left = w_dims.width - componentRect[0] - tooltipPaddingHori;
  }
  console.log(my_left, componentRect[0], w_dims.width);

  let my_top = state.topy - componentRect[1] - tooltipPaddingTop;
  if (my_top <= 0){
    my_top = state.bottomy + tooltipPaddingBottom;
  }

  return (
    <div className="Tooltip" ref={thisRef} style={{
      display: (state.visible ? "block" : "none"),
      left: my_left,
      top: my_top,
    }}>
      {state.content}
    </div>
  );
}

const initialTooltipState = {
  content: "intitial tooltip",
  visible: false,
  x: 0,
  topy: 0,
  bottomy: 0,
}

function tooltipReducer(state, action) {
  switch (action.type) {
    case 'update': {
      return {
        content: (action.content != null)?action.content:state.content,
        visible: (action.visible != null)?action.visible:state.visible,
        x: (action.x != null)?action.x:state.x,
        topy: (action.topy != null)?action.topy:state.topy,
        bottomy: (action.bottomy != null)?action.bottomy:state.bottomy,
      };
    }
    default: {
      throw Error('Unrecognized Action');
    }
  }
}

export const TooltipDispatchContext = createContext((_action) => { throw Error("uninitialized TooltipDispatch"); });

export function TooltipManager({ children }){
  const [tooltipState, tooltipDispatch] = useReducer(tooltipReducer, initialTooltipState);
  return (<TooltipDispatchContext.Provider value={tooltipDispatch}>
    {children}
    <Tooltip state={tooltipState} />
  </TooltipDispatchContext.Provider>);
}

// the last child is the tooltip content
export function TooltipBox({children}) {
  const thisRef = useRef();
  const tooltipDispatch = useContext(TooltipDispatchContext);

  const [isHovered, setIsHovered] = useState(false);

  function handleMouseOver(){
      setTooltip();
      setIsHovered(true);
  }

  function handleMouseOut(){
      removeTooltip();
      setIsHovered(false);
  }

  function setTooltip() {
    const clientRect = thisRef.current.getBoundingClientRect()
    const docmiddle = (clientRect.right + clientRect.left)/2 + window.scrollX;
    const doctop = clientRect.top + window.scrollY;
    const docbottom = clientRect.bottom + window.scrollY;
    tooltipDispatch({
      type: "update",
      content: children[children.length-1],
      visible: true,
      x: docmiddle,
      topy: doctop,
      bottomy: docbottom,
    });
  }

  function removeTooltip() {
    tooltipDispatch({
      type: "update",
      visible: false
    });
  }

  useEffect(() =>{
    if(isHovered){
      setTooltip();
    }
  }, [isHovered, children])

  // when we rerender this component, it is possible that the contents of the tooltip have changed
  // if this is laggy (for some reason), I could change this to only update if the last child has changed
  // if(isHovered){
  //   setTooltip();
  // }

  return (
    <div className="TooltipBox" ref={thisRef} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      {children.slice(0, -1)}
    </div>
  );
}
