[Video Explanation](https://www.youtube.com/watch?v=Dq_ObZwTY_Q)

Given a stack `S` and an array `A`, we want to maintain the invariant (for a decreasing monotonic stack) that from bottom to top _values are strictly decreasing_.

- I.E. `S[0] > S[1] > ... > S[-1]`

The code looks something like this for the decreasing monotonic stack above:

```python
n = len(nums)
stack = []

for i in range(n - 1, -1, -1):
	while stack and nums[i] >= stack[-1]:
		stack.pop()
	# stack[-1] represents the next greater element of nums[i]
	# the invariant that the stack is in descending order holds at all times
	stack.append(nums[i])
```

## Practice Problems

- [503. Next Greater Element II](https://leetcode.com/problems/next-greater-element-ii/)
- [739. Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)
