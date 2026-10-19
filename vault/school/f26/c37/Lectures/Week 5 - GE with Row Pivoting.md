What if at some stage of the elimination, the pivot element (the changed element used as the denominator of the multipliers) is exactly zero?

**Example**

$$
A = \begin{bmatrix} 
	1 & 2 & 1 \\
	1 & 2 & 4 \\
	1 & 3 & 3 \\
\end{bmatrix} 
\newline
\newline

L= \begin{bmatrix} 
	1 & 0 & 0 \\
	-1 & 1 & 0 \\
	-1 & 0 & 1 \\
\end{bmatrix} 
\newline
\newline
L_1 A = \begin{bmatrix} 
	1 & 2 & 1 \\
	0 & 0 & 3 \\
	0 & 1 & 2 \\
\end{bmatrix} 
$$
We cannot use row $\hat{2}$ to eliminate $\hat{a_{22}}$ from row $\hat{3}$.
- To fix this, we can swap rows $\hat{2}$ and $\hat{3}$

**Permutation Matrix**: $$P_2(L_1,A) = \begin{bmatrix} 
	1 & 2 & 1 \\
	0 & 1 & 2 \\
	0 & 0 & 3 \\
\end{bmatrix} $$
A similar problem will occur if $\hat{a}_{22}$ is very small in magnitude but this will result in the remaining elements in the lower right corner of $L_2(L_1, A)$ are very large in magnitude.
- **Notorious for bad round off error properties**
- Round off error can be shown to be directly proportional to the largest elements that occur during the factorization.
### How do we solve when the pivot element is really really small in magnitude?

Such as:

$$
L_1 A= \begin{bmatrix} 
	1 & 2 & 1 \\
	0 & 10^{-16} & 2 \\
	0 & 1 & 3 \\
\end{bmatrix} 
$$

*We don't have to do anything but we should to avoid round off error propagation*

**Solution**: Row (partial) pivoting when eliminating the $k^{th}$ column.

When eliminating the $k^{th}$ column, first look for row $j$, $j > k$, with biggest element in magnitude $m$ column $k$, and then swap rows $j$ and $k$.
- In the previous example (where $\hat{a_{22}}$ was very small), as part of stage 2, first swap rows $\hat{2}$ and $\hat{3}$ so the really small element is a part of the pivot position.

So $$
P_2(L_1A)= \begin{bmatrix} 
	1 & 2 & 1 \\
	0 & 1 & 3 \\
	0 & 10^{-16} & 2 \\
\end{bmatrix} 
$$
$$L_2 = \begin{bmatrix}
1 & 0 & 0\\
0 & 1 & 0\\
0 & 10^{-16} & 1\\
\end{bmatrix}
$$

and

$$
L_2P_2L_1A = 
\begin{bmatrix}
1 & 2 & 1\\
0 & 1 & 2\\
0 & 0 & *\\
\end{bmatrix}
$$
#### Example

$$
\begin{bmatrix}
	2 & 6 & 6 \\
	3 & 5 & 12 \\
	6 & 6 & 12 \\
\end{bmatrix}
\begin{bmatrix}
	x_1 \\
	x_2 \\
	x_3 \\
\end{bmatrix}
=
\begin{bmatrix}
	20 \\
	25 \\
	30 \\
\end{bmatrix}
\iff
Ax = b
$$

**Stage 1**: Pivot (swap rows) by exchanging rows 1 and 3

$P_1Ax = P_1 b$ where
$$P_1 = 
\begin{bmatrix}
	0 & 0 & 1 \\
	0 & 1 & 0 \\
	1 & 0 & 0 \\
\end{bmatrix}
$$
So we have:

$$
\begin{bmatrix}
	6 & 6 & 12 \\
	3 & 5 & 12 \\
	2 & 6 & 6 \\
\end{bmatrix}
\begin{bmatrix}
	x_1 \\
	x_2 \\
	x_3 \\
\end{bmatrix}
=
\begin{bmatrix}
	30 \\
	25 \\
	20 \\
\end{bmatrix}
$$
So now the pivot element is the largest element in the column.

Now we want to subtract $\frac{1}{2}$ row 1 from row 2 and subtract $\frac{1}{3}$ row 1 from row 3.

So $$
L_1 = 
\begin{bmatrix}
	1 & 0 & 0 \\
	-\frac{1}{2} & 1 & 0 \\
	-\frac{1}{3} & 0 & 1 \\
\end{bmatrix}
$$

So we have $L_1 P_1 A x = L_1 P_1 b$

$$\rightarrow
\begin{bmatrix}
	6 & 6 & 12\\
	0 & 2 & 6\\
	0 & 4 & 2\\
\end{bmatrix}
\begin{bmatrix}
	x_1 \\
	x_2 \\
	x_3 \\
\end{bmatrix}
=
\begin{bmatrix}
	30 \\
	10 \\
	10 \\
\end{bmatrix}
$$

Now 

$$P_2 = 
\begin{bmatrix}
	1 & 0 & 0 \\
	0 & 0 & 1 \\
	0 & 1 & 0 \\
\end{bmatrix}
$$

So we have $P_2 L_1 P_1 A x = P_2 L_1 P_1 b$:

$$\rightarrow
\begin{bmatrix}
	6 & 6 & 12\\
	0 & 4 & 2\\
	0 & 2 & 6\\
\end{bmatrix}
\begin{bmatrix}
	x_1 \\
	x_2 \\
	x_3 \\
\end{bmatrix}
=
\begin{bmatrix}
	30 \\
	10 \\
	10 \\
\end{bmatrix}
$$

So $$
L_2 = 
\begin{bmatrix}
	1 & 0 & 0 \\
	0 & 1 & 0 \\
	0 & -\frac{1}{2} & 1 \\
\end{bmatrix}
$$
So we have $L_ 2 P_2 L_1 P_1 A x = L_2 P_2 L_1 P_1 b$:

$$\rightarrow
\begin{bmatrix}
	6 & 6 & 12\\
	0 & 4 & 2\\
	0 & 0 & 5\\
\end{bmatrix}
\begin{bmatrix}
	x_1 \\
	x_2 \\
	x_3 \\
\end{bmatrix}
=
\begin{bmatrix}
	30 \\
	10 \\
	5 \\
\end{bmatrix}
$$

Where $U = L_ 2 P_2 L_1 P_1 A$ is *upper triangular*

### How to extend a factorization when now pivoting is used to control round off error propagation?

**Fact**: $P_i P_i = I$

$$L_2 P_2 L_1 P_1 A = U$$
$$
\begin{align*}
L_2 P_2 L_1 P_1 A &\iff L_2 P_2 L_1 P_2 P_ 2 P_1 A \\
&\iff L_2 (P_2 L_1 P_2) P_ 2 P_1 A \\
\end{align*}
$$

Say $L_1' = P_2 L_1 P_2$ 

**Claim**: $L_1'$ is a "slightly modified" Gauss Transform

### What happens if at some stage $k$ of the elimination the diagonal and everything below it s exactly zero?

Jut pick stage $k + 1$ and proceed with the factorization as the $k^{th}$ column is already zero!
- However $a_{kk} \implies U$ is singular (non-invertible)
	- A zero in a diagonal entry means that our determinant will be zero