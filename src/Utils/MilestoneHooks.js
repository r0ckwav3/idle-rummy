import { useState } from 'react';
import milestoneManager from "./MilestoneManager.js";
import useEventHook from "./EventHooks.js";

// useffect is activated too often, but I think since updateMilestone isn't very common, it should be fine
export function useMilestone({milestoneID, milestoneName}){
  const trueMilestoneID = useState((milestoneID == null) ? milestoneManager.getMilestone(milestoneName).id : milestoneID)[0];
  const [milestone, setMilestone] = useState(milestoneManager.getMilestonebyID(trueMilestoneID).copy());

  useEventHook("updateMilestone", e => {
    if(e.milestoneID === trueMilestoneID){
      setMilestone(milestoneManager.getMilestonebyID(trueMilestoneID).copy());
    }
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
