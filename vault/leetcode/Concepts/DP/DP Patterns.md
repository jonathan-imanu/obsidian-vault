The complete set of dynamic programming patterns from this [AlgoMaster Article](https://blog.algomaster.io/p/20-patterns-to-master-dynamic-programming). Some patterns, such as 18. Bitmasking DP, have been regrouped into sub-tasks within more broad patterns.
### Aside: General Core Ideas

#### Loop order defines the direction of causality in your DP.

Consider [518. Coin Change II](https://leetcode.com/problems/coin-change-ii/). The problem wants the number of combinations BUT what if it asked for permutations instead? Just change the loop order:

```python 
# Combinations
# for each coin, I will use it as much as I can before moving on to the next
# 1 + 2 is possible but 2 + 1 isn't
for coin in coins:
	for i in range(amount):
		some work ...
		
# Permutations
# from any partial sum, I may append any coin next 
# so 1 + 2 and 2 + 1 are both possible
for i in range(amount):
	for coin in coins:
		some work ...
```
## 1. Fibonacci Sequence

Recap:

`F(0) = 0, F(1) = 1, F(N) = F(N -1) + F(N - 2)`
##### Example Questions

Find the n^th fibonacci number.
##### Main Idea

Brute Force:
- Use recursion to compute
	- **Notice**: We repeat work when doing `F(5)` and `F(4)`
Improvement:
- Use memorization to cache results
Alternatively:
- We could use **Bottom Up Dynamic Programming** to solve this
	- What this looks like: Have a 1D array and use compute the `i`th number based on the `i-1`th and `i-2`th until we reach `n`
	- How can we optimize this further? 
		- **Notice**: After processing, we don't care about the stuff before the `i-2`th. So we can just have variables that track `i-1`th and `i-2`th instead!
##### Generalize 

- Come up with recurrence relation
- Memoization
- Use array to track past states
- Optimize further by noticing that only the last two states matter
#### ToDos

1. House Robber I - III
	1. [x] House Robber I
	2. [x] House Robber II
	3. [x] House Robber III
2. Maximum Alternating Sum
## 2. Kadane's Algorithim

Given an array, find a subarray with the maximum sum
##### Main Idea

Brute Force:
- `O(n^2)`
- Two for loops
Improvement:
- We can be greedy here, at any portion `i` we only need to determine whether it's more useful to use the sum we've computed for the contiguous array that MAY range from `0..i-1` or start fresh
	- The ONLY case when we'd want to start fresh is if that sum is negative
- Why can we do this?
	- At every point, we should update the maximum sum we've seen so far. This allows us to the hit if necessary with the hope that we'll find larger elements beyond index `i`
#### ToDos

- A tricky one that's always worth redoing: https://leetcode.com/problems/maximum-sum-circular-subarray/description/
## 3. 0/1 Knapsack

[Video Reference](https://www.youtube.com/watch?v=nLmhmB6NzcM)
##### Main Idea

You are given a bag with a capacity `k`. You have `n` indivisible objects with value `v` and weight `w`. You want to maximize the value of the objects that you can carry. 
- For each object, we can either include or exclude the object
	- Only 2 choices
- We want to maximize profit

**Brute Force:**
- `O(2^n)` where `n` is the input size. 
- We try all possible combinations and pick the best one
**Tabulation:**
- We can have a matrix of size `(n + 1) x (k + 1)` where `n` is the number of indivisible objects and `k` is the capacity of the bag. Let's call this table `V`. 
- The formula to fill out this table is:
	- `V[i, w] = max(V[i-1, w], V[i-1, w - W[i]] + P[i])`
		- Here `W` and `P` are the arrays that have the weight and profit respectively of the `ith` item at index `i`
		- Still the "we either take it or we don't" idea
- Time and Space Complexity are both `O(nk)` using the definitions from above
### 0/1 Knapsack ToDos

1. Canonical 0/1 Problems
	1.  ~~[416. Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/description/) 
	2. ~~[474. Ones and Zeroes](https://leetcode.com/problems/ones-and-zeroes/)
	3. ~~[494. Target Sum](https://leetcode.com/problems/target-sum/)`
	4. ~~[1049. Last Stone Weight II](https://leetcode.com/problems/last-stone-weight-ii/)
	5. ~~[1755. Closest Subsequence Sum](https://leetcode.com/problems/closest-subsequence-sum/)
		1. This was a [Meet In The Middle](https://usaco.guide/gold/meet-in-the-middle?lang=cpp) DP Problem
2. Counting 0/1 Knapsack
	1. ~~[879. Profitable Schemes](https://leetcode.com/problems/profitable-schemes/)
	2.  ~~[956. Tallest Billboard](https://leetcode.com/problems/tallest-billboard/)
	3. ~~[805. Split Array With Same Average](https://leetcode.com/problems/split-array-with-same-average/)
		1. Really hard - kinda like discrete but with dp
	4. ~~[1434. Number of Ways to Wear Different Hats to Each Other](https://leetcode.com/problems/number-of-ways-to-wear-different-hats-to-each-other/)
		1. Could also be considered Bitmask
3. Knapsack with Bitmask
	1. ~~[1799. Maximize Score After N Operations](https://leetcode.com/problems/maximize-score-after-n-operations/)
	2. ~~[1986. Minimum Number of Work Sessions to Finish the Tasks](https://leetcode.com/problems/minimum-number-of-work-sessions-to-finish-the-tasks/)
	3. ~~[2305. Fair Distribution of Cookies](https://leetcode.com/problems/fair-distribution-of-cookies/)
	4. ~~[847. Shortest Path Visiting All Nodes](https://leetcode.com/problems/shortest-path-visiting-all-nodes/)
	5. ~~[1723. Find Minimum Time to Finish All Jobs](https://leetcode.com/problems/find-minimum-time-to-finish-all-jobs/description/)
4. k-Way Bucket / Assignment / Partition DP
	1. k-Way Buckets
		1. ~~[473. Matchsticks to Square](https://leetcode.com/problems/matchsticks-to-square/description/)
		2. ~~[698. Partition to K Equal Sum Subsets](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/description/)
	2. Group / multiple-choice knapsack (pick exactly one per group)
		1. ~~[1981. Minimize the Difference Between Target and Chosen Elements](https://leetcode.com/problems/minimize-the-difference-between-target-and-chosen-elements/description/)
		2. ~~[2218. Maximum Value of K Coins From Piles](https://leetcode.com/problems/maximum-value-of-k-coins-from-piles/description/)
		3. ~~[1155. Number of Dice Rolls With Target Sum](https://leetcode.com/problems/number-of-dice-rolls-with-target-sum/)

## 4. Unbounded Knapsack

1. Unbounded Knapsack
	1. Core unbounded (min / max / count, order-insensitive)
		1. ~~[322. Coin Change](https://leetcode.com/problems/coin-change/)
		2. ~~[518. Coin Change II](https://leetcode.com/problems/coin-change-ii/)
		3. ~~[279. Perfect Squares](https://leetcode.com/problems/perfect-squares/)
		4. ~~[1449. Form Largest Integer With Digits That Add up to Target](https://leetcode.com/problems/form-largest-integer-with-digits-that-add-up-to-target/)
		5. ~~[343. Integer Break](https://leetcode.com/problems/integer-break/)
	2. Unbounded counting (order matters)
		1. ~~[377. Combination Sum IV](https://leetcode.com/problems/combination-sum-iv/description/)
	3. Unbounded-style counting DP (not knapsack by name, same instincts)
		1. ~~[139. Word Break](https://leetcode.com/problems/word-break/)
		2. ~~[91. Decode Ways](https://leetcode.com/problems/decode-ways/)

#### Knapsack Lessons

**ALWAYS** iterate downward when doing dp so we don't dogfood on our own computations.
##### 1. Canonical 0/1 Problem

- Don't be so rigid in your thinking. If state transitions don't naturally arise try and rethink the states.
	- [416. Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/description/) is a good example. The state transition here is pretty logical but requires a "reframing of the question" and is one that goes against the approach described in the tabulation section. 
		- Ignore past problems and just think about the states. Often times the naive/dfs approach will be immediately recognizable. Use that to optimize further.
		- [1049. Last Stone Weight II](https://leetcode.com/problems/last-stone-weight-ii/) is another good example.
	- A more general comment is to not go to deep into analyzing whether we can get `O(1)`. Code first optimize later.
- Another good trick is replacing the dp array with a dictionary. We'll need to be careful when doing updates while iterating however -- solution is usually making and then building a new dictionary that will have the correct state info after the iteration. 
###### 1.1 Meet In The Middle DP

- Traditional backtracking will TLE due to constraints (IE the `n` in `O(2^n)` is too large)
- Break it up into two pieces of equal size and do backtracking on those smaller pieces and return the results THEN do binary search after sorting one of the returned halves.
##### 2. Counting 0/1 Knapsack

- For harder dp problems, it's important to think about state compression and how we can represent the minimal amount of information needed at each state.
	- A great example is 956. Tallest Billboard](https://leetcode.com/problems/tallest-billboard/). My first instinct was to have states represented by `(sum(smaller), sum(taller))`. BUT since all we care about is the `sum(smaller)` WHEN `sum(smaller) == sum(taller)` we can be creative and just store the diff `d = sum(taller) - sum(smaller)` and map it to the `sum(smaller)`
		- Why couldn't we map the difference to `sum(taller)`?  HINT: Consider state updates
	- Another tricky example is [805. Split Array With Same Average](https://leetcode.com/problems/split-array-with-same-average/). 
		- If you think there is math involved, spend 5 minutes doing the work to verify or disprove. In this case, the optimal states become clear after doing some (not very apparent) mathematical pre-work.
##### 3. Bitmasking DP Tip
###### Submask Enumeration

Given a bitmask `m` we want to iterate over all submasks `s` of `m` in descending order:

```python
int s = m;
while (s > 0) {
	...you can use s
	s = (s - 1) & m;
}
```

Of course, we don't usually do this in isolation. We typically want to iterate over all masks AND their submasks. 

**Proof**

This has complexity `O(3^n)`:

Consider the `i`-th bit there are exactly three options for it:
- It is not included in the mask `m` and thus not in `s`
- It is in `m` but not `s`
- It is in both `m` & `s`

For each of the `n` bits there are 3 options for it.
###### A Worked Example: [1723. Find Minimum Time to Finish All Jobs](https://leetcode.com/problems/find-minimum-time-to-finish-all-jobs/)

We don't need DP for this we can use backtracking by having `(current_job: int, worker_to_job_time: List[int])` as our state and then:
- Eliminating duplication by sorting the `jobs` and stopping if we have a worker that has a job_time of 0 AFTER the backtracking work
- Pruning states by stopping if the current max_worker_time is larger than our global max
##### 4. 0/K DP (Partition to K Equal Subsets)

Two ways:
1. Backtracking
	1. Sort the input array and track whether a number has been visited. 
	2. Then use dfs on the array
2. Masks
## 5. Longest Common Subsequence (LCS)

[Video Explanation](https://www.youtube.com/watch?v=NnD96abizww)

**Problem**: Given two strings `s1` & `s2` what is their LCS?

This is a 2D DP problem. We can track states in the matrix `dp[n][m]` where `n = len(s1), m = len(s2)` 

State transitions look like:

`dp[i][j + 1] = max(dp[i - 1][j + 1], dp[i][j - 1]) if s1[i] != s2[j + 1]` 
`dp[i][j + 1] = dp[i - 1][j - 1] + 1 if s1[i] == s2[j + 1]` 
- `dp[i][j + 1] = max(top, left) if s1[i] != s2[j + 1]
- `dp[i][j + 1] == diag + 1 if s1[i] == s2[j + 1]`

What about finding the actual LCS not just the length?

Starting from `dp[n][m]` see where the value comes from, if it comes from the diagonal direction that index corresponds to a character in the LCS. This is way faster than storing the actual string LCS as a state.

The exact code looks like:

```python
i, j = n - 1, m - 1
rev_lcs = []
while i >= 0 and j >= 0:
	top = dp[i - 1][j] if i - 1 > -1 else 0
	left = dp[i][j - 1] if j - 1 > -1 else 0
	if str1[i] == str2[j]:
		rev_lcs.append(str1[i])
		i -= 1
		j -= 1
	elif top >= left:
		i -= 1
	else:
		j -= 1
rev_lcs.reverse()
lcs = "".join(rev_lcs)
```
### LCS Todos

1. ~~[1143. Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)
2. ~~[583. Delete Operation for Two Strings](https://leetcode.com/problems/delete-operation-for-two-strings/)
3. ~~[1092. Shortest Common Supersequence](https://leetcode.com/problems/shortest-common-supersequence/)
4. ~~[1035. Uncrossed Lines](https://leetcode.com/problems/uncrossed-lines/)
5. ~~[1458. Max Dot Product of Two Subsequences](https://leetcode.com/problems/max-dot-product-of-two-subsequences/)
6. ~~[97. Interleaving String](https://leetcode.com/problems/interleaving-string/)

## 6. Longest Increasing Subsequence (LIS)

**Problem**: Given an array, what's the LIS?

Solution can be formulated in a top-down approach where `lis[i]` represents the longest increasing subsequence ending at `i`

```python
N = len(nums)
lis = [1] * N
for i in range(N - 1, -1 , -1):
	for j in range(i + 1, N):
		if nums[i] < nums[j]:
			lis[i] = max(lis[i], lis[j] + 1)
	return max(lis)
```

This has TC `O(n^2)`

We can also this LIS with binary search in a much faster way. **TODO**

1. ~~[300. Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)
2. ~~[673. Number of Longest Increasing Subsequence](https://leetcode.com/problems/number-of-longest-increasing-subsequence/)
3. ~~[354. Russian Doll Envelopes](https://leetcode.com/problems/russian-doll-envelopes/)
4. [1626. Best Team With No Conflicts](https://leetcode.com/problems/best-team-with-no-conflicts/)
5. [1027. Longest Arithmetic Subsequence](https://leetcode.com/problems/longest-arithmetic-subsequence/)
6. [368. Largest Divisible Subset](https://leetcode.com/problems/largest-divisible-subset/)

##  7. Palindromic Subsequence

6. [516. Longest Palindromic Subsequence](https://leetcode.com/problems/longest-palindromic-subsequence/)
7. [647. Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/)
8. [1312. Minimum Insertion Steps to Make a String Palindrome](https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/)
9. [132. Palindrome Partitioning II](https://leetcode.com/problems/palindrome-partitioning-ii/)
10. [5. Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)
11. [1745. Palindrome Partitioning IV](https://leetcode.com/problems/palindrome-partitioning-iv/)

## 8. Edit Distance

1. [72. Edit Distance](https://leetcode.com/problems/edit-distance/)
2. [583. Delete Operation for Two Strings](https://leetcode.com/problems/delete-operation-for-two-strings/)
3. [712. Minimum ASCII Delete Sum for Two Strings](https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/)
4. [161. One Edit Distance](https://leetcode.com/problems/one-edit-distance/)
5. [1035. Uncrossed Lines](https://leetcode.com/problems/uncrossed-lines/)
6. [115. Distinct Subsequences](https://leetcode.com/problems/distinct-subsequences/)

## 9. Subset Sum

1. [416. Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/)
2. [494. Target Sum](https://leetcode.com/problems/target-sum/)
3. [698. Partition to K Equal Sum Subsets](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/)
4. [1049. Last Stone Weight II](https://leetcode.com/problems/last-stone-weight-ii/)
5. [473. Matchsticks to Square](https://leetcode.com/problems/matchsticks-to-square/)
6. [2035. Partition Array Into Two Arrays to Minimize Sum Difference](https://leetcode.com/problems/partition-array-into-two-arrays-to-minimize-sum-difference/)

