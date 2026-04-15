## Types

**Basic**

- `()` - the only member is `()`
	- Called the unit
- The standard Bool, Int, Float, Char

Also have:

- `(<type0>, <type1>, ..., <typen>)` tuples
- `[<type>]` lists
- `<input-type> -> <output-type>`

Declaration is straightforward: `⟨name⟩ = ⟨expr⟩`

**Functions**

`func arg = decl.` or `func (arg1, ..,argn) = decl.`
- Anonymous functions have the typing `\⟨arg⟩ -> ⟨body⟩`.

The typing of functions is determined by their input and output 
- If the type is dependent on the input, then it's parametric and denoted with `p`

## Useful Syntax Tidbits

### `let ... in ...`

```haskell
let
  definitions
in
  expression
```

Semantically, the definitions are **bound for use inside the expression after in.** Useful for writing tail-recursive functions. 
### **`where`**

An alternative to `let ... in ...` is bound to a surrounding syntactic construct. 
### Type Synonyms

`type NewType = OldType`
- NewType becomes an alias (a synonym) for the existing type OldType.
### User Defined Datatypes

**Type Constructor**: This creates types
**Data Constructor**: This creates values of a type

```haskell
data NewType = 
	Cons1 Type1 
	| Cons2 Type2 
		... 
	| ConsN TypeN
```

- `Type1,...,TypeN` are previously defined types.
- `Cons1,...,ConsN` are constructors. They are used to create a value of NewType type.

All constructors are constants. We can use `|` to create a union of different types.

Datatypes can be recursive:

```haskell
data LList = Nil | Node (Int, LList) deriving Show

-- a polymorphic / generic linked list

data LList a = Nil | Node (a, LList a) deriving Show
```
#### Curried Type / Value Constructors

Since type/value constructors are simply function, they may be curried.

```haskell
data BTree a = Empty | Node (a, BTree a, BTree a)

data BTree a = Empty | Node a (BTree a) (BTree a) -- the curried version
```
## Pattern Matching & Guards

### Pattern Matching

Like `switch` in C++ or `match` in Python but on the structure of an expression.

The best intuition is just that pattern matching "destructures" a constructor.

Consider a list in Haskell, this type has these constructors:

```haskell
[]   :: [a]
(:)  :: a -> [a] -> [a]
```

Accordingly, we can write patterns of this form:

- `[]`
- `(x : xs)`
	- Some syntactic sugar options:
		-  `[x]`
		- `[x, y]`

As an example, consider:

```haskell
reverse [] = [] 
reverse (x : xs) = reverse xs ++ [x]
```

The `_` is the "don't care value" it matches everything and binds to nothing.
### Guards

Syntactic sugar for if/then expressions.

We can also write `reverse` with guards:

```haskell
reverse x
  | length x < 1 = []
  | otherwise = reverse (tail x) ++ [head x]
```

### How are they different?

Pattern matching is a lot more powerful. They're the **only way to deconstruct data**, and they **bind identifiers within their scope**.
### Writing Tail-Recursive Functions in Haskell

```haskell
reverse [] = [] 
reverse (x : xs) = reverse xs ++ [x]

-- C & Racket like

reverse xs = 
	let 
		rev ([], rs) = rs 
		rev (x : xs, rs) = rev (xs, x : rs) 
	in rev (xs, [])
	
-- Cleaner

reverse xs = rev (xs, []) where 
	rev ([], rs) = rs 
	rev (x : xs, rs) = rev (xs, x : rs)
```
## Type Classes

A controlled way to overload classes
- Haskell classes are more like Java interfaces than classes
## Currying

The technique of converting a function that takes multiple arguments into a sequence of functions that each take a single argument.
- `(a,b,c) -> d` is transformed to `a -> b -> c -> d`

> A function that “takes two arguments and returns the result” is a function that “takes one arguments and returns a function that takes one argument and returns the result”.

```haskell
sum (x,y) = x + y -- not curried version 
-- sum :: Num a => (a, a) -> a
sum' x y = x + y -- curried version
-- sum' :: Num a => a -> a -> a
```

What makes `sum'` curryable is it's type signature. 

