We want to show that Gradient Descent does not hold over all functions. 

For an algorithm $GD_{t, \delta}(x_0, \epsilon, l)$ we aim to output $x^*$ which is where the minimum value within the range $[x_0 - l, x_0 + l]$ occurs.

We want to show that:
$$\forall t, \delta, \exists f, x_0, \epsilon, L, |f(x^*) - f^*| > \epsilon$$

