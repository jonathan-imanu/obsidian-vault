# Week Notes

**A subset of search problems related to finding some assignment that satisfies a variety of constraints**
- Such as how the university builds out it's timetable and room assignments or sudoku.
### Components of a CSP

- A **set of variables** whose values are to be set
- The **domain** for each of the variables
	- Must be *finite and discrete-valued*
- A set of **constraints** on either individual variables or subsets of variables that help determine which value assignments are **valid** and which are not.
- Constraints can be **unary** (apply to a single variable) or **higher order** (relating 2+)

Commonly represented as a graph with nodes corresponding to variables and edges corresponding to constraints.
- There are multiple ways of framing a problem and this affects the computation of a CSP.
	- Consider mapping courses to time slots or time slots to courses

A simple approach is just backtracking. Typically called *backtracking search*
##### Bookkeeping

We can speed up the naive approach by doing some *bookkeeping*. Bookkeeping would result in us constraining the set of valid choices for neighbours of `v` based on our choice for `v`.

> Recall the map colouring problem: "Given a map of Europe, with colours {R,Y,G,B}, colour the map such that no neighbouring countries share the same border."
> 
> So in this case, if we colour Italy with Red then it's neighbours should not have Red as an option. Can do this with sets.

#### Heuristics to Speed Up Backtracking Search

To be applied in order:

1. Choose the variable with the *fewest remaining values* first
	1. Whenever a set is empty, we have to backtrack immediately
	2. Speeds up by reduces fruitless work within subtrees and reducing the branching
2. If there's a tie in **1.**, choose the variable involved in the *largest number of active constraints*. IE the variable that places the most constraints on others
	1. Speeds up by reducing branching factor for succeeding levels in the search tree

If there is a tie by rules **1.** and **2.**, can choose from the tied variables arbitrarily.

3. Given a choice of a variable to expand (IE assign a colour to a country NOT pick a country), choose first the least constraining value

Even with these heuristics, TC is still $O(d^n)$ for a CSP with $n$ variables and a domain $d$
### Tree Structured CSPs

**A CSP whose constraint graph has no loops is a tree-structured CSP.**
- Can be solved in $O(Nd^2)$

1. Choose a root variable and perform topological sort so the children of each node appear after their parent. Initialize the set of valid values for each variable in the CSP.
2. Backward (first) pass
	1. Check the parent of each node and remove any values that would make the constraints in the problem not valid
3. Backtracking search (second, forward pass) 
	1. The search will not backtrack because any value chosen for a parent is consistent with the constraints on the children.

> What does it mean if at some point while removing possible values from a parent node’s list, that list becomes empty?

No solution exists. 
### Cutset Conditioning

A way of using the tree structured CSP algorithm on non-tree constraint graphs by *assigning values to a subset of variables so that we can disconnect them from the rest of the CSP*.  Since  we assigned values arbitrarily to some subset of variables and there’s no guarantee that the initial assignments to these variables still allow for a solution to the CSP to be found.

Hence we have to try all possible combinations of variables that are included in the subset. Thus TC becomes $O(d^k (N-k)d^2)$
### Iterative Methods and Approximate Solutions to CSPs

If solving a CSP is too expensive and we want a fast "good enough" solution
#### Local Search: Simplest and Most General

```
Randomly generate a full assignment of values to variables in the CSP 

its=0 
while its < MAX_ITERATIONS
	let v be a randomly picked varible with conflicts 
	new_v := a randomly chosen new value for v
	
	if is_solution(new_v): 
		STOP
	
	if broken_constraints(new_v) < broken_constraints(v):
		set v = new_v
	its ++
```

Called local search since *at each step only one variable changes value so each successive guess at a solution is close in solution space to the previous one*. Looking around the *neighbourhood of possible solutions* from where we currently are.

Also called hill climbing.

We can get stuck at a local minimum! 
##### Improving Local Search

1. Running it $k$ times and keeping the best result
2. **Deterministic Annealing**, it is a variation of local search that allows the process to keep a solution even if it is worse than the current one with some probability.
3. **Beam search/Taboo search**, keep track of multiple guesses found in the search process and attempt to maximize the chance of finding a good solution.
4. **Genetic algorithms**
# Lecture Notes

# When Revising
