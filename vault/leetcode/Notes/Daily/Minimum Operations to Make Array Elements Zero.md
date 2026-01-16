**Status:** No idea where to even start :(
**Solution:** Only after reading editorial

**Hindsights**

- The choice of numbers here should always lead to an analysis if binary can help here. This is because `4 = 2^2`

**Problem Solving Steps**

1. Dividing by two <=> shifting to the right by two in binary
2. So if `x` is the binary length of a number, then `ceil(x / 2)` is the number of operations needed to take that number to zero
3. For a specific query `q = [l, r]` the total number of operations is `ops([r, 1]) - ops([l - 1, 1])`. Where we use math to find the `ops[x, 1]`

Let's start with `ops([x, 1])`

```python

# Number of operations needed to reduce range [x, 1] to 0
def get_ops(self, x: int) -> int:
	count = 0
	base = 1
	binary_length = 1
	while base <= x:
		ops_for_binary_length = (binary_length + 1) // 2
		# the (...) is the # of #'s in the interval [base, base * 2 - 1]
		count += ops_for_binary_length * (min(base * 2 - 1, x) - base + 1)
		base *= 2
		binary_length += 1
	return count

```

Now putting it all together:

```python
def minOperations(self, queries: List[List[int]]) -> int:
	ops = 0
	for q in queries:
		ops += (self.get_ops(q[1]) - self.get_ops(q[0] - 1) + 1) // 2
		return ops
```
