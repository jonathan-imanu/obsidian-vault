# TLDR

The **topological sort** algorithm takes a directed graph and returns an array of the nodes where each node appears _before_ all the nodes it points to.

It's sorting based on in-degree of nodes. Cyclic graphs will not have a valid topological sort.
# Kahn's Topological Sort

**Kahn's Algorithm** works by repeatedly finding vertices with no incoming edges, removing them from the graph, and updating the incoming edges of the vertices connected from the removed removed edges. This process continues until all vertices have been ordered.

Use a queue to track nodes that got brought to 0

```python
def kahn_topo_sort(graph: dict[int[List[int]]]) -> List[int]:
	indegrees = defaultdict(int)
	for node, neighbours in graph.items():
		if node not in indegrees:
			indegrees[node] = 0
		for neighbour in neighbours:
			indegrees[neighbour] += 1
	
	q = deque()
	for node, count in indegrees:
		if count == 0:
			q.append(node)
	
	result = []
	while q:
		node = q.popleft()
		for neighbour in graph[node]:
			indegrees[neighbour] -= 1
			if indegrees[neighbour] == 0:
				q.append(neighbour)
		result.append(node)
	
	return result
```

