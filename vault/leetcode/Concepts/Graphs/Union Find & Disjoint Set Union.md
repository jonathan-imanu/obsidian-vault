TLDR: Given objects that relate to each other in some way and we want to repeatedly group them together based on some heuristic. Best example is finding a redundant connection in a graph.

```python
parent = list(range(len(edges) + 1))
rank = [0] * (len(edges) + 1)

def find(i):
	if parent[i] != i:
		parent[i] = find(parent[i])
	return parent[i]

def unionByRank(i, j):
	irep = find(i)
	jrep = find(j)
	if irep == jrep:
		return False
	if rank[irep] < rank[jrep]:
		parent[irep] = jrep
	elif rank[irep] > rank[jrep]:
		parent[jrep] = irep
	else:
		parent[jrep] = irep
		rank[irep] += 1
	return True
```

$O(\alpha(n))$ amortized time per operation, where $\alpha(n)$ is the inverse Ackermann function and can be thought of to be a constant.