### Big O

$$ f(n)=O(g(n)) \iff \exists c>0,\exists n_0>0,\ \forall n\ge n_0: \quad 0\le f(n)\le c\,g(n)$$

### Big Omega

$$f(n) = \Omega(g(n)) \iff \exists c > 0, \exists n_0 > 0, \forall n > n_0: 0 \leq cg(n) \leq f(n)$$

### Big Theta

$$f(n) = \Theta(g(n)) \iff \exists c_1, c_2 > 0, \exists n_0 > 0, \forall n > n_0: 0 \leq c_1 g(n) \leq f(n) \leq c_2(g(n))$$

## Applications 

Finding a pair for $c$ and $n_0$

$$f(n) = n^3 - n^2 + 5 \in O(n^3)$$

So 

$$
\begin{align*}
    f(n) &\leq n^3 + 5 && \text{since } n > 0\\
         &\leq n^3 + 5n^3\\
         &= 6n^3
\end{align*}
$$

So $n_0 = 1$ and $c = 6$

