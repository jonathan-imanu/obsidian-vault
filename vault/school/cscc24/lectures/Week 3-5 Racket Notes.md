# Racket

[Ref](https://lips.js.org/docs/scheme-intro/data-types)

In Lisp, everything is written as S-Expression, which is a list wrapped in parentheses with space between elements. 

```
(+ 1 2 3)
```

where `+` is the procedure applied. 

In Scheme, a **procedure** is a _first-class value_ that can be **applied** to zero or more arguments.
- `+` & `*` on an empty S-expression will default to a the additive and multiplicative identity. 

Everything we could every want to do is an expression. These expressions are evaluated by *substitution.* 
- An expression is reduced to a value by repeatedly finding the leftmost expression ready for substitution (all arguments are values) and replacing it with its value. 

Use quotes like 

```scheme
`(1 2 4)
'here
```

to denote actual data.
#### Variables

```scheme
(define x 10)
```
#### How Lists/Pairs Work

A pair is just a structure with two fields. `cons` is it's constructor. 
- The procedure `car` can be used to get the first field & `cdr` can be used to get the second field. 

```scheme
; cons is a checked constructor that can create two-field instances
; a & b can be literally anything
(cons a b)  
```

A list is basically a pair BUT the last element of every pair must be a list. Everything starts from the empty list (which isn't a pair) 

```scheme
`() ; the empty list
```
#### Conditionals

```scheme
; if statement
; syntax: (if cond-expr then-expr else-expr)
(if (= 4 5) 1 2) ; returns 1

; a more powerful conditional
; (cond 
;	[cond1-expr then1-expr]
;	...
;	[condN-expr thenN-expr]
;	[else else-expr])
(cond
	[(= 4 5) (error "this can't happen")]
	[else 'here])
	
; we also have the following procedures:
; - and
; - or
; - not 	
```
#### Functions

```scheme
; Named
(define (function-name arg1 ... argn)
	(function-body))

; Anonymous Functions
(lambda (lambda-args) (lambda-body))
```

##### An Example of how to Design a Tail Recursive Function

```scheme
(define (my-length xs)  ; return length[xs]
  (local [(define (helper xs acc)  ; return length[xs] + acc
            (if (empty? xs) acc
	            (len-t (rest xs) (+ acc 1))))]
    (len-t xs 0)))
```

### Higher-Order Procedures

#### Map

```
(map proc l1 .. ln)
```

where `l1 ... ln` are all lists of the same size.

Apply `proc` to every position.
- EX: `(map + '(1 2 3) '(2 3 4) '(3 4 5)) -> (6 9 12)`
#### Apply

```
(apply op lst)
```

where:
- `op` is an `n`-ary proc
- `lst` is a list of `n` args to `op`

We just apply op to the list. This is a lot like `op.apply(null, lst)` in JavaScript.
#### Fold

```
(foldr op id lst)
(foldl op id lst)
```

where:
- `op` is a binary procedure
	- This just a function that takes two arguments
- `id` is the identity element
	- We don't actually need to supply the identity element. It's not like it's checked.
- `lst` is a list of arguments

A better way to think of it is: `(fold op acc lst)` 
1. It is a function that traverses a list in a specified direction 
2. It will store the result of `(op first-elem (or last-elem) acc)` into `acc` and continue until everything has been consumed
3. At the end, `acc` will be what is returned
### Parameter Lists

Bind a procedure value to a name and validate arity (argument size) at runtime:

```scheme
(define f (lambda (x) (+ x 10)))
```

This is equivalent in functionality to:

```scheme
(define (f x) (+ x 10))
```

We also have variadic lists and the optional to specify mandatory arguments and non-mandatory arguments:

```scheme
(required-params . rest-param)
```

## Evaluation and Continuations 

Any expression that isn't a value can always be partitioned into two parts:
1. a **redex** ("reducible expression")
2. the **continuation**, which is the evaluation context around the redex
	1. Can be thought of as what needs to be done in order to complete the evaluation

> Given a well-formed Racket program, every well-formed sub-expression in this program corresponds to a point in the evaluation of the program, and every such point corresponds to a continuation
#### An Example

`(+ (* 3 5) (- 10 3))`

The continuation of `(* 3 5)` would be `(+ [] (- 10 3)`. 
- The reason it isn't `(+ [] (- 10 3))` even though we know Racket evaluates these sub-expressions from right-to-left is because continuations are about **semantic** context NOT evaluation order.

A continuation is really: 

> The rest of the computation, _as a function of the value of_ _E_.

So it is more apt to say that the continuation of the above example is:

`(lambda (E) (+ E (- 10 3)))`

**Continuations are first-call values.**

Conceptually we think of everything as being a continuation. 
- The current continuation can be reified as a function by using the built-in function call-with-current-continuation (or call/cc for short)
### Continuation-Passing Style (CPS)

Kind of like tail-recursion but we pass a function instead of having an accumulator. This has the effect of passing control forward rather than the data. 

Just like how we start with the identity element as the accumulator for tail-recursion, we use the identity function for CPS.

As far as the stack is considered, since all calls to continuations are tail calls they are optimized away by Racket.
