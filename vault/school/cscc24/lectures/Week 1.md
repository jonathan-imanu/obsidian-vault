# Lecture Notes

Language is an arbitrary collection of forms with their meanings.
- Syntax: specification of the forms
- Semantics: specification of the meanings
## Programming languages

### High Level Languages

**Translation**: Covering a high-level language into machine language

There are two general methods:
1. Compilation: Whole program is translated before execution
2. Interpretation: Translate and execute one statement at a time
## Translation

The process of converting a program written in a high-level language into machine language is called **translation**. It is composed of the following parts:

1. Lexical analysis converts source code into sequence of tokens
	1. Regular expressions, finite state automata
2. Syntactic analysis structures tokens into initial parse tree
	1. CFGs, push-down automata
3. Semantic analysis annotates parse tree with semantic actions
4. Code generation produces final machine code

Parts 1 & 2, are usually just grouped into one step (at least when referencing these stages) called parsing.
## PL Syntax

**Lexical Rules** specify the form of the building blocks of the language:
- what's a token
- how tokens are delimited
- where white space can go
- how comments are specified

**Syntax Rules** specify how to put the building blocks together.
# Bonus

## Donald Knuth

- Think of programs as a piece of literature addressed to human beings rather than a computer

