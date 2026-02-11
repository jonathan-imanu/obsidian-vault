# FFT: Fast Fourier Transforms

We have two ways of representing polynomials:

1. Coefficients
2. Evaluations
	1. We need $n$ distinct points to uniquely represent a polynomial of degree at most $n - 1$
	2. Great for addition and multiplication of polynomials (given that all x's are the same)
## Idea

The idea is speeding up the multiplication. 

Given $p(x), q(x)$ in coefficient form and we want their product. The steps and TCs of the naive case are below:

1. Calculate $p,q$ for $n$ points to get $p$ & $q$ in evaluation form
	1. TC is $O(n^2)$
2. In evaluation form, multiply $p,q$
	1. TC is $O(n)$
3. We now have $pq$ in evaluation form
4. We transform $pq$ to coefficient form
	1. TC is $O(n^2)$
## $DFT_{n}$

### Input 

$p(x) = p_0 + p_1x + \ldots + p_{n-1}n^{n-1}$
$W = \{ \omega_{n}^{0}, \ldots, \omega_{n}^{n-1},\}$
- These are the n-th roots of unity
	- They are defined as $\omega_n = e^{2\pi i / n}, \qquad W_n = \{\omega_n^0, \omega_n^1, \ldots, \omega_n^{n-1}\}$

We split this up our polynomial into
$$p_{even}(x^2) = p_0 + p_2x + p_4x^2 + \ldots$$
$$p_{odd}(x^2) = p_1 + p_3x + p_5x^2 + \ldots$$
$$p = p_{even} + xp_{odd}$$
A property of the n roots of unity is that $W_{n}^2 = \{ \omega_{n/2}^0 \ldots \omega_{n/2}^{n/2 -1}\}$
##### Recursive Evaluation (FFT Step)

For $k = 0, \ldots, \frac{n}{2}-1$,

$$p(\omega_n^k) = p_{\text{even}}(\omega_{n/2}^k) + \omega_n^k\, p_{\text{odd}}(\omega_{n/2}^k),$$

$$p(\omega_n^{k+n/2}) = p_{\text{even}}(\omega_{n/2}^k) - \omega_n^k\, p_{\text{odd}}(\omega_{n/2}^k).$$

  

This gives

$$\mathrm{DFT}_n(p) = \bigl( \mathrm{DFT}_{n/2}(p_{\text{even}}) \;\pm\; \omega_n^k \mathrm{DFT}_{n/2}(p_{\text{odd}}) \bigr).$$









