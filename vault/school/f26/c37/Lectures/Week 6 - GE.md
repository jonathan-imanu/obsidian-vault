## Numerical Singularity (v.s Exact Singularity)

During numerical factorization in a FPS usually cannot expect *exact* zeros but *"near singular"* if all elements below the diagonal in column $k$ (and $\hat{a_{kk}})$) at the $k^{th}$ stage one of magnitude:
### Complexity of Gaussian Elimination

We will count multiplication / addition pairs (FLOP). The FLOP is the most expensive operation (much more expensive than comparison) so we are counting FLOPs only.
### Computing the LU Factorization

At the first stage, every element in the $n-1 \times n - 1$ sub-matrix has been transformed. So $(n - 1)^2$ FLOPS
At the second stage, every element in the $n-2 \times n - 2$ sub-matrix has been transformed. So $(n - 2)^2$ FLOPS
$\ldots$
At the $n-1$ stage, we have 1 FLOP

So we have:
$$(n - 1)^2 + (n - 2)^2 + \ldots + 1$$
$$\rightarrow \frac{n(n - 1)(2n - 1)}{6} = O(n^3)$$
In Hybrid notation, we have:
$$\frac{n^3}{3} + O(n^2)$$

Computing Forward state $Ld = b$

## Round Off Error Analysis of GE