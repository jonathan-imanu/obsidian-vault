If you think that the optimal solution may involve DP and the pruning of states, we should always prefer BFS over DFS. Consider the problem presented by [847. Shortest Path Visiting All Nodes](https://leetcode.com/problems/shortest-path-visiting-all-nodes/).

DFS tends to visit longer path trees so early state pruning with an example such as:

```python
def shortestPathLength(self, graph: List[List[int]]) -> int:
	n = len(graph)
	if len(graph) == 1:
		return 0

	min_length = float('inf')
	cache = {}
	
	def dfs(node, mask, length):
		nonlocal min_length
		
		if mask == (1 << len(graph)) - 1:
			min_length = min(min_length, length)
			return
		elif length >= min_length: # pruning
			return
		for neighbour in graph[node]:
			nmask = mask | (1 << neighbour)
			nlength = length + 1
			key = (neighbour, nmask)
			if key in cache and cache[key] <= nlength: # pruning
				continue
			cache[key] = nlength
			dfs(neighbour, nmask, nlength)
	
	for start in range(len(graph)):
		dfs(start, 1 << start, 0)
	
	return min_length
```

Will be less effective than the analogous state tracking approach with BFS.

```python
def shortestPathLength(self, graph: List[List[int]]) -> int:
	n = len(graph)
	if n == 1:
		return 0
	total_masks = 1 << n
	all_mask = (1 << n) - 1
	q = deque()
	visited = [[False] * total_masks for _ in range(n)]
	
	for start in range(n):
		mask = 1 << start
		visited[start][mask] = True
		q.append((start, mask))
	
	length = 0
	while q:
		level_length = len(q)
		for _ in range(level_length):
			cur, mask = q.popleft()
			for node in graph[cur]:
				nmask = mask | 1 << node
				if nmask == all_mask:
					return length + 1
				elif visited[node][nmask]:
					continue
				visited[node][nmask] = True
				q.append((node, nmask))
		length += 1
	return length
```

- DFS TLEs
- BFS beats 99.49%

I think that this principle goes beyond DP can also be thought of `shortest path = bfs or Dijkstra`

