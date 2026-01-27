Given a problem:

1. Partition it into disjoint sub-problems (typically, of the same type)
2. Solve each sub-problem (typically, by recursion)
3. Combine the solutions

The creative part is how to divide and how to combine.

Two famous divide and conquer algorithms are quicksort and merge sort. 

## Integer Multiplication

Assuming we can't multiply integers, add or shift  integers at unit cost 

**Input**: Two integers $x = \sum_{i \in \{ 0, \ldots, n - 1\}} x_i \cdot 2^i$ and $y = \sum_{i \in \{ 0, \ldots, n - 1\}} y_i \cdot 2^i$ 
**Output:** The multiplication $x \cdot y$, where arithmetic is over the integers, represented by $2n-1$ bits

The basic grade school algorithm has TC $O(n^2)$
### Karatsuba's DC Algorithm

Simplifying assumption: $n$ is a power of two

**LSB comes first in this representation for whatever reason**.

The product $x \cdot y$ can be written as follows:
$$\begin{align*}
x \cdot y
&= \left(x_l + 2^{n/2} x_r\right)
   \left(y_l + 2^{n/2} y_r\right) \\[6pt]
&= x_l y_l
   + x_l y_r \cdot 2^{n/2}
   + y_l x_r \cdot 2^{n/2}
   + x_r y_r \cdot 2^{n} \\[6pt]
&= x_l y_l
   + \left(x_l y_r + y_l x_r\right) \cdot 2^{n/2}
   + x_r y_r \cdot 2^{n}
\end{align*}$$
#### First Attempt

- We can recursively compute Mult$(x_l, y_l)$, Mult$(x_l, y_r)$, Mult$(x_r, y_l)$, Mult$(x_r, y_r)$
- And then compute $x_l y_l \left(x_l y_r + y_l x_r\right) \cdot 2^{n/2} x_r y_r \cdot 2^{n}$ in $O(n)$ time
	- Remember that adding and shifting both take $O(n)$ time for an input with $n$ bits
- Our recursive tree will have depth $log_2 n$

The TC is $O(cn^2)$

We will quickly prove this:
##### Proof that the TC is indeed bad

There is $c > 1$ such that on length $n$ that is a power of two the algorithm runs in time at least $cn^2$.

Let $c = $
- Remark: While doing the proof, we initially left this blank and decided we'll get a good value later.
We prove by induction.

**Base Case**: $n = 1$

The algorithm runs in some constant time $c_1$. 
- Remark: At this point, we know we must choose a $c$ that is at least $c_1$

**Induction Step**

Assume the algorithm takes time $\geq cn^2$ on $n$-bit inputs. 
We prove it takes time $\geq$ $c(2n)^2$ on $2n$-bit inputs.
Since the algorithm calls itself 4 times on inputs of length $n$ & by the IH, its runtime is $4 \cdot cn^2 = c(2n)^2$
#### The Key Trick

$$\begin{align*}
x \cdot y
&= \left(x_l + 2^{n/2} x_r\right)
   \left(y_l + 2^{n/2} y_r\right) \\[6pt]
&= x_l y_l
   + x_l y_r \cdot 2^{n/2}
   + y_l x_r \cdot 2^{n/2}
   + x_r y_r \cdot 2^{n} \\[6pt]
&= x_l y_l
   + \left(x_l y_r + y_l x_r\right) \cdot 2^{n/2}
   + x_r y_r \cdot 2^{n} \\[6pt]
&= x_l y_l
   + \left((x_l + x_r) \cdot (y_r + y_l) -x_l \cdot y_l - x_r \cdot y_r \right) \cdot 2^{n/2}
   + x_r y_r \cdot 2^{n}
\end{align*}$$
The final step makes it such that we only have to do three multiplications!
- The key optimization here becomes clear when we look that the tree made by the recursive calls. We now have three recursive calls instead of 4!

##### Proving TC 

We want to prove that time algorithm runs in TC $O(n^{1 + log(3/2)})$ 

Let $c = c_1 + c_2$
- Remark: We left this blank
Let $c'= c_2$
- Remark: We left this blank

We prove by induction that $\forall n$ that are powers of two, the algorithm runs in time $O(n^{1 + log(3/2)}) - c'n$  

**Base Case**: $n = 1$

The algorithm runs in some constant time $c_1$
- Basic algebra will some that this holds

**Induction Step**

Assume the algorithm takes time $\leq c\cdot (2n)^{1 + log(3/2)} - c'n$  on $n$ bit inputs. 

Since the algorithm calls itself 3 times on inputs of length $n$ ($+ c 2n$ time for combining) & by the IH, it's runtime is 
$$\leq 3 \cdot cn^{1 + log(3/2)} - 3c'n + c_2n$$
$$= \frac{3}{2^{1 + log(3/2)}} c(2n)^{1 + log(3/2)} - (3c' -c_2)n $$
$$= c \cdot (2n)^{1 + log(3/2)} - c'(2n)$$

## Master Theorem(s)

**Informally:**

Let $T(n) = a \cdot T(n /b)$ + (relatively small "combine" runtime) then $T(n) = O(n^c)$ where $c = log_b(a)$



