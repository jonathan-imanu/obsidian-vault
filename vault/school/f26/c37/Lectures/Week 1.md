## An Overview of Floating Point Arithmetic

How do represent real numbers on a computer? 
- Consider $\pi = 3.14159...$ which has an infinite number of values to the right of the decimal place
	- The three dots here imply that the values are non-terminating and non-cycling
- Even numbers like $\frac{1}{10}$ cannot be represented because of the fact that we must first convert to binary

We have some initial round off errors
- These are usually measured as relative round off (RRO)

and then error propagation.

**Error Propagation Example**

Consider a 4 decimal digit mantissa computer with rounding.

$0.1234567 - 0.1234216 = 0.151 \times 10^{-4}$ in reality but on a 4 digit mantissa system, we can only store the first four digits so the computers answer is 100% RRO and wrong.

### Conditioning / Stability

A measure of how small changes in a function's ($f: \mathbb{R} \rightarrow \mathbb{R}$) input affect the final result.
- $cond(f) =$ condition of $f$ - The larger the condition the worse it is.

Stability refers to algorithms.
## Linear Systems of Equations 

**Problem**

$A \cdot x = b$ where $A \in \mathbb{R}^{nn}, b \in \mathbb{R^n}$
### Gaussian Elimination

One possibility is Gaussian Elimination (a direct method).

The process looks like factor $A = LU$ where $L$ is a **unit** lower triangle matrix and $U$ is an upper triangle matrix and both $L,U \in \mathbb{R}^{n \times n}$.

How do we use $A = LU$ when solving $A \cdot x = b$? 

$Ax = b \iff LUx = b$  

Let $d = Ux$:
1. Solve $Ld = b$ for $d$
2. Solve $Ux = d$ for $x$

$$ 
\begin{bmatrix} 1 & 0 & \ldots & 0 \\
	b_{21} & 1 & \ldots & 0 \\
	\ldots \\
	b_{n1} & b_{n2} & \ldots & 1 \\
\end{bmatrix} 
\begin{bmatrix} d_1 \\
d_2\\ 
\vdots\\
d_n \\
\end{bmatrix} 

= 

\begin{bmatrix} b_1 \\
b_2\\ 
\vdots\\
b_n \\
\end{bmatrix} 
$$
### Iterative Methods

As an alternative to direct methods:

Write $$A = L + D + U$$
$$
\begin{align}
	Ax = b &\iff (L + D + U)x = b\\
	&\iff (Lx + Dx + Ux = b \\
	&\iff Dx = b -(L + U)x
\end{align}
$$

*This last equation is a diagonal system!*

## Approximation / Interpolation

Problems that arise during data fitting.
- Find a line that goes through $\{ (t_0, y_0), (t_1, y_1)\}$ where the equation of a line is $a_0 + a_1t = y$

Find $a_0$ and $a_1$ such that:
- $a_0 + a_1t_0 = y_0$
- $a_0 + a_1t_1 = y_1$

We can also represent this as a matrix:

$$ 
\begin{bmatrix} 
	1 & t_0  \\
	1 & t_1 \\
\end{bmatrix}
\begin{bmatrix}
	a_0\\
	a_1\\
\end{bmatrix}
=
\begin{bmatrix}
	y_0\\
	y_1\\
\end{bmatrix}
\iff
A \cdot x = b$$
where $A \in \mathbb{R^{2 \times 2}}$ is given, $x,b \in \mathbb{R^2}$ and $b$ is given but $x$ is unknown.

Now consider if we have to find a line that goes through $\{ (t_0, y_0), (t_1, y_1), (t_2, y_2)\}$ where the equation of a line is $a_0 + a_1t = y$.

We want to find $a_0$ and $a_1$ such that:
1. $a_0 + a_1t_0 = y_0$
2. $\ldots$
3. $\ldots$

The equivalent matrix is:

$$ 
\begin{bmatrix} 
	1 & t_0  \\
	1 & t_1 \\
	1 & t_2 \\
\end{bmatrix}
\begin{bmatrix}
	a_0\\
	a_1\\
\end{bmatrix}
=
\begin{bmatrix}
	y_0\\
	y_1\\
	y_2\\
\end{bmatrix}
\iff
A \cdot x = b$$
This is almost equivalent to the problem we had above:

where $A \in \mathbb{R^{3 \times 2}}$ is given, $x\in \mathbb{R^2}$is unknown, and $b \in \mathbb{R}^3$ is given.

**These examples where $A$ is nonsquare it seems like it will not have a solution unless the points are colinear!**
- Nonsquare matrices have two forms:
	- *Overdetermined systems:* More rows than columns
		- No unique solution in general but we can still find a "best possible solution"
	- *Underdetermined systems*: More columns than rows
		- Typically have an infinite number of solution