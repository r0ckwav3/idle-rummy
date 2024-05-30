# Idle Rummy (working title)

An idle game built around making high scoring rummy melds.

### Where to play

Right now you need to build the react project yourself by cloning this repo. I'll get a github sites set up once it's in a vaguely working state.

### Credits
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses [React](https://react.dev/) and [Mainloop.js](http://icecreamyou.github.io/MainLoop.js/).

Card assets are from [Kenney's Boardgame Pack v2](www.kenney.nl).

Wood background texture is from [texturify](https://texturify.com/stock-photo/wood-wall-10386.html).

All other code and assets in this respository were made by me (r0ckwav3 / Peter Vandervelde).

### Todo List
 * Playable Game
   * [X] You can get points by scoring hands
   * [X] Deck cooldown
   * [X] Upgrades are purchasable (and like 2 upgrades)
   * [X] Locked upgrades are hidden/greyed out
   * [X] Publish to a site
 * Pre-automation
   * [X] All hand multiplier upgrades
   * [X] All handsize increase upgrades
   * [X] All timer decrease upgrades
   * [X] Golden cards (probably have an upgrade to unlock them)
   * [X] Other upgrades
     * Sort your hand, guarantee a face card, etc.
   * [ ] Playtest and balance
 * Visual upgrades
   * [X] Improve chip display
   * [ ] Backgrounds
   * [X] Upgrade Icons
   * [X] Upgrades are displayed nicely
   * [X] Better looking cards
   * [X] Card dealing animations
   * [ ] Card scoring animations
 * Automation
 * Everything else

### Known Bugs
Gamebreaking:
 * None!

Gameplay
 * None!

Visual
 * None!

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
