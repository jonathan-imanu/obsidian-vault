# Cryptography Toolbox

### Hashing

We say that $H(m) = x$ is a hash function if:
- $m$ is a message of any length
- $x$ is a message digest of a fixed length
- $H$ is a non invertible function
	- $H$ is a lossy compression function, necessarily $\exists m_1, m_2$ such that $H(m_1) = H(m_2)$

It's of course straight-forward (either polynomial or linear) to find $x$ given $H$ and $m$.
- Given $H$ is collision resistant, it's said to be *computationally-intractable* for one to find $m$ and $m'$ such that $H(m) = H(m') = x$
### Commitment Scheme

A **cryptographic commitment** is a primitive that lets a party fix a value now while keeping it hidden, and reveal it later in a way that is verifiable.
- Can think of it as the digital equivalent of a sealing a value in an envelope.

Broken down into two phases:
1. Commit: `x = commit(m)`
	1. Commitment $x$ requires a fixed and minimal storage
	2. Commitment $x$ alone does not reveal the content of $m$. We say it is non-reversible.
2. Reveal and Verify: `verify(x, m) = true`
	1. There are no collisions.
### Merkle Trees

[Good Article](https://decentralizedthoughts.github.io/2020-12-22-what-is-a-merkle-tree/#fn:handwave)

**Goal**: We want to commit several values as one commitment and show that a value belongs to a collection.
- Naively we can do this by committing $m_0, \ldots, m_n$ but we then need this entire collection to verify that some $m_i$ is indeed a part of the collection.

Merkle Trees allow us to validate that some value $m_i$ belongs to some collection $m_0, \ldots, m_n$ without knowing the collection after the commitment!

It follows the list commitment scheme:
1. Phase 1: `x = commit(m1, m2, ..., mn)`
	1. `x` is the Merkle Root
2. Phase 2: `verify(x, mi, pi) = true`
	1. In the naive implementation, `pi` (the proof) would have needed to have been the entire collection. 
	2. In this case, it's just a **Merkle Proof** which is of size `log_2(n)`
### Digital Signatures

A key pair consists of a public key $pk_A$ and a secret key $sk_A$. The idea is that the public key can be distributed freely to anyone and they can use it verify a message $m$ signed by the public key.
- It's very hard to find matching secret key given a private key and to forge a signature without knowing the secret key.

