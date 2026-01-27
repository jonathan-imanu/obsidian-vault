# Lisp & Racket

[Ref](https://lips.js.org/docs/scheme-intro/data-types)

In Lisp, everything is written as S-Expression, which is a list wrapped in parentheses with space between elements.

```
(+ 1 2 3)
```

where `+` is the procedure applied. 

In Scheme, a **procedure** is a _first-class value_ that can be **applied** to zero or more arguments.

`+` & `*` on an empty S-expression will default to a the additive and multiplicative identity. 