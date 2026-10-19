## Conditioning

How significant output changes when inputs change: $cond(f)$
- Error in output = $\_\_\_ \text{ } \text{error in input}$ 

Consider $x \text{ (desired input)}$, $\hat{x} \neq x$, $\hat{x} \rightarrow x$ so $x - \hat{x}$ is small

$$\begin{align} 
f(x) &= f(\hat{x} + (x - \hat{x})) \\
&= f(\hat{x}) + \frac{x - \hat{x}}{1!} \cdot f'(x) + \frac{(x - \hat{x})^2}{2!} \cdot f''(x) + \frac{(x - \hat{x})^3}{3!} \cdot f'''(x) + \ldots

\end{align}$$

Since $x - \hat{x}$ is small, we can say that, the above is roughly equal to:

$$\begin{align} 
f(x) &= f(\hat{x}) + (x - \hat{x})f(\hat{x}) \\
&\iff f(x) - f(\hat{x}) = (x - \hat{x}) f'(\hat{x}) \\
&\iff \frac{|f(x) - f(\hat{x})|}{|f(x)|} = \frac{|f(\hat{x})|}{|f(x)|} |x - \hat{x}|\\
&\iff \frac{|f(x) - f(\hat{x})|}{|f(x)|} = \frac{|f(\hat{x})|}{|f(x)|} |x - \hat{x}| \cdot \frac{|x|}{|x|}
&= \frac{|xf(\hat{x})|}{|f(x)|} \cdot \frac{|x - \hat{x}|}{|x|}
\end{align}$$

Notice that $\frac{|x - \hat{x}|}{|x|}$ is the error in input!

So therefore $cond(f) = \frac{|xf(\hat{x})|}{|f(x)|}$ 

### Worked Examples

Suppose $f(x) = \sqrt{x}$

$f'(x) = \frac{1}{2\sqrt{x}}$

So 

$$
\begin{align}
	cond(f) = \frac{x \cdot \frac{1}{2\sqrt{x}}}{\sqrt{x}} 
\end{align}
$$
## Vector Norm

Suppose $\vec{x}$ is an $n$ dimensional vector and $P > 0$: 

$\lVert \vec{x} \rVert_{p} = \left( \sum_{i=1}^{n} |x_i|^p \right)^{\frac{1}{p}}$

The most important norms are $P=1,2,\infty$.

$\lVert \vec{x} \rVert_{\infty} = max(|x_i|)$  

### Properties of Vector Norm

1. Norm is always positive and $\lVert \vec{x} \rVert_{P} = 0 \iff \vec{x} = \vec{0}$ 
2. $\lVert a \cdot \vec{x} \rVert_{P} = |a| \cdot \lVert \vec{x} \rVert_{P}$ Homogeneity
3. $\lVert x + y \rVert_{P} \leq \lVert \vec{x} \rVert_{P} + \lVert \vec{y} \rVert_{P}$ 

## Matrix Norm

Suppose $A$ is a $m \times n$ matrix

$\lVert A \rVert_{1} = \max(\text{column sum})$
$\lVert A \rVert_{2} = \sqrt{\lambda_{\max}(A^TA)}$
- The maximum eigenvalue
$\lVert A \rVert_{\infty} = \max(\text{row sum})$

- **TODO BEFORE MIDTERM -WTF IS MATRIX NORM**