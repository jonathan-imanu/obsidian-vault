The absolute value of the mantissa is always $\geq 0$ and $< 1$. 

The exponent is limited:

$-M \leq e \leq M$ where $M = (aa \ldots a)_b$ where there are $s$ $b$'s (using the exponent definition) and $a = b - 1$

$\mathbb{R}_b(t, s)$ is the set of all base $b$ FPs with absolute value inside these ranges. Overflow or underflow occurs whenever a nonzero FP# with absolute value outside of these ranges needs to be stored. 

While $\mathbb{R}_b(t, s)$ is finite, $\mathbb{R}$ is infinite. More precisely, $\mathbb{R}$ is compact whereas $\mathbb{R}_b(t, s)$ is not. 
- For example, there are no FPs between no consecutive FP#s whereas there is an infinite of reals between any two reals.

A real number $x = \pm (d_k d_{k - 1} \ldots d_0 . d_{-1} d_{-2} \ldots )_b$

The second $\ldots$ represents the fact that we could have a potentially infinite number of nonzero digits

We can represented this in $\mathbb{R}_b(t, s)$ by:
1. Normalizing the mantissa
2. Chop or round the mantissa
	1. Chopping: Truncate after digit $t$ of the mantissa
	2. Rounding: Truncate after digit $t$ of the mantissa, then round $D_t$ up or down depending on whether $D_{t+1} \geq \frac{b}{2}$ or $D_{t + 1} < \frac{b}{2}$ respectively.  

An alternative for rounding is always add $\frac{b}{2}$ to $D_{t + 1}$ then chop.

Steps 1 & 2 convert a real number $x \in \mathbb{R}$ to $Fl(x) \in \mathbb{R}_b(t, s)$ 
- Where $Fl$ represents a "float" operation where we map a real number to a floating number. 
	- Some hardware operation that converts a real to $\mathbb{R}_b(t, s)$ 

## Round Off Error (RO)

The difference between $x \in \mathbb{R}$ and $Fl(x) \in \mathbb{R}_b(t, s)$.
- Usually measured relative to $x$

$$\frac{x - Fl(x)}{x} = \delta$$ where $\delta$ is called the relative round off (RRO).

Alternatively this can be represented by:
$$Fl(x) = x(1 - \delta)$$

$\delta$ can be represented independently of $x$.
1. $\delta < b^{1 - t}$ for chopped normalized FP#s
2. $|\delta| \leq \frac{1}{2} b^{1-t}$ for rounded normalized FP#s

## Machine Arithmetic

Let $x,y \in \mathbb{R}$ and $F(x), F(y) \in \mathbb{R}_b(t, s)$. Consider $a \in \{ +, -, \cdot, \backslash \}$

The computer gives $Fl(Fl(x) \cdot Fl(y))$ for multiplication

## Machine Precision

The smallest non-normalized FP# eps such that $1 + eps > 1$ is called machine precision or machine epsilon.

eps is either:
- $b^{1 - t}$ for chopping
- $\frac{1}{2} b^{1- t}$ for rounding

Recall $\delta = \frac{x- Fl(x)}{x}$ is the RRO. So,
- $0 \leq \delta \leq eps$ is chopping
- $-eps \leq \delta \leq eps$ is rounding

**How is error really propagated in end of $a \in \{ +, -, \cdot, \backslash \}$?**

$$
\begin{align*}
	Fl(Fl(x) \cdot Fl(y)) &= [x(1 - \delta_1) \cdot y(1 - \delta_2)] \cdot (1 - \delta_3) \\
	&= (x \cdot y) (1 - \delta_1) (1 - \delta_2) (1 - \delta_3) \\
	&= (x \cdot y) (1 - \delta_1 - \delta_2 + \delta_1 \delta_2 - \delta_3 + \delta_1 \delta_3 + \delta_2 \delta_3 - \delta_1 \delta_2 \delta_3 ) \\
\end{align*}
$$

Because $|\delta < eps|$ and $\delta^2 << |\delta|$ and $\delta^3 <<< |\delta|$

So we can say that 

$$
\begin{align*}
	Fl(Fl(x) \cdot Fl(y)) &\approx (x \cdot y) (1 - \delta_1 - \delta_2 - \delta_ 3) \\
	&= (x \cdot y)(1 - \delta')
\end{align*}
$$

where $\delta' = 3 \text{ eps}$ 

Therefore machine multiplication is safe.

### Looking at Addition ($x + y$)

The computer gives use 

$$
\begin{align*}
	Fl(Fl(x) + Fl(y)) &= [x(1 - \delta_1) + y(1 - \delta_2)](1-\delta_3) \\
	&= x(1 - \delta_1)(1 - \delta_2) + y(1- \delta_2)(1 - \delta_3) \\
	&\approx x(1-\delta_1 - \delta-3) + y(1 - \delta_2 - \delta_3) \text{ since $|\delta| < eps \implies \delta^2 << |\delta|$ }\\
	&= (x + y)[1 - \frac{x}{x + y}(\delta_1 + \delta_3) - \frac{y}{x + y}(\delta_2 + \delta_3)] \\
	&= (x + y)[1 - \delta_+] \\
\end{align*}
$$

where 

$$
\begin{align*}
	|\delta_+| &\leq |\frac{x}{x + y}| 2 eps + |\frac{y}{x + y}| 2 eps \\
	&= \frac{|x| + |y|}{|x + y|}2eps
\end{align*}
$$

so 

$$
|\delta_+| \leq 2eps \text{ if $xy > 0$}
$$

$$
|\delta_+| \leq \frac{|x - y|}{|x + y|}2eps \text{ if $xy$ < 0}
$$

So when $x \approx -y$, the error toward for additions gets very large very quickly