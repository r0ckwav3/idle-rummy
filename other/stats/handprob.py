import random, copy

suits = list(range(4))
values = list(range(13))

def makedeck():
    return [(s,v) for s in suits for v in values]

def dealhands(size, n):
    deck = makedeck()
    for i in range(n):
        random.shuffle(deck)
        yield deck[0:size]

# returns biggest ofakind
def ofakind(hand):
    inv = {}
    for c in hand:
        v = c[1]
        inv[v] = inv.get(v,0) + 1
    return max(inv.values())

# returns longest straight
def straight(hand):
    hand.sort()
    ans = 0
    curr = 1
    for i in range(1,len(hand)):
        if hand[i-1][0] == hand[i][0] and hand[i-1][1] == hand[i][1]-1:
            curr += 1
        else:
            if curr > ans:
                ans = curr
            curr = 1

    if curr > ans:
        ans = curr
    return ans

def colorblindstraight(hand):
    hand.sort(key=lambda x:x[1])
    ans = 0
    curr = 1
    for i in range(1,len(hand)):
        if hand[i-1][1] == hand[i][1]-1:
            curr += 1
        elif hand[i-1][1] == hand[i][1]:
            pass
        else:
            if curr > ans:
                ans = curr
            curr = 1

    if curr > ans:
        ans = curr
    return ans

def catagorize_hands(size, trials):
    count_ofakind = [0 for j in range(5)]
    count_straight = [0 for j in range(14)]
    for hand in dealhands(size, trials):
        count_ofakind[ofakind(hand)]+=1
        count_straight[colorblindstraight(hand)]+=1

    print("Ran %d trials:" % (trials))
    for i in range(1,5):
        print("{} of a kind: {} ({:.2f}%)".format(i, count_ofakind[i], 100*count_ofakind[i]/trials))
    for i in range(1,14):
        print("{} in a row: {} ({:.2f}%)".format(i, count_straight[i], 100*count_straight[i]/trials))

catagorize_hands(10, 100000)
