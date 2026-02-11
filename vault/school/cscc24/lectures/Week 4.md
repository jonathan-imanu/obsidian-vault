## Tail Recursion

A recursive function whose last statement is it's recursive call. IE it returns a recursive call to itself so there is nothing left to do in the function.

These are better than non-tail recursive functions since they can be optimized by a compiler. **BUT** it is up to the compiler/interpreter of the particular language to determine whether or not the recursive calls in a tail recursive function actually use an extra stack frame for each recursive call to the function.
- Python doesn't do tail call optimization
# Modern Java Features
### Streams

`.stream()`

**A pipeline of elements from a source where elements are computed on-demand**

Stream operations are either intermediate or terminal:
- Intermediate streams operations create another stream
- Once a terminal stream operation runs, the stream is consumed and invalid

These are kinda like generators in Python. 

### Lambda

Has the general syntax: `(parameters) -> { statements; }`

### Method References

Passing existing named functions from instances/classes in the same context that we would use a Lambda. Can be used anywhere a functional interface is wanted.

Syntax: `Class::methodName`