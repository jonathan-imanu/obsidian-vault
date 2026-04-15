# Polymorphism

*A programming language feature that allows values of different data types to be handled using a uniform interface.* 

There are a few different flavours of polymorphism:
1. **ad-hoc** polymorphism
2. **parametric** polymorphism
3. **subtype** or **inclusion** polymorphism
## Ad-Hoc Polymorphism

**This is function / method overloading.** Formally, we can define ad-hoc polymorphism as:

> A single function name refers to **different implementations depending on argument types**, where the implementations are **independent of each other**.

Polymorphic functions can be applied to arguments of different types. A polymorphic function denotes a number of distinct implementations depending on the type of argument(s).
- Includes operator overloading and user-defined operator overloading (like the + operator in cpp)

There is a uniform way to invoke the overloaded function, so from the compiler's POV, these are distinct functions with different signatures.

The compiler decides which function to call / execute based on the signature.

> When does the compiler/interpreter decide which function should be executed?

In compiled, statically typed languages, it happens at compile time.
Otherwise, in interpreted or dynamically typed languages it happens at runtime. 
## Parametric Polymorphism

A polymorphic function or polymorphic data type. It allows a function or datatype to be written generically but still handle values of different types in the same way and maintain full static type safety. 

> A function works **uniformly for all types**, and the type system guarantees this.

In OO languages, this is often called *generics*

Haskell and Java both offer this (in Java it's generic classes / methods) but Python does as through the `typing` module:

```python
from typing import TypeVar

T = TypeVar("T")
```

But this is mostly for static type checkers.

In general, it's fair to say that dynamically programming languages don't need this because the already allow for generic code.
## Subtype Polymorphism

This is also called **inclusion** polymorphism. 

It allows a function to be written to take an object of a certain type `T` but also work correctly if passed an object that belongs to a type `S` that is a subtype of `T` 
- Denoted as `S <: T`

Formally:

> If S <: T, then **any value of type S can be used wherever a value of type T is expected**.

In object oriented languages subtype polymorphism is offered using *subclassing or inheritance*.

> When does the compiler decide which method to execute?

At runtime. Calle dynamic dispatch or late binding.

In certain languages (like Python & C++) a subclass can have more than one superclass.

![[ClassDiagram.png]]

In some languages, this causes the **diamond problem**. This problem happens when a class inherits from two classes that share a common parent.

To illustrate this, suppose `Employee` implements `foo` and both `Consultant` & `Manager` override it. Whose implementation does `ConsultantManager.foo()` run? 

**This ambiguity is the diamond problem.** 

Python solves this with **MRO = Method Resolution Order** using depth-first left-to-right search to find the method to execute.

In our example above, the method executed would be the left parent (which depends on the order of base classes in the class definition).

> Java does not support multiple inheritance. How can we accomplish the same thing in Java?

With interfaces. A class can implement multiple interfaces. 


