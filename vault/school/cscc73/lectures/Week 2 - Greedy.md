# Lecture Notes

**Fundamental Principle**: Don't think more than one step ahead.
### Solving Gradient Descent

**Continuous optimization**: find a point $x \in R^n$ maximizing/minimizing some real function $f$
- Infeasible except for special cases, only works on special cases

To minimize, move locally down. 
#### Problem

Given $x_0, L, \epsilon \in \mathbb{R}$ where $\epsilon > 0$ and a real differentiable function $f$ whose derivative at an arbitrary point can be evaluated at unit cost.

We want to output $x^* \in I$ such that $| f(x^*) - f^* | \leq \epsilon$ where $f^* = min_{x ∈ I} {( f(x) )}$ and $I = [ x_0 - L , x_0 + L ]$

**Rough Algorithm**

Let $\delta = \delta(\epsilon), t = t( L, \epsilon)$
For $i = 0, \ldots, t-1$
	$x_{i + 1} = x_i - f^`(x) \dot \delta$
Output $x_t$

The overall algorithm runs in $O(t(L,ε))$ steps + time it takes to compute $t$ and $\delta$

**This doesn't work all the time.** 

For every $t, δ$, there exist $f$ and $(x_0, L, \epsilon)$, such that the output $y$ of $GD_{t, \delta}$
on input $(x_0, L, \epsilon)$ with access to $f’$ satisfies $| f(y) - f^* | > ε$ 
- Just saying for all inputs, there is some case where we violate the problem constraint

We can cook up quite a lot of inputs that make this fail.
### Convex Optimization

**Theorem:** Fix $r \in R$. Let $\delta = 0.5, t(L, \epsilon) = \gamma(r/\epsilon) \cdot L^21$ 

Let $f: R \rightarrow R$  be r-smoothly convex. Then the algorithm $GD_{t, \delta}$ solves the optimization problem for $f$. 
##### TODO: Finish proof from photo

### Interval Scheuduling

**Setup**

Think of a server scheduling requests that start at some time and take some time to process.

- For an interval $I \subseteq R$, denote $s(I) = min_{x \in I}(x)$ and $f(I) = max_{x \in I}(x)$
- A set of intervals $I_1, \ldots, I_n$ is valid if for each $i,j \in [n]$ we have $I_i \cap I_j = \emptyset$ 
	- Can only entertain one request at a time.

**Goal**

- Input: A set of intervals $S  = I_1, \ldots, I_n \subseteq [0, \infty]$
- Output: A valid $T \subseteq S$ such that $|T| = t^*$ where $t^* = max_{\textit{valid } T' \subseteq S} (|T'|)$
	- Just find the largest possible valid subset of intervals
	- Continuing with the server analogy, maximize the number of requests our server can handle. 
#### Slower Solution

Realize that simple greedy approaches don't work:
- take shortest
- take task that starts at the earliest time

*Take the task that finishes the earliest*

The algorithm consists of the following steps:

1. Sort the intervals $S$ by the right endpoints, in ascending order
2. Let $T = \emptyset$
3. For each interval $I \in S$ in ascending order
	1. If $T \cup {I}$ is valid, let $T = T \cup {I}$ 
4. Output $T$

It looks like it but this actually isn't linear TC (excluding the sort). This is because of the time it takes to check whether a set is valid which makes TC `O(n^2)`

The optimized version of this algorithm is `O(n log n)` with TC dominated by the sorting and non-sorting work only taking `O(n)`

This optimized version of the algorithm is:

1. Sort the intervals $S$ by the right endpoints, in ascending order
2. Let $T = \emptyset$, $J = [-2, -1]$
	1. As we see in 2. 
3. For each interval $I \in S$ in ascending order
	1. If $s(I) \leq f(J)$: let $T \cup {I}$ and $J = I$
4. Output $T$
##### Correctness

Let's start by proving the `O(n^2)` solution.

For ease, assume that we index the intervals $I_1, \ldots I_n$ are in the sorted order.

- Def: A set $O$ of intervals is optimal if $O$ is valid and $|O| = t^*$
- Def: For every $i \in {0,\ldots, n}$, let $T^I$ be the set of intervals the algorithm has obtained at each iteration $i$
- Def: We say that $T^i$ can be forward extended to a set $O$ if there is $S \subseteq { I_{i+1}, ..., I_n }$ such that $O = T^i \cup S$
###### Lemma

For every $i = 0, \ldots, n$, there is an optimal set $O^i$ such that $T^i$ can be forward extended to $O^i$ 

Prove with induction!

**Base Case:**  $T^0 = \emptyset$ so the claim trivially holds since all sets, including the optimal sets, are supersets of the empty set.

**Induction Hypothesis**: Assume that $T^i$ can be forward extended to an optimal $O^i$

**Induction Step**:

WTS: $T^{i + 1}$ can be extended to an optimal $O^{i + 1}$

**Case 1:** $T^{i + 1} = T^i$, that is to say that the interval $I_{i + 1}$ collides with some interval in $T^i$

Choose $O^{i + 1} = O^i$   then $T^{i + 1} = T^i \subseteq O^i = O^{i + 1}$ where  $T^i \subseteq O^i$ is an application of the IH. We want to show that $I_{i + 1} \notin O^{i + 1}$

Since the algorithm didn't add $I_{i + 1}$, it must intersect with some interval in $T^i$.   $T^i \subseteq O^i$ by IH. We chose $O^{i + 1} = O^i$  and since $O^{i + 1}$ is valid it must be the case that $I_{i + 1} \notin O^{i + 1}$

**Case 2**: $I^{i + 1} \in T^i \cap O^i$ 

Let $O^{i + 1} = O^i$. Since $O^{i + 1}$ only contains intervals from $T^i \cup {I_{i+1}, \ldots, I_n}$. Hence $T^{i + 1}$ can be extended to an optimal set $O^{i + 1}$

**Case 3**: $I_{i + 1} \in T^{i + 1} \backslash O^i$

Let $J \in O^i$ such that $f(J) > f(I_{i + 1})$ and $J$ has minimal endpoints among intervals in $O^i$. Let $O^{i + 1} = O^i \cup {I_{i + 1} \backslash {J}}$. Note that $O^{i + 1}$ is optimal since $|O^{i + 1}| = |O^i|$ 

*Claim*: $T^{i + 1}$ can be extended to $O^{i + 1}$

$T^{i + 1} = T \cup {I_{i + 1}} \subseteq O^i \cup {I_{i + 1}} = O^{i + 1} \cup {J}$

Since the algorithm considered $I_{i + 1}$ and not $J$ in iteration $i + 1$, $J \notin T^{i + 1}$ hence $T^{i + 1} \subseteq O^{i + 1}$ 

Sine $T$ can be extended to $O$

$O^{i + 1} = O^i \cup I_{i + 1} \backslash J \subseteq T \cup \{ I_{i + 1}, \ldots I_n \} \backslash \{J \}  \subseteq T^{i+ 1} \cup \{ I_{i + 1}, \ldots I_n \}$

Thus our claim holds.

*Claim*: $O^{i + 1}$ is valid

It suffices to prove that $I_{i + 1} \cap J' = \emptyset$ where $J'$ is defined as $\forall J' \in O^i \backslash \{ J \}$ 

Fixing such a $J'$, if $f(J') < f(I_{i + 1})$ then our algorithm considered $J$ in an iteration proceeding $I_{i + 1}$ 

Since $J' \in O^i$ and $O^i$ is valid then it means that $J$ is disjoint from all items in $T$, the algorithm added $J'$ to $T^j$ since we added $I_{i + 1}$ in iteration $i + 1$ then it must be the case that $I_{i + 1} \cap J' = \emptyset$ 

#### Optimized Interval Scheuduling

1. Sort the intervals $S$ by right endpoints, in increasing order
2. $T = \emptyset$, $I_{last} = [ -2, -1]$
3. For each interval $I \in S$ in sorted order,
	1. If $s(I) > f(I_{last})$: let $T = T \cup \{ I \}$ and let $I_{last} = I$
4. Output $T$

This new implementation runs in time $O(n log n)$
##### Proof of TC

We represent $T$ as an array of integers (indices of intervals in $T$) appearing after the input.
- Sorting the input can be done in time $O(n log n)$
- Loop has $n$ iterations
	- In each iteration, we compare constantly many integers and update constantly. Thus each iteration takes $O(1)$ time
##### Proof of Lemma

At iteration $i \in [n]$ of the algorithm, $T^{i - 1} \cup \{ I_i \}$ is valid iff. $s(I_i) > f(I_i)$, where $I_i$ is the last interval added to $T^{i -1}$ prior to iteration $i$
###### Proof of $\rightarrow$ 

Assume $T^{i - 1} \cup \{ I_{i}\}$ is valid. Since intervals are considered in ascending order of right endpoint, $f(I_i) \geq f(I_{last})$. Hence $s(I_i) > f(I_{last})$ as otherwise they would intersect. 
###### Proof of $\leftarrow$

Assume $s(I_i) > f(I_i)$. Since the algorithm considers intervals in ascending order of right endpoints, and $I_{last}$ was the last interval added to $T$. $f(J) \leq f(I_{last})$. $\forall J \in T^{i -1}, f(I_{last}) < s(I_i)$, hence $I_I \cap J = \emptyset, \forall J \in T^{i - 1}$  
### Independent Set

Input: graph $G = (V, E)$
Output: independent set $S \subseteq V$ such that $|S| = s^*$ where $s^* = max_{\textup{}}$
# Kleinberg & Tardos - MST Algorithms

## Problem

Given a set of vertices $V = \{v_1, v_2, v_3, \ldots v_n \}$ and a set of *positive weighted* edges $E$ find and return the set of least expensive set of edges $T$ ($T \subseteq E$) such that $G(V, T)$  is a connected graph. 
- It can be easily shown that $G(V, T)$ is a tree. 
	- **Brief Proof**: A tree is a connected graph without cycles. Consider $G(V, T)$. If there exists an edge $e$ that causes a cycle, removing this edge will result in a cheaper set of edges that are still connected. Therefore $T$ is not minimal which is a contradiction.
## Two Approaches

### Kruskal's Algorithm

1. Sort edges in ascending order based on cost
2. Initialize $T$ 
3. Iterate over each edge $e$
	1. If adding $e$ to $T$ causes a cycle, skip it
	2. Else, $T = T \cup e$

Actual Python Code:

```python

```

**TC**: 
### Prim's Algorithm

*This is kinda like Dijkstra's*

The minimum spanning tree is built gradually by adding edges one at a time. 

1. Choose a single vertex $v$ arbitrarily 
2. Choose the minimum weight edge outgoing from $v$ selected and add it to the spanning tree 
	1. Now spanning tree has $v$ and some other vertex $u$
3. Until we have $n -1$ edges, select and add the edge with minimal weight that connects one selected vertex with one unselected vertex. 

In the end the constructed spanning tree will be minimal. 

If the graph was originally not connected, then there doesn't exist a spanning tree, so the number of selected edges will be less than  $n - 1$ .

Actual Python Code:

```python

```

**TC**: 
#### When to use Prim's over Kruskal's

From this StackOverflow [thread](https://stackoverflow.com/questions/1195872/when-should-i-use-kruskal-as-opposed-to-prim-and-vice-versa):

> Prim's algorithm is significantly faster in the limit when you've got a really dense graph with many more edges than vertices. Kruskal performs better in typical situations (sparse graphs) because it uses simpler data structures.





