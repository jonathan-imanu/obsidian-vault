## Weighted Interval Scheduling

#### Lemma 1

##### Claim

WIS(i) returns $w^*(i)$ & writes it at `opt[i]`
##### Proof 

By strong induction.
###### Base Case

When $i = 0$, follows from L3.
###### IS

Assume that our claim holds $\forall j < i$ (I.H)

By recursive formula:
- $w^*(i) = max(w(I_i) + w^*(p(i)), w^*(i - 1))$
	- We proved this before. 
	- The key is

By I.H, `opt[p(i)]` = $w^*(p(i))$ and `opt[i - 1]` = $w^*(i - 1)$ after L5 concludes. Hence L6 writes $w^*(i)$ in `opt[i]` and L7 returns it.

#### Lemma 2
##### Claim

$\forall i \in [n]$, WIS(i) is called at most once.
##### Proof

Observe that when WIS(i) is called, the algorithm, including all of the recursive calls only calls WIS with inputs smaller than i. For $i = n$, WIS(n) is only called in L8 and never again. For $i < n$, WIS(i) can only be called in L5. This only happens when `opt[i]` is undefined. But after calling WIS(i) once, `opt[i]` is defined by (by previous lemma). Hence WIS(i) is called at most once.

## Knapsack

Get recursive formula. Prove the recursive formula holds via an exchange argument. THEN correctness of the iterative case it obvious.
### Pseudopolynomial Time

Polynomial in $n$ and the number $W$ which can be thought of as a parameter. $W$ is represented as a binary string of length $\lceil \log_2(W) \rceil$. THEN a real polynomial time algorithm would run in time $poly(n \log W)$.  Thus our proposed algorithm is called pseudo-polynomial time. 

## Shortest Paths

### Setup 

- We have a directed graph $G = (V = [n], E)$
- Edges are weighted $w: E \rightarrow R$ 
	- We have negative edges
	- Cost of non-edges
#### Representation of Inputs

### SSSP: Bellman-Ford

- Fix $s \in [n]$
- For every $v \in [n]$, let $w^*(v) = dist(s, v)$
- For every $v \in [n]$ and $i \in [n - 1]$, let $w^*(i)$ be the minimal weight of a path from $s$ to $v$ of length at most $i$
#### **Lemma** 

For all $v \in [n],$ we have $w^*(v)= w^*(v, n-1)$
##### Proof

For every $s,t \in v$ there is a shortest path of length less than $n - 1$. 
