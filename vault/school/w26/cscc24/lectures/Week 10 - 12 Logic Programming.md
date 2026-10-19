# Prolog

Neither procedural nor functional

- Specifies *relations* between objects
- Separates logic from control:
	- Programmer declares what facts and relations are true
	- System determines how to use facts to solve problems
	- System instantiates variables in order to satisfy relations

We program with **relations**. *A program consists of facts and rules so it makes sense that running a program means asking queries*.
- The language tries to find one or more ways to prove that a query is true by using unification, resolution and backtracking.
## Syntax

### Things to Keep In Mind

- Every clause or query must end with `.`
- `;` is syntactic sugar for `or`
#### What is a Functor?

A name with an arity that's used to construct a term: `name(arg1, arg2, ..., argN)`.
#### Lists in Prolog

A list is: 
- `[]` the empty list, or  
- `[Head|Tail]` a list with first element `Head` and rest of the elements list `Tail`
	- We abbreviate to `[e1, e2, . . . en ]`
#### Arithmetic

- `expr1 is expr2`, where `expr2` is fully instantiated
	- if `expr1` is a variable, it is bound to the result of evaluating `expr2`
- `expr1 < expr2 or expr1 > expr2`, where both `expr1` and `expr2` are instantiated
#### Negation as Failure

**There is no equivalent of logical negation in Prolog**:
- Prolog can only assert that something is true
- Prolog cannot assert that something is false.

Assuming that something unprovable is false is called **negation as failure**. *This is based on a closed world assumption.*

`not(Goal) :- \+ Goal`
### Layer 0

- Constants are:
	- Atoms: any string consisting of alphanumeric characters and underscore that begins with a lowercase letter
	- Numbers
- Variables are strings that begin with an underscore or uppercase letter.
### Layer 1

Inductively defined.

- Constants and variables are terms
- Compound terms - applications of any *n*-ary **functor** to any *n* terms 
### Layer 2

**Atomic Formulae**: Any *n*-ary relation (**predicate**) applied to *n* terms. 

Formulae can be used in 3 ways:
1. As **facts** to assert truth
2. As **queries** to enquire about truth
3. As components of more complicated statements

```prolog
% Queries
% General syntax is ?- list of predicates
? - male(charlie) % Example 
```
### Layer 3

Formed by combining simpler formulae. An example is conjuction represented by the `,`.
- `?- parent(Person, bob), female(Person).`

**Rule**: A backwards implication where the conclusion is written first and is written as `:-`.
- `sibling(X, Y) :- parent(P, X), parent(P, Y).`

Recursive definitions are pretty simple:

```prolog
ancestor(X, Y) :- parent(X, Y).
ancestor(X, Y) :- parent(X, Z), ancestor(Z, Y).
```
### Horn Clauses (Rules)

A **Horn Clause** is: $c \leftarrow h_1 \land h_2 \land h_3 \land \ldots h_n$ 
- Antecedents (aka. Subgoals, Tail): conjunction of zero or more atomic formulae
- Consequent (aka. Goal, Head): an atomic formula

"The consequent is true if the antecedents are all true"

Resembles `c :- h1, . . . , hn.` in Prolog.

A fact is just a horn clause with no tail and a rule is a horn clause with a head and a tail.

A logic program is a collection of Horn clauses. 

#### Tips

- `a1 ∧ a2 ∧ a3 → c1 ∧ c2`

Split into two rules:

```
c1 :- a1, a2, a3.
c2 :- a1, a2, a3.
```

- `a1 ∧ a2 ∧ a3 → c1 ∨ c2`

```
(a1, a2, a3 -> c1 ; c2).
```

## Variables

Variables may appear in the antecedents and consequent of a Horn clause. Prolog interprets free variables of a rule universally.

For example:

- `c(X1,...,Xn) :- f(X1,...,Xn,Y1,...,Yk)`

becomes:

`∀X1,..., Xn · c(X1,...,Xn) ← ∃Y1, . . . , Ym · f (X1,..., Xn, Y1,..., Ym)`

Because of this equivalence, we sometimes say that free variables that do not appear in the head are **quantified existentially**.
## Execution of Prolog Programs

- **Unification:** variable bindings. 
- **Backward Chaining / Top-Down Reasoning/ Goal-Directed Reasoning:** Reduces a goal to one or more subgoals. 
- **Backtracking:** Systematically searches for all possible solutions that can be obtained via unification and backchaining.
## Unification

Two atomic formulae unify iff. they can be made syntactically identical by replacing their variables by other terms.

**Substitution** - A function that maps variables to Prolog terms.
- `{ X/sue, Y/bob }`
**Instantiation** - An application of a substitution to all of the free variables in a formula or term
- If S is a substitution and T is a formula or term, then ST denotes the instantiation of T by S.

```
T = parent(X,Y) 
S = { X/sue, Y/bob } 
ST = parent(sue,bob)
```

We say that `C` is a **common instance** of formulae/terms `A` and `B`, if there exist substitutions `S1` and `S2` such that `C = S1(A) = S2(B)`.

For example:

```
A = parent(bob,X), B = parent(Y,sue)} 
S1 = { X/sue }, S2 = { Y/bob } 
S1(A) = S2(B) = parent(bob,sue) = C
```

`A` and `B` are **unifiable** if they have a common instance `C`. A solution that produces a common instance is said to be a **unifier** of `A` and `B`.

**Singleton Variable**: A rule that has a variable that appears only once.
- *These should always be replaced with `_` (the anonymous variable)*.
	- Each instance of `_` is unique. `p(_, _) unifies with p(a, b)`
### Most General Unifier

The substitution that results in the most general instance. It is **unique**, up to consistent renaming of variables.

A substitution, σ, is a most general unifier of a set of expressions E if it unifies E, and for any unifier, ω, of E, there is a unifier, λ, such that ω = σ ◦ λ.
##### How to Find?

Apply the following recursively, as many times as needed:

1. Match outer functors. These must have the same arity.
2. Solve the equations resulting from the matching arguments in the two functors. There will be 3 cases:
	1. Variable = term -> substitute
	2. constant = constant -> ok
	3. Variable = Variable -> pick one direction
## Prolog Search Trees

Encapsulates unification, backward chaining, and backtracking. 

- Internal nodes are ordered list of subgoals. 
- Leaves are success nodes or failures, where computation can proceed no further.
- Edges are labeled with variable bindings that occur by unification. 

*Describes all possible computation paths.* 

- There can be many success nodes. 
- There can be infinite branches
## Cut

`!` (cut): A goal that always succeeds immediately. Once satisfied it disallows either:

1. backtracking back over the cut, or
2. backtracking and applying a different clause of the same predicate to satisfy the present goal

A satisfying cut as making a commitment both:

1. to the variable bindings we’ve made during the application of this rule, and
2. to this particular rule itself

The way to reason about adding cuts should be:
1. What types of people are potentially good answers that we want to try?
2. What situations (that result in duplicates) do we want to eliminate?

Often times, we need to add the cut in a subclause rather than the original and force "dummy" clauses to get the same search effect as having no cut. 










