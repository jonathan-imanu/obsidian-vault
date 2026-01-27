# Reviewing Asymptotic Notation

For the below, $D$ is some common domain; either $\mathbb{N}$ or $\mathbb{R}^+$ 
### Big O

The most common. An upper bound.

$f \in O(g) \iff \exists c_0 > 0, \exists n_0 \in \mathbb{D}, \forall n \in \mathbb{D}, n \geq n_0 \rightarrow |f(n)| \leq c|g(n)|$
### Big Omega

A lower bound.

$f \in \Omega(g) \iff \exists c > 0,\ \exists n_0 \in D \ \text{s.t.}\ \forall n \in D,\ n \ge n_0 \Rightarrow |f(n)| \ge c|g(n)|$
### Big Theta

Tight bound. Think of this as the combination of Big O and Big Omega.

$f \in \Theta(g) \iff f \in O(g) \ \text{and}\ f \in \Omega(g)$
### Little O

Big O but a strict upper bound.

$f \in o(g) \;\;\Longleftrightarrow\;\; \forall c > 0,\ \exists n_0 \in D \ \text{s.t.}\ \forall n \in D,\ n \ge n_0 \Rightarrow |f(n)| < c|g(n)|$
### Little Omega

$f \in \omega(g) \;\;\Longleftrightarrow\;\; \forall c > 0,\ \exists n_0 \in D \ \text{s.t.}\ \forall n \in D,\ n \ge n_0 \Rightarrow |f(n)| > c|g(n)|$