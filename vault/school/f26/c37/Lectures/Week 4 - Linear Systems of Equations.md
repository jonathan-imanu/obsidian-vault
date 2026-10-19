**Problem**: Solve $Ax = b$ for $x$ where $A \in \mathbb{R^{n \times n}}$, $x, b \in \mathbb{R^n}$ and $A,b$ are given.

To solve problems of this form, we will:
1. Reduce the problem to an equivalent one that is easier to solve
2. Solve the reduced problem

Generalizing to $n$ equations and $n$ unknowns:

**Step $n - 1$**

Assuming $a_{n - 1 - n - 1} \neq 0$ 

Multiply row $n - 1$ by $\hat{a_{n - 1 - n - 1} \neq 0}$ and subtract from $\hat{n}$ 

The result is an equivalent upper triangular system

**Everything above this is Gaussian Elimination then followed by Back Substitution. Just look this up. He just yapped.**

Another way of looking at this process:

**Step 1**: Clear the first column of $A$ below $a_{11}$ 
- This is done using the Gauss Transform Matrix

**Step 2**: Eliminate the second column of $L_1A$ below $\hat{a}_{22}$where $L_1$ was the first Gauss Transform matrix. We use $L_2$ another Gauss Transform matrix to do this.

...

## LU Factorization ($A = LU$)

We have 

$$
\begin{align*}
	A &= U \\
	&\iff A = L_{n - 1}^{-1}L_{n - 2}^{-1} \ldots L_2^{-1} L_1^{-1} U\\
	&= LU \text{ where L is lower triangular and U is upper triangular}
\end{align*}
$$

### Lemma 1

If $L_i$ is a Gauss Transform matrix, then $L^{-1}_{i}$ exists and is also a Gauss Transform. Furthermore, computing $L_{i}^{-1}$ is essentially free. 
- Proof of this will be on assignment 2.
- Answer is in the textbook. He let's you copy in from the suggested textbook lol.

### Lemma 2

If $L_i$ and $L_j$ are Gauss Transforms and $j > i$, then:
$$L_iL_j = L_i + L_j - I$$
Multiplication of Gauss Transforms is essentially is free.


We can then use $A = LU$ to solve $Ax = b$

$$Ax = b \iff LUx = b$$
1. Solve $Ld = b$ for $d$
2. Solve $Ux = d$ for $x$

We use LU factorization because if we are multiplying the same matrix $A$ with different RHS, we can reuse the work done to get $LU$