Currying allows for *partial application.*

Using `sum'`, we can do:

```
add2 = sum' 2

prompt> add2 3 
5
```

There is a built in `curry` & `uncurry`.

## Defining Our Own Datatypes

General Syntax:

```haskell
data NewType = 
	Cons1 Type1
	| Cons2 Type2
		...
	| ConsN TypeN
```

where `Cons(i)` is a constructor and `Type(i)` is a previously defined type

```haskell
data BTree a = Empty | Node (a (BTree a) (BTree a))
-- The Curried Version
data BTree a = Empty | Node a (BTree a) (BTree a)
```

`BTree` is the type constructor. 
- Type constructor ~ something that builds new types from other types
`Empty` and `Node` are data constructors
- Data constructor ~ something that creates values of a type

If a **type constructor builds types**, then a **data constructor builds actual data (values)** of those types.

### Infix Data Constructors

We can also define data constructors in infix form. This is quite useful is certain scenarios. 

Suppose we wanted to define a rational number. 

```haskell
-- The regular way
data Rational = :/ Integer Integer
x = :/ 4 5

-- Infix
-- Infix Constructors must start with :
data Rational = Integer :/ Integer
x = 4 :/ 5
```

The infix notation is more natural and reads cleaner.

### Mutually Recursive Types

```haskell
data Tree a = Empty | Node (Branch a) (Branch a) 
data Branch a = Branch a (Tree a)

--- Return the list of branch labels, in order: 
listTree :: Tree a -> [a]
listTree Empty = [] 
listTree (Node l r) = (listBranch l) ++ (listBranch r) 

listBranch :: Branch a -> [a]
listBranch (Branch b t) = b : listTree t 

```
## Type Classes 

```haskell
42 :: Num a => a
```

- `Num` is a type class.
- `Num a` is a type class constraint
- `Num a => a` means some type `a` in the `class Num`

These should be thought of like interfaces in Java as opposed to classes in Java / Python.

```haskell
member _ [] = False 
member y (x : xs) = x == y || member y xs

-- :type member yields
member :: (Eq t) => t -> [t] -> Bool
-- (Eq t) is the type class constraint!
-- Types in the Eq class provide == and /=.
```
### `deriving`

A mechanism that asks the compiler to automatically generate implementations of certain typeclass instances for a datatype.  

To provide custom implementations for a typeclass,

```haskell
data First = Pair Int Int 

instance Eq First where 
	(Pair x _) == (Pair y _) = (x == y)
	
-- More General
data First a = Pair a a

-- The "Eq a =>" part is a typeclass constraint!
instance Eq a => Eq (First a) where 
	(Pair x _) == (Pair y _) = (x == y
```

### Creating our own Type Classes

```haskell
class YesNo a 
	where yesno :: a -> Bool
```

## List Comprehensions

```haskell
[f a | a <- list, cond a ]

-- like a double for loop
[(x,y) | x <- xs, y <- ys]
```

## Lazy Evaluation

Expressions **are not** evaluated when they are bound to variables. Their evaluation is *deferred* until their results are needed by other computations.
- Arguments are not evaluated before they are passed to a function, but only when their values are actually used.
### thunk

An unevaluated value with a recipe that explains how to evaluate it. It is possible to paritally evaluate an expression. 
### A Walkthrough of Lazy Evaluation

Consider:

```haskell
take 0 _ = []
take n [] = []
take n (x:xs) = x : take (n-1) xs
```

Show a walkthrough of what we need to evaluate in:

```haskell
take 2 [42^1000, error "boom", 7]
```

```
take 2 thunk{[42^1000, error "boom", 7]} pattern match
take 2 (42^1000 : thunk{[error "boom", 7]}) function body
42^1000 : take 1 thunk{[error "boom", 7]} pattern match
42^1000 : take 1 (error "boom" : thunk{[7]}) function body
42^1000 : error "boom" : take 0 thunk{[7]} pattern match
42^1000 : error "boom" : []
42^1000 : [error "boom"]
[42^1000, error "boom"]
```

Think of:
1. **pattern match** as "we matched this shape"
2. **function body** as "this is what we got after rewriting using the rule"