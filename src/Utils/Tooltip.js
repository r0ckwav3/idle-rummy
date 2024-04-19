import React, { useState, useEffect, useRef, useContext, useReducer, createContext } from 'react';

const tooltipPadding = 10;

// this is some scuffed code that I might look into fixing
// this is probably something I can do with a flexbox and relative positioning

function Tooltip({ state }) {
  const [componentRect, setComponentRect] = useState([0,0]);
  const thisRef = useRef();

  useEffect(() =>{
    const box = thisRef.current.getBoundingClientRect()
    setComponentRect([box.right-box.left,box.bottom-box.top]);
  }, [state.content])

  return (
    <div className="Tooltip" ref={thisRef} style={{
      display: (state.visible ? "block" : "none"),
      left: state.x - (componentRect[0]/2),
      top: state.y - componentRect[1] - tooltipPadding,
    }}>
      {state.content}
    </div>
  );
}

// the last child is the tooltip content
export default function TooltipBox({children}) {
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
    tooltipDispatch({
      type: "update",
      content: children[children.length-1],
      visible: true,
      x: docmiddle,
      y: doctop
    });
  }

  function removeTooltip() {
    tooltipDispatch({
      type: "update",
      visible: false
    });
  }

  // when we rerender this component, it is possible that the contents of the tooltip have changed
  // if this is laggy (for some reason), I could change this to only update if the last child has changed
  if(isHovered){
    setTooltip();
  }

  return (
    <div className="TooltipBox" ref={thisRef} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      {children.slice(0, -1)}
    </div>
  );
}

const initialTooltipState = {
  content: "intitial tooltip",
  visible: false,
  x: 0,
  y: 0
}

function tooltipReducer(state, action) {
  switch (action.type) {
    case 'update': {
      return {
        content: (action.content != null)?action.content:state.content,
        visible: (action.visible != null)?action.visible:state.visible,
        x: (action.x != null)?action.x:state.x,
        y: (action.y != null)?action.y:state.y,
      };
    }
    default: {
      throw Error('Unrecognized Action');
    }
  }
}

export const TooltipDispatchContext = createContext((_action) => { throw Error; });

export function TooltipManager({ children }){
  const [tooltipState, tooltipDispatch] = useReducer(tooltipReducer, initialTooltipState);
  return (<TooltipDispatchContext.Provider value={tooltipDispatch}>
    {children}
    <Tooltip state={tooltipState} />
  </TooltipDispatchContext.Provider>);
}
