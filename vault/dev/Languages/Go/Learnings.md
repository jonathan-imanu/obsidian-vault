### Escape Analysis

The placement of stack vs heap is determined by both usage of `make` and **escape analysis**.

**Example:**

```go
func f() *int {
    x := 3
    return &x
}
```

Go's compiler sees that `x` "exits" the function and allocates it on the heap instead. The equivalent code in C will compile and run but leads to a gotcha where the returned value is dead.

**If you take the address of a variable and it would escape the stack, Go automatically moves it to the heap.**
