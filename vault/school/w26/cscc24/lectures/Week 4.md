## Tail Recursion

A recursive function whose last statement is it's recursive call. IE it returns a recursive call to itself so there is nothing left to do in the function.

These are better than non-tail recursive functions since they can be optimized by a compiler. **BUT** it is up to the compiler/interpreter of the particular language to determine whether or not the recursive calls in a tail recursive function actually use an extra stack frame for each recursive call to the function.
- Python doesn't do tail call optimization
