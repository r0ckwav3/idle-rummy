import {TooltipManager} from "./Utils/Tooltip.js"
import RightPanel from './RightPanel.js';
import MainPanel from './MainPanel/MainPanel.js';
import './styles.css';

function App() {
  return (
    <div className="App">
    <TooltipManager>
      <MainPanel/>
      <RightPanel/>
    </ TooltipManager>
    </div>
  );
}

export default App;
