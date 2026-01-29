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
- We make $a$ recursive calls, at each recursive call we divide the input by $b$
	- So at the $i$th level, we make $a^i$ recursive calls with an input size of $n / b^i$ 
	- We need to hit $\log_b{n}$ levels before reaching a constant size problem
	- We only care about the last level since it dominates

Here's some work showing that the sum of costs from the last level of the recursive tree will be equal to 

$(\frac{a}{b})^{log_b(n)} \cdot c \cdot n$
$= b^{log_b(\frac{a}{b}) \log_b(n)}$ 
$= c \cdot n^{\log_b(\frac{a}{b})}$
### Formally

For $a,b,d,e \leq 1$, let $T: N \rightarrow N$ such that $T(n) \leq a \cdot T(\ceil{n / b}) + e \cdot n^d$ for any sufficiently large $n$. Let $c = \log_b(a)$.

1. If $c$ > $d$, then $T(n) = O(n^c)$
2. If $c = d$, then $T(n) = O(n^c \cdot \log(n))$ 
	1. This is the annoyingly tight case
3. If $c < d$, then $T(n) = O(n^d)$ 

##### Using the Master Theorem with Merge Sort

We make two recursive calls to input length $n / 2$. So $a = 2$ and $b = 2$. Thus $c = \log_2(2) = 1$.
The combine step is in linear time, therefore $d = 1$. 

By the master theorem, this has running time $O(n \log n)$.
## Matrix Multiplication

#### Approach 1: Brute Force

**Input**: Two matrices $A$ and $B$ of size $n \times n$, each with $n^2$ elements. 
**Output**: $C = AB$, an $n \times n$ matrix

We know that an element of $C$, call it $c_{ij} = \sum a_{ik} \cdot b_{kj}$ 
- This takes time $O(n)$ for $n$ multiplications and additions
- We have $n^2$ elements to figure out 
- Thus the total brute force TC will be $O(n^3)$
#### Approach 2: A Bad Divide & Conquer

We assume that $n = 2^x$ for some integer $x$

The idea is we divide the matrix into four quadrants.

Then we can join them back up with

$C = (A_{11}B_{11} + A_{12}B_{21})$

## Polynomials

We care about univariate complex polynomials. These are defined like: $p(x) = \sum_{i = 0}^{d} c_i \cdot x^i$ 
#### Fundamental Theorem of Algebra

A polynomial of degree $d$ either is constantly zero or has at most $d$ roots.
##### Cor. 

For every distinct $x_1 \ldots x_{d+1} \in \mathbb{C}$ and every $y_1 \ldots y_{d + 1} \in \mathbb{C}$ there <u>exists</u> a <u>unique</u> polynomial of degree at most $d$ such that $p(x_i) = y_i \forall i$

**Proof**

There exists a $p(x) = \sum_{i \in [d + 1]} y_i \cdot \prod_{j \in [d + 1] \ i} \frac{x - x_i}{x_i - x_j}$ 
- The part of $\prod$ is a function that gives 1 for $x_i$ and 0 for $x_j$ when $j \neq i$ 

Let $p_1$ and $p_2$ be two degree $d$ such that $p_1(x_i) = p_2(x_i) = y_i \forall i$ 

Define $p(x) = p_1 + p_2$ THEN:
1. $deg(p) \leq d$ 
2. The number of roots of $p$ is at least $d + 1$

But this violates the FTA! So $p(x)$ must be constantly zero. So there can only be one polynomial of at most $d$ such that $p(x_i) = y_i \forall i$.
#### Eval. Representation

Fix distinct $x_0 \ldots x_{n - 1}$. Then let the $(x_0, y_0)$ pair mean that $y_0$ is the value of the polynomial at $x_0$. 
- We know how to represent things in coefficient representation.

### The Evaluation Problem

### The Interpolation Problem

## DFT

#### Naive Attempt 1
