# Idle Rummy (working title)

An idle game built around making high scoring rummy melds.

### Where to play

Right now you need to build the react project yourself by cloning this repo. I'll get a github sites set up once it's in a vaguely working state.

### Todo List
 * Playable Game
   * [X] You can get points by scoring hands
   * [ ] Deck cooldown
   * [ ] Upgrades are purchasable (and like 2 upgrades)
   * [ ] Upgrades are displayed nicely
   * [ ] Locked upgrades are hidden/greyed out
   * [ ] Publish to a site
 * Pre-automation
   * [ ] All hand multiplier upgrades
   * [ ] All handsize increase upgrades
   * [ ] All timer decrease upgrades
   * [ ] Golden cards (probably have an upgrade to unlock them)
   * [ ] Playtest and balance
 * Visual upgrades
   * [ ] Backgrounds
   * [ ] Upgrade Icons
   * [ ] Better looking cards?
   * [ ] Card dealing animations?
   * [ ] Card scoring animations
 * Automation
 * Everything else

### Point Brainstorming
Idk where to put this so I'm just tossing it in the readme

I want the first few upgrades to be like 100/200 points each

Hand probabilities:
```
              5 cards  |  7 cards | 10 cards
1-of-a-kind    50.69%  |   21.06% |   2.02%
2-of-a-kind    47.02%  |   71.14% |   73.74%
3-of-a-kind    2.27%   |   7.63%  |   23.26%
4-of-a-kind    0.03%   |   0.17%  |   0.98%
1-in-a-row     67.69%  |   42.39% |   14.03%
2-in-a-row     30.39%  |   51.22% |   65.96%
3-in-a-row     1.83%   |   5.90%  |   17.26%
4-in-a-row     0.08%   |   0.46%  |   2.46%
5-in-a-row     0.00%   |   0.03%  |   0.25%
6-in-a-row     0.00%   |   0.00%  |   0.03%
7-in-a-row     0.00%   |   0.00%  |   0.00%
8-in-a-row     0.00%   |   0.00%  |   0.00%
9-in-a-row     0.00%   |   0.00%  |   0.00%
10-in-a-row    0.00%   |   0.00%  |   0.00%
```
Points:
 * For a single card, you get the written value + 10 (face cards are 20 points)
 * For a pair, you get 5 * point value
 * For a 3oaK, you get 50 * point value
 * For a 4oaK, you get 500 * point value
 * n in a row is n^2*point sum

I think I want an upgrade somewhere that makes straights not need to match suit. This balances out the two kinds of hands pretty well.
