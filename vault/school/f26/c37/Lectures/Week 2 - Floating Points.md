Binary representation of floating point numbers:
- We have a finite number of digits to the left of the base point

If $x \in \mathbb{R}$ then, $x = \pm (x_I + x_F)$ where
- :$x_I$ is the integral part is finite and is a non-negative integer
- $x_f$ is the fractional point and can have an infinite number of digits

The sign in a real number can be stored in a singular bit.

For a base $b$ system, 
$$
\begin{align}
x_f &= (d_{-1}d_{-2}d_{-3} \ldots)_{b} \\
&= d_{-1} \cdot b^{-1} + d_{-2} \cdot b^{-2} + d_{-3} \cdot b^{-3} \\
&= \sum_{\infty}{i = 1} d_{i}b^{-i} \\
\end{align}
$$

## Note

A terminating binary fraction with $n$ digits has a terminating decimal fraction representation. The reverse may not be true. 
# Converting Decimal Fractions Binary

For the integral part, we can repeatedly divide by 2 and keep track of the remainder and resulting quotient until we reach zero.

For the decimal part, we repeatedly multiply by 2. 

### Worked Example

#### How to represent $(0.625)_{10}$ in Binary

Multiplier Base Product Integer | Fractional
0.625 2 1.25 1 | 0.25
0.25 2 0.5 0 | 0.50
0.5 2 1.0 1 | 0

so the representation is $(.101)_2$

**If we used this technique to represent $(0.1)_{10}$, we would have a non-terminating binary equivalent!**

# Machine Representation of Reals

Called floating point numbers when represented on a computer.

A floating point number in base $b$ has the form:

$$x = (f)_b \cdot b$$

## Definitions 

A floating point number in base $b$ has the form: $x = (F)_b \cdot b^{e_b}$

The mantissa $F = \pm(.d_{1}d_{2} \ldots d_t)_b$ - $t$ digits
The exponent $e = \pm(c_s c_{s - 1} \ldots c_1)_b$ - $s$ digits

A floating point number is **normalized** if $d_1 \neq 0$ unless $d_1 = d_2 = \ldots = d_k = 0$

**Significant digits** of a non zero floating number are the digits following and including the first non-zero digit.
- A normalized FP has all digits in the mantissa being significant

