# Lecture Notes

Language is an arbitrary collection of forms with their meanings.
- Syntax: specification of the forms
- Semantics: specification of the meanings
## Translation

The process of converting a program written in a high-level language into machine language is called **translation**. It is composed of the following parts:

1. Lexical analysis converts source code into sequence of tokens
	1. Regular expressions, finite state automata
2. Syntactic analysis structures tokens into initial parse tree
	1. CFGs, push-down automata
3. Semantic analysis annotates parse tree with semantic actions
4. Code generation produces final machine code

Parts 1 & 2, are usually just grouped into one step (at least when referencing these stages) called parsing.

There are two general methods for **translation**.
1. Compilation: The whole program is translated before execution
2. Interpretation: Translate and execute, one statement at a time
#### Compilation

- Program execution is faster since:
	- the compilation overhead has already been done. 
	- the translator can do optimizations
	- can get rid of information that isn't useful for run-time
- It's harder to provide feedback while debugging because we aren't directly executing the target
- Less portable to different OS / arch.
#### Interpretation

- Lower program execution
- We have to retranslate for each execution
- More space needed at execution time
- Portable!
#### Pseudo-Compilation

A mix of compilation and interpretation

- A compiler translates the whole program before execution, but only into intermediate code
- An interpreter translates and executes the intermediate code one statement at a time
- The intermediate code can be executed on any machine that has an interpreter for the intermediate code
#### JIT Compilation

- Runs in the interpreter
- Compile at run-time
	- Meaning that we compile on an "as-needed" basis. We compile stuff that runs often.
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

