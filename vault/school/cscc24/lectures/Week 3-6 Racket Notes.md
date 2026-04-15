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

**Continuations are first-class values.**

Conceptually we think of everything as being a continuation. 
- The current continuation can be reified as a function by using the built-in function call-with-current-continuation (or call/cc for short)
### Continuation-Passing Style (CPS)

Kind of like tail-recursion but we pass a function instead of having an accumulator. This has the effect of passing control forward rather than the data. 

Just like how we start with the identity element as the accumulator for tail-recursion, we use the identity function for CPS.

As far as the stack is considered, since all calls to continuations are tail calls they are optimized away by Racket.
#### Example: Comparing with Tail Recursion

```scheme
(define (fact-cps n) ; return n! 
	(local [(define (fcps n af)
		(if (= n 0)
			(af 1)
			(fcps (- n 1) (lambda (x) (* n (af x)))))
			
(define (fact-cps n)
  (local [(define (fcps n af)
            (if (= n 0)
                (af 1)
                (fcps (- n 1)
                      (lambda (x) (af (* n x))))))]
    (fcps n (lambda (x) x))))
```

#### **Tricky: Functions that should handle nested inputs using CPS**

Consider the `num-ok-nested` problem.

We are to design a function `(num-ok-nested ok? xs)` that counts the number of elements in a potentially nested list `xs` that satisfy the given procedure `xs`.

This was my first naive attempt. 

```scheme
(define (num-ok-nested ok? xs)
  (local [(define (ncps xs k)
            (cond
              [(empty? xs) (k 0)]
              
              [(list? (first xs))
               (ncps (rest xs)
                     (lambda (v)
                       (k (+ (ncps (first xs) identity) v))))]
                       
              [(ok? (first xs))
               (ncps (rest xs)
                     (lambda (v)
                       (k (+ 1 v))))]
                    
              [else
               (ncps (rest xs) k)]))]
               
    (ncps xs identity)))
```

This isn't CPS! The case `(list? (first xs))` breaks it because of the nested `(+ (ncps (first xs) identity) v)` call within the lambda.

*Why?*

We directly use the result of a recursive call rather than receiving it by a continuation.

**The fix**

This code is really just computing:
	`(count (first xs)) + (count (rest xs))`

So don't we break this into steps:

```scheme
(ncps (first xs)
	(lambda (a) ; the result of the first
		(ncps (rest xs)
			(lambda (b) ; the result of the second
				(k (+ a b))))))
```

### Article: Continuations from [Beau­tiful Racket](https://beautifulracket.com/ / [explainers](https://beautifulracket.com/#explainers)

Continuations let us jump back to an earlier point of the program. They allow us to circumvent the control flow of the usual evaluation model. 

We can use `let/cc` to capture continuations.

```scheme
(define c #f)  
(+ 1 (+ 2 (+ 3 (+ (let/cc here (set! c here) 4) 5)))) ; 15  
(+ 1 (+ 2 (+ 3 (+ 20 5)))) ; 31 (same as `(c 20)`)  
(c 20) ; 31
```
  
Think of `let/cc` turning its surrounding expres­sion into a func­tion of `x`, where `x` is the former loca­tion of the `let/cc` expres­sion:

```scheme
(define (c x) (+ 1 (+ 2 (+ 3 (+ x 5)))))  
(c 20) ; 31
```

## Scope and Evaluation

#### `let`

```scheme
(let ([var1 expr1]
	...
	[varn exprn])
	body)
```

The `let` keyword binds each variable to the results of the corresponding expression. 
- The scope of these variables is the body of the `let` statement

*The order in which each expr is evaluated is undefined!* They look like they are evaluated in parallel in our IDE. This has consequences. Consider:

```scheme
(define (sq-cube x) 
	(let ([sqr (* x x)] 
			[cube (* x sqr)]) 
	(list sqr cube))))
```

Since we don't know the evaluation order of `sqr` and `cube`, `sqr` is undefined at the time of evaluating `cube`!

#### `let*`

If we care about the evaluation order, we can use `let*` which will evaluate expressions from left to right. 
- If we did, the scope of each variable is the part of the `let*`-expression to the right of the binding.

`let*` is equivalent to nested `let`s:

```scheme
(let* ([v1 e1]
       [v2 e2]
       ...
       [vn en])
  body)
```

is the same as

```scheme
(let ([v1 e1])
  (let ([v2 e2])
    ...
      (let ([vn en])
        body)))
```
#### `let-rec`

Each binding of a variable has the entire `letrec` expression as its scope.
- Evaluation is like `let`

#### Let Semantics

Just syntactic sugar for the application of a `lambda`. The statement: `(let ((v1 e1)...(vn en)) expr)` is equivalent to `((lambda (v1...vn) expr) e1...en)`
### Closure

A closure is a record that has:
- a function and 
- an environment

If a variable does not have a binding within an expression we call it a **free variable**. An environment captured when a closure is created will contain bindings for all free variables.

```scheme
(define x 100)

(define (plus-x y)
  (+ x y))
  
; at this point we can think of the closure formed by plus-x as:
; plus-x = 
;  code: (lambda (y) (+ x y))
;  environment: { x → 100 }
```

The environment will only change if the free variable is mutated with something like `set!`
#### Global vs Local State

```scheme
(define make-counter
  (let ([global-count 0])
    (lambda ()
      (let ([local-count 0])
        (lambda ()
          (set! global-count (+ global-count 1))
          (set! local-count (+ local-count 1))
          (cons global-count local-count))))))
```

## Pure Functional Languages

### Referential Transparency

The value of a function application is independent of the context in which it occurs. 
- A language is *referentially transparent* if we replace one expression with another expression with another of equal value anywhere in a program without changing it's meaning.

This feature of functional languages makes it easier to reason about programs.
### Benefits of No Assignment Statement

- Variables in pure FP are said to be logical in that having acquired a value in the course of an evaluation, they retain that value until the end of evaluation.
### A Higher Level Language

- Storage management is implicit
	- Thinking about how program state maps to a computer’s memory is superfluous until we want to write super-efficient code)
- The state of a computation is much easier to think about.
## FP & Formal Proofs

**TLDR** -  Use structural induction.

Illustrated by walking through the example in the slides and trying to generalize:

Given the two following definitions:

```scheme
(define (len lst) 
	(if (empty? lst))
		 0 
		 (+ 1 (len (rest lst)))))
		 
(define (append lst1 lst2) 
	(if (empty? lst1)) 
		lst2 
		(cons (first lst1) 
			(append (rest lst1) lst2))))
```

WTS: `(len (append l1 l2)) = (+ (len l1) (len l2))`

**How to start?**

We know we'll end up using induction (it lends itself well to this recursion problem). 

We know the structure of list itself is recursive. If `lst` is a list then:
1. `lst = ()`, or
2. for some element `X` and list `Y`, we have `lst = (cons X Y)`

Wouldn't it be nice if we could establish a few facts about how it's structure relates to the functions at hand? 

Let's start with facts about `len`:
- If `lst = ()`:
	- `(len '() = 0`
- Else:
	- `(len (cons X Y)) = (+ 1 (len Y))`

Now for the analogous facts for `append`:
- If `lst1 = ()`
	- `(append '() lst2) = lst2`
- Else:
	- `(append (cons X Y) lst2) = (cons X (append Y lst2))`

Now we can prove:

`(len (append l1 l2)) = (+ (len l1) (len l2))`, for all lists `l1`, `l2`

