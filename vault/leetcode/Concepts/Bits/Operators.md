## Bitwise AND (&)

Compares each bit of two numbers and for each bit returns 1 iff. the corresponding bits are 1 on BOTH numbers.

For example:

`8 -> 1000`
`7 -> 0111`
`8 & 7 -> 0000`

**Common uses:**

- Masking (extracting specific bits).
- Checking if a number is even (n & 1 == 0).
## Bitwise OR (|)

Compares each bit of two numbers and for each bit returns 1 iff. at least one of the corresponding bits is 1.

`8 -> 1000`
`7 -> 0111`
`8 | 7 -> 1111 (9)`

**Common uses:**

- Setting specific bits to 1.
## Bitwise XOR (^)

Compares each bit of two numbers and for each bit returns 1 iff. ONLY one of the corresponding bits is 1.

EX 1:

`8 -> 1000`
`7 -> 0111`
`8 ^ 7 -> 1111 (9)`

EX 2:

`5  ->  0101`
`3  ->  0011`
`5 ^ 3  ->  0110 (6)`

**Common uses:**

- Flipping specific bits.
- Swapping values without a temp variable.

## Bitwise NOT (-)

Flips bits

## Left Shift (<<)

## Right Shift (>>)

## Unsigned Right Shift (>>>)

