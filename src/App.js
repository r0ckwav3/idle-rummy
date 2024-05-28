import MainLoop from 'mainloop.js';

import {TooltipManager} from "./Utils/Tooltip.js";
import RightPanel from './RightPanel.js';
import WoodBeam from './WoodBeam.js';
import MainPanel from './MainPanel/MainPanel.js';

import game from "./Game/Game.js";

import './styles.css';

MainLoop.setUpdate((dt)=>{game.gameTick(dt)}).start();

function App() {
  return (
    <div className="App">
    <TooltipManager>
      <MainPanel/>
      <WoodBeam/>
      <RightPanel/>
    </ TooltipManager>
    </div>
  );
}

export default App;
