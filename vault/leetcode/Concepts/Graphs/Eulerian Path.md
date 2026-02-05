A traversal on a graph that uses all available edges.

If we want to find a path that uses all available edges, we can use Hierhozeler's algorithm:

```python
graph = buildGraph
route = []

# build route in reverse order
def dfs(start):
	while graph[start]:
		dfs(graph[start].pop())
	route.append(start)

return route[::-1]
```

This will correctly build the route in reverse order.


