# Week Notes

[Link](https://www.cs.utoronto.ca/~strider/docs/D84_Search.pdf)
### Intelligent Agent

An entity that:
- **Senses the Environment** using data it either obtains, perhaps with sensors, or is provided. 
- **Takes action in order to achieve a predefined goal.** 
	- Action means that the agent is able to affect the state of the environment
- **The Goal:** Defines what the agent is intended to achieve, and is usually encoded in the form of a function that the agent must either minimize or maximize. 

A smart thermostat and Tesla's autopilot are both examples of agents.

**Reactive Agents** act solely on environment conditions. The smart thermostat is an example of a reactive agent.
## Search Problems

**Method:** Given a problem, and a concrete definition of how a solution to this problem is specified, try out every possible solution until we find the best (or the correct) one.
#### Components of Search Problems

1. A definition of what a configuration or state for the problem we are solving looks like
	1. We must know what variables define our environment. 
		1. These variables are then called **state variables**. 
		2. Assignments to these variables are a **state** or **configuration** for this problem
2. A definition of how actions taken by taken either our or other agents affect the problem state
	1. Given the current configuration we can then determine the future configurations
	2. This can be deterministic or stochastic. 
		1. **Deterministic**: a transition function `T(s,a)` returning the next state of `s` given `a`
		2. **Stochastic**: a transition function `T(s,a,s_prime)` returning probability that the next state of `s` given agent action `a` will be `s_prime`
3. A definition of a goal state(s)

Search problems are naturally represented by *graphs*. The nodes represent possible configurations. 

We can of course use BFS and DFS to solve this.
### Uniform Common Search - Searching on Weighted Graphs

Like Dijkstra's: **Guaranteed to find the optimal path to a goal node** if such a path exists under the condition that all edge weights are greater than zero.

- Use a priority queue to keep nodes to visit 
- When expanding a node `v` that is not goal, for each neighbour `u` add it to priority queue with the cost to get to `u` from the start node. If `u` is already in the priority queue see if the path through `v` is cheaper and update if it is.
### Heuristic or A* (A-star) Search

Uses a heuristic function to guess which noes in the search tree are likely to be closer to a goal state in combination with the actual cost of getting to a node from the initial state. 

The **heuristic cost** used by **A**** search is `f(n) = g(n) + h(n)`

Where `f(n)` is the heuristic cost for some node `n`, and it consists of `g(n)` – the actual cost of reaching node `n` from the initial node, and `h(n)` a guess of the cost to get to [the/a] goal state from `n`.

*The algorithm is basically just UCS* but priority queue ordering is determined by `f(n)` rather than just `g(n)`

#### What makes a good heuristic?

In order for a heuristic to preserve the optimality guarantee of UCS, it must be **admissable**.

**Admissible Heuristic**: A heuristic `h(n)` is admissible if and only if:

$\forall n, 0 \leq h(n) \leq h^*(n)$

where $h^*(n)$ is the true cost of getting to the goal node from node $n$. **BUT we don't know $h^*(n)$ so this is tough!**

- An admissible heuristic is *optimistic* – it does not over-estimate the cost of getting to the goal
- If the heuristic is NOT admissible then the A* process can return a sub-optimal path.
### Bellman-Ford Algorithms 

#### What if there are negative weights?

This can happen if certain paths have rewards for our agent.

Can still get a optimal solution if there are no negative-weight cycles.
##### Why not get rid of the negative weights by adding a constant?

![[Weighted_Graph.png]]

Try running Dijkstra's starting at A. It won't find the shortest path to C even if we add 10 to each weight.
### Pseudocode

Dijkstra's fails on negative weight graphs because it's greedy and always chooses the lowest cost. *BF will use a DP approach to iteratively improve on the shortest possible path and will consider all edges in the graph at every iteration.*

```python
def bf(nodes, edges):
	n, m = len(nodes), len(edges)
	dist = [0] * n
	dist[0] = 0
	for i in range(1, n):
		dist[i] = float('inf') # lec notes say 1e10 but any large number works
	pred = [-1] * n
	
	for _ in range(n - 1):
		for (i, j), cost in edges:
			if dist[i] + w < dist[j]:
				dist[j] = dist[i] + w
				pred[j] = i

```

TC `O(NM)`
# Lecture Notes

# When Revising

## From Notes

Define a cost function for a realistic driving directions application which accounts for:

- Real-time traffic information (you must specify how this is encoded in the cost) 
- Real-time updates for accidents and other disruptions that may close-off streets 
- Intersections (cars do not move instantly from one street to the next, some intersections are worse than others) 

Given your cost function, suggest a heuristic that can be used to reduce the amount of search required to find a good rout
## From Lecture