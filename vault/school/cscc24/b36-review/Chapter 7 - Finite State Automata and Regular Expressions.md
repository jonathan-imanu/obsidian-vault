# 7.1 Regular Expressions

An **alphabet** is a set $\sum$  whose elements are called **symbols**. A string, over a specified alphabet $\sum$ is a finite sequence of symbols from $\sum$. The empty sequence is a string and is denoted $\epsilon$. The set of all strings over alphabet $\sum$ is denoted $\sum^*$ 

A **language** (over alphabet $\sum$) is a subset of $\sum^*$

If $S, T$ are languages:
- + denotes their union
- $ST = \{\, xy \mid x \in S,\; y \in T \,\}$ is concatenation
- $S^*$ is the Kleene Star which is the set of all possible concatenations of 0 or more strings in L.
# 7.2 Regular Expressions

**Definition**: Given a finite alphabet $\sum$, the set of regular expressions $RE$ over that alphabet is the smallest set such that:
- Basis: $\emptyset, \epsilon$, and $a$ for $a \in \sum$ belong to $RE$
- Induction Step: If $S, T$ are in $RE$ then $(S + T), (ST), S^*$ also belong to $RE$
# 7.3 Deterministic Finite State Automata

A **deterministic finite state automaton (DFSA)** is a mathematical model of a machine which, given any input string x, accepts or rejects x. The automaton has a finite set of states, including a designated initial state and a designated set of accepting states.
- Represented as directed graphs

A DFSA $M$ is a quintuple $M = (Q, \sum, \delta, s, F)$ where:
- $Q$ is a finite set of states
- $\sum$ is a finite alphabet
- $\delta: Q X \sum \rightarrow Q$ is the transition function
	- Read in a set of states and a single character to output a set of states
- $s \in Q$ is the initial state
- $F \subseteq Q$ are the accepting states

**Extended Transition Function**: The function $\delta^* : Q X \sum^* \rightarrow Q$ is defined via structural induction and can be thought of as “Start in state q and read an entire string x.”
- The ETF makes it easy to define stuff
	- For example, we say that $x \in \sum^*$ is accepted iff $\delta^*(s, x) \in F$ 
# 7.4 Nondeterministic Finite State Automata

A **Nondeterministic Finite State Automata (NFSA)** is finite state automaton where, for a given state and input, there multiple next states.

Similarly to a DFSA, a NFSA is a quintuple $M = (Q, \sum, \delta, s, F)$. The key difference is that the transition function $\delta: Q X (\sum \cup \{ \epsilon\}) \rightarrow P(Q)$. The ETF for NFSA follows from this definition and is similar to that of a DFSA.

# 7.7 Pumping Lemma

FSA has a fixed number of states so it can only "remember" so much. 

The *Pumping Lemma* states that any sufficiently long string of a regular language $L$ has a nonempty substring which can be repeated (“pumped”) an arbitrary number of times, with the resulting string still being in $L$.

Formally:

**Pumping Lemma**: Let $L \subseteq \sum^*$  be a regular language. Then there is some $n \in \mathbb{N}$ (that depends on $L$) so that every $x \in L$ that has length $n$ or more satisfies the following property:
- There are $u,v,w \in \sum^*$ such that $x = uvw$, $v \neq \epsilon, |uv| \leq n$ and $uv^kw \in L$ for all $k \in \mathbb{N}$ 






