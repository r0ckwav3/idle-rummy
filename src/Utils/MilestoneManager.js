import eventManager from "./EventManager.js";

class MilestoneManager{
  constructor(){
    this.milestones = [];
    this.currentid = 0;
  }

  createMilestone(name, displayName, cost, kind, description, flavor){
    let milestone = new Milestone(this.currentid, name, displayName, cost, kind, description, flavor);
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
    this.updateVisiblity()
  }

  updateVisiblity(){
    this.milestones.forEach(m => {
      let newvis = m.prerequisites.map(m1=>m1.active).reduce((a,b) => a&&b, true);
      if (newvis !== m.visible){
        m.visible = newvis;
        eventManager.sendEvent({
          name: "updateMilestone",
          milestoneName: m.name,
          milestoneID: m.id,
          visible: newvis
        });
      }
    });
  }
}

class Milestone{
  constructor(id, name, displayName, cost, kind, description, flavor){
    this.id = id; // id corresponds to position in list
    this.name = name; // name should be snake case
    this.displayName = displayName; // display name can be anything
    this.description = description;
    this.flavor = flavor;
    this.active = false;
    this.visible = false; // true if all prerequisistes are active
    this.cost = cost; // negative cost means not purchasable
    this.prerequisites = [];

    this.kind = kind; // achievement, upgrade_global, upgrade_wheat etc.
    this.pos = null; // used when making upgrade trees
  }
}

function createMilestoneSequence(ms){
  for(let i = 0; i<ms.length-1; i++){
    ms[i+1].prerequisites.push(ms[i]);
  }
}

// export
let milestoneManager = new MilestoneManager();
export default milestoneManager;


// create the milestones
// misc
milestoneManager.createMilestone("unknown", "???", -1, "other", "You have not unlocked this yet.", "???");

// -- UPGRADES --
// Deck Upgrades
// each deck cooldown upgrade decreases the cooldown by 1 second
createMilestoneSequence([
  milestoneManager.createMilestone("deck_cooldown_1", "Fast Hands",           100,  "upgrade_deck", "Lower the deck cooldown.", "You're starting to get better at this."),
  milestoneManager.createMilestone("deck_cooldown_2", "Shuffling Techniques", 400,  "upgrade_deck", "Lower the deck cooldown.", "Riffle.. Pile.. Pharoh.. There's honestly too many."),
  milestoneManager.createMilestone("deck_cooldown_3", "Card Sleeves",         900,  "upgrade_deck", "Lower the deck cooldown.", "Let those cards gliiiide against each other."),
  milestoneManager.createMilestone("deck_cooldown_4", "Professional Dealers", 1600, "upgrade_deck", "Lower the deck cooldown.", "Why do what you can pay someone else to do for you?"),
  milestoneManager.createMilestone("deck_cooldown_5", "Backup Deack",         2500, "upgrade_deck", "Lower the deck cooldown.", "You can shuffle one while you're using the other!"),
]);

// Hand Upgrades
// each upgrade increases hand size by 1
createMilestoneSequence([
  milestoneManager.createMilestone("hand_size_1", "Extra Draws",        100,     "upgrade_hand", "Increase your handsize by 1.", "Because you deserve it."),
  milestoneManager.createMilestone("hand_size_2", "Bigger Grip",        1000,    "upgrade_hand", "Increase your handsize by 1.", "Additional space for your additional cards."),
  milestoneManager.createMilestone("hand_size_3", "Bribed Dealer",      10000,   "upgrade_hand", "Increase your handsize by 1.", "Get the dealer to pass you some extra cards."),
  milestoneManager.createMilestone("hand_size_4", "Double-Faced Cards", 100000,  "upgrade_hand", "Increase your handsize by 1.", "Just be careful not to let other people see."),
  milestoneManager.createMilestone("hand_size_5", "Ace Up Your Sleeve", 1000000, "upgrade_hand", "Increase your handsize by 1.", "Huh, how have you never found that one before?"),
]);

// Card Upgrades
createMilestoneSequence([
  milestoneManager.createMilestone("ofakind_double_1", "Double Double",  200,   "upgrade_card", "Double the value of k-of-a-kind hands.", "Note: do not eat the cards."),
  milestoneManager.createMilestone("ofakind_double_2", "Paired Up",      800,   "upgrade_card", "Double the value of k-of-a-kind hands.", "Better together!"),
  milestoneManager.createMilestone("ofakind_double_3", "Twinsies",       3200,  "upgrade_card", "Double the value of k-of-a-kind hands.", "Aren't they so cute!"),
  milestoneManager.createMilestone("ofakind_double_4", "Seeing Double",  12800, "upgrade_card", "Double the value of k-of-a-kind hands.", "You should get that checked out, actually."),
  milestoneManager.createMilestone("ofakind_double_5", "More of a kind", 51200, "upgrade_card", "Double the value of k-of-a-kind hands.", "Maybe you'll get 5 one day."),
]);

createMilestoneSequence([
  milestoneManager.createMilestone("straight_double_1", "Big Flushes",            200,   "upgrade_card", "Double the value of straight flush hands.", "Bigger is better!"),
  milestoneManager.createMilestone("straight_double_2", "Longer Straights",       800,   "upgrade_card", "Double the value of straight flush hands.", "More cards is more value."),
  milestoneManager.createMilestone("straight_double_3", "Lined Up",               3200,  "upgrade_card", "Double the value of straight flush hands.", "Knock 'em down!"),
  milestoneManager.createMilestone("straight_double_4", "Straights in Gibraltar", 12800, "upgrade_card", "Double the value of straight flush hands.", "We're not sure why they're worth more here."),
  milestoneManager.createMilestone("straight_double_5", "Down the drain",         51200, "upgrade_card", "Double the value of straight flush hands.", "Flussshhhhhhh."),
]);

// -- Acheivements --
// milestoneManager.createMilestone("wheat_achievement_1", "First Field", -1, "achievement", "Purchase your first field.");

milestoneManager.updateVisiblity()
eventManager.sendEvent("finishMilestoneInit");
