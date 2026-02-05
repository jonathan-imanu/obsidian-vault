# Lisp & Racket

[Ref](https://lips.js.org/docs/scheme-intro/data-types)

In Lisp, everything is written as S-Expression, which is a list wrapped in parentheses with space between elements.

```
(+ 1 2 3)
```

where `+` is the procedure applied. 

In Scheme, a **procedure** is a _first-class value_ that can be **applied** to zero or more arguments.

`+` & `*` on an empty S-expression will default to a the additive and multiplicative identity. 

### Higher-Order Procedures

#### Map

```
(map proc l1 .. ln)
```

where `l1 ... ln` are all lists of the same size.

Just applies proc to each list. Like any other map function.
- EX: `(map + '(1 2 3) '(2 3 4) '(3 4 5)) -> (6 9 12)`

#### Fold

```
(foldr op id lst)
(foldl op id lst)
```

where:
- `op` is a binary procedure
	- This just a function that takes two arguments
- `id` is the identity element
- `lst` is a list of arguments

##### Learnings

1. What is the result when the list is empty?
2. If I already had the answer for (rest xs), what would I do with (first xs)
3. Does my answer depend only on those two things?

