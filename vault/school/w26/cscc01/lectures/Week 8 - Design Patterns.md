## Design Principles vs Design Patterns

**Design principles** provide *high level guidelines* to design better software applications. They *don't provide implementation guidelines* and are not bound to any programming.

**Design patterns** provide *low level solutions* related to implementation of commonly occurring OO problems. They suggest a *specific implementation* for a specific OO programming problem.
# Design Patterns

## Singleton

A creational design pattern that ensures that a class has *only one instance and provides an easy global access to that instance*. It does not stipulate what to do with a singleton.

The main tenet is that any critical region must be entered serially.

Loggers, DB connections can all be implemented using singletons.
### When to use?

Use this when you want to control access to a shared resource. Use it sparingly and don't let it degenerate into global access for everything. 
### Design Considerations

- lazy construction vs eager loading
- thread safety
## Factory Method Pattern

A creational design pattern that lets us abstract out the creation logic of specific class instances. It provides a mechanism for creation of objects without exposing the
instantiation logic to the client.

There are two main and crucial points in understanding this pattern.
1. Objects are created by calling a factory method instead of calling a constructor.
2. Objects are created through an abstraction, not a concretion.

A factory method pattern can give us the ability to cache objects in the factory.
### When to use?

Whenever a caller can't anticipate the types of objects it must create.
## Builder Design Pattern

Builder is a creational design pattern that is used to encapsulate reusable logic of building
complex objects. 

Instead of having a constructor with many parameters, the Builder pattern lets you:
- Build an object incrementally
- Use method chaining for readability
- Create different representations using the same process
### When to use?

For complex objects.
## Strategy Design Pattern

A behavioral design pattern that lets you define a family of algorithms, encapsulate each one, and make them interchangeable at runtime

1. Strategy Interface: Defines a common interface for all algorithms.
2. Concrete Strategies: Different implementations of the algorithm.
3. Context: Holds a reference to a strategy and delegates work to it.
### Gang Of Four Design Patterns

Singleton, Factory Method pattern, Builder and Strategy are called the Gang of Four design patterns.
## Adapter

Existing object that provide functionality that client needs, but client code can’t use this object
because it expects an object with different interface.

Make an existing object work with client by adapting the object to client’s expected interface
Also called a wrapper as it wraps existing object.


