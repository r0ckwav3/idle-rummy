# Melds of Majesty

An idle game built around making high scoring rummy melds. Select cards from the bottom of the screen to create n-of-a-kind hands (e.g. two kings) or straight flushes (e.g. 9,10,J of clubs). Spend your hard-earned chips on upgrades in the right panel to improve your scoring skills.

### Where to play

Play on the [github sites](https://r0ckwav3.github.io/idle-rummy/).

### Credits
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses [React](https://react.dev/) and [Mainloop.js](http://icecreamyou.github.io/MainLoop.js/).

Card assets are from [Kenney's Boardgame Pack v2](www.kenney.nl).

Wood background texture is from [texturify](https://texturify.com/stock-photo/wood-wall-10386.html).

All other code and assets in this respository were made by me (r0ckwav3 / Peter Vandervelde).

### Todo List
 * Playable Game (PLG)
   * [X] You can get points by scoring hands
   * [X] Deck cooldown
   * [X] Upgrades are purchasable (and like 2 upgrades)
   * [X] Locked upgrades are hidden/greyed out
   * [X] Publish to a site
 * Pre-automation (PRE)
   * [X] All hand multiplier upgrades
   * [X] All handsize increase upgrades
   * [X] All timer decrease upgrades
   * [X] Golden cards (probably have an upgrade to unlock them)
   * [X] Other upgrades
     * Sort your hand, guarantee a face card, etc.
   * [X] Playtest and balance
 * Visual upgrades (VIS)
   * [X] Improve chip display
   * [X] Backgrounds
   * [X] Upgrade Icons
   * [X] Upgrades are displayed nicely
   * [X] Better looking cards
   * [X] Card dealing animations
   * [ ] Card scoring animations (difficult for technical reasons)
   * [X] Better tooltip styling
 * Automation (AUT)
   * [ ] Add "Cash Out" Mechanic
     * Creates ascention points (to be renamed)
   * [ ] Add ascention points upgrade in their own tab
   * [ ] Add Basic Cash out mechanics and upgrades
   * [ ] Add High Card Automator
   * [ ] Add K-of-a-kind Automator
   * [ ] Add Straight Automator
 * Achievements (ACV)
   * [ ] Add Achievements tab
   * [ ] Add Earnings achievements
   * [ ] Lock ascention points upgrades behind an acheivement for ascending once
 * Offline (OFF)
   * [ ] Add offline detection and offline earnings (maybe locked behind an upgrade)
   * [ ] Add cookies and closed tab detection


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
