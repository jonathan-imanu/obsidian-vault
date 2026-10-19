## Q1.

There are $n$ students and $m$ parties. Each party has k students. For each student $i \in [n]$ let $p_i$ be the # of parties they attend. Show an efficient algo. that assigns ONE designated driver to each party, such that each student is DD at most ceil($\frac{p_i}{k}$ )
### Sol.

*Similar to bipartite matching*

We want to transform this into a max flow problem. Let's start by figuring out how to transform this Q. into a graph.

We can have 1 node for each student $s_i$ and 1 node for each party $t_i$:
- For each student, they have $p_i$ out-edges.
- For each party, it has $k$ in-edges.

An edge exists between $s_i$ and $t_i$ if the $i^{th}$ student attends the $i^{th}$ party. This edge $(s_i, t_i)$ has capacity 1.

We create two dummy nodes, $a$ & $b$ representing the source and sink respectively.

- Create edges $(a, s_i)$ with capacity $c(a, s_i) = ceil(\frac{p_i}{k})$ 
	- Dummy source to students
- Create edges $(t_i, b)$ with capacity $c(t_i, b) = 1$
#### Proof of Correctness

There is a non-integer flow of at most $m$.
- Send $\frac{p_i}{k}$ flow to each $i$ (non-integer potentially)
- each $s_i$ sends $\frac{1}{k}$ flow to each $t_i$
- each $t_j$ receives 1 flow
- t receives $m$ flow
## Q2.

We have a flow network where all edges have capacity exactly 1 and a $k \in \mathbb{N}$ that is at most the flow of the network. Design an efficient algo. that deletes $k$ edges to obtain a new network with a flow smaller by exactly $k$. Runs in $O(|V||E|)$

Input $(G, c, s, t)$

1. Run FF
2. Compute residual graph $G_f$
3. Take $A$ to be all vertices reachable from $S$, and $B$ to be all vertices $V \backslash B$ 
4. Remove $k$ outgoing edges from $A$ to $B$
5. Return Graph
