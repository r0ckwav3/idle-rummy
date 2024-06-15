import { useState, useEffect } from 'react';
import milestoneManager from "./MilestoneManager.js";
import eventManager from "./EventManager.js";

// useffect is activated too often, but I think since updateMilestone isn't very common, it should be fine
export function useMilestone({milestoneID, milestoneName}){
  const trueMilestoneID = useState((milestoneID == null) ? milestoneManager.getMilestone(milestoneName).id : milestoneID)[0];
  const [milestone, setMilestone] = useState(milestoneManager.getMilestonebyID(trueMilestoneID).copy());

  useEffect(()=>{
    const eventHook = eventManager.createHook("updateMilestone", e => {
      if(e.milestoneID === trueMilestoneID){
        setMilestone(milestoneManager.getMilestonebyID(trueMilestoneID).copy());
      }
    });

    return () => {
      eventManager.removeHook(eventHook);
    };
  });

  return milestone;
}

export function useMilestoneActive({ milestoneID, milestoneName }) {
  const milestone = useMilestone({ milestoneID, milestoneName })
  return milestone.active;
}

export function useHiddenMilestone({milestoneID, milestoneName}){
  const milestone = useMilestone({milestoneID, milestoneName});
  if(milestone.visible){
    return milestone;
  }else{
    return milestoneManager.getMilestonebyID(0).copy(); // the unknown milestone
  }
}
