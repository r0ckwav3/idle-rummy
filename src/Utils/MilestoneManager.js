import eventManager from "./EventManager.js";

class MilestoneManager{
  constructor(){
    this.milestones = [];
    this.currentid = 0;
  }

  createMilestone(name, displayName, cost, kind, description){
    let milestone = new Milestone(this.currentid, name, displayName, cost, kind, description);
    this.milestones.push(milestone);
    this.currentid += 1;
    return milestone;
  }

  getMilestone(name){
    let ans = null;
    this.milestones.forEach((ms)=>{
      if(ms.name === name){
        ans = ms;
      }
    });
    return ans;
  }

  getMilestonebyID(id){
    return this.milestones[id];
  }

  getMilestonesbyCategory(kind){
    return this.milestones.filter(m => (m.kind === kind));
  }

  isActive(id){
    if(typeof(id) === 'number'){
      return this.milestones[id].active;
    }else{
      let milestone = this.getMilestone(id);
      if (milestone == null){
        return false;
      }
      return milestone.active;
    }
  }

  setActive(id, active){
    // console.log("setActive(", id, "+", active, ");")
    let milestone = this.getMilestonebyID(id);
    milestone.active = active;
    eventManager.sendEvent({
      name: "updateMilestone",
      milestoneName: milestone.name,
      milestoneID: milestone.id,
      active: active
    });
  }
}

class Milestone{
  constructor(id, name, displayName, cost, kind, description){
    this.id = id; // id corresponds to position in list
    this.name = name; // name should be snake case
    this.displayName = displayName; // display name can be anything
    this.description = description;
    this.active = false;
    this.cost = cost; // negative cost means not purchasable
    this.prerequisites = [];

    this.kind = kind; // achievement, upgrade_global, upgrade_wheat etc.
    this.pos = null; // used when making upgrade trees
  }
}

// export
let milestoneManager = new MilestoneManager();
export default milestoneManager;


// create the milestones
// misc
milestoneManager.createMilestone("unknown", "???", -1, "other", "You have not unlocked this yet.");

// -- UPGRADES --
// Deck Upgrades
// each deck cooldown upgrade decreases the cooldown by 1 second
milestoneManager.createMilestone("deck_cooldown_1", "Fast Hands",           100,  "upgrade_deck", "Lower the deck cooldown.");
milestoneManager.createMilestone("deck_cooldown_2", "Shuffling Techniques", 400,  "upgrade_deck", "Lower the deck cooldown.");
milestoneManager.createMilestone("deck_cooldown_3", "Card Sleeves",         900,  "upgrade_deck", "Lower the deck cooldown.");
milestoneManager.createMilestone("deck_cooldown_4", "Professional Dealers", 1600, "upgrade_deck", "Lower the deck cooldown.");
milestoneManager.createMilestone("deck_cooldown_5", "Backup Deack",         2500, "upgrade_deck", "Lower the deck cooldown.");

// Hand Upgrades
// each upgrade increases hand size by 1
milestoneManager.createMilestone("hand_size_1", "Extra Draws",        100,     "upgrade_hand", "Increase your handsize by 1.");
milestoneManager.createMilestone("hand_size_2", "Bigger Grip",        1000,    "upgrade_hand", "Increase your handsize by 1.");
milestoneManager.createMilestone("hand_size_3", "Bribed Dealer",      10000,   "upgrade_hand", "Increase your handsize by 1.");
milestoneManager.createMilestone("hand_size_4", "Double-Faced Cards", 100000,  "upgrade_hand", "Increase your handsize by 1.");
milestoneManager.createMilestone("hand_size_5", "Ace Up Your Sleeve", 1000000, "upgrade_hand", "Increase your handsize by 1.");


// Card Upgrades

// -- Acheivements --
// milestoneManager.createMilestone("wheat_achievement_1", "First Field", -1, "achievement", "Purchase your first field.");

eventManager.sendEvent("finishMilestoneInit");
