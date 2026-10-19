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
### Default Interface Methods

Unlike regular interface methods, there are specified with the `default` keyword at the beginning and they provide an implementation.

```java
public interface MyInterface { 
	// regular interface methods 
	default void defaultMethod() { 
	// default method implementation 
	} 
}
```

### Interface BiFunction<T,U,R>

A typing contract for functions that specifically designed for functions who allow lambdas or method references of a specific type to be passed down. 
- `T`: the type of the first argument to the function
- `U`: the type of the second argument to the function
- `R`: the type of the result of the function

#### BinaryOperator

Just a specialized BiFunction that takes `T` as type of argument 1 and argument 2 and returns a result of type `T`.

