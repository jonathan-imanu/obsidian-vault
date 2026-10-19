Recall that SNARKs have two defining properties:
1. **Non‑interactivity:** the proof is a static object that can be posted or transmitted.
2. **Public verifiability:** anyone who sees the proof and the public inputs can verify it.
## Context Binding

We want:

> “I know this secret **right now**, for this specific request, action, or session.”

IE: Each proof is be _fresh_ and _context‑dependent_, while still being tied to the same long‑term secret.

So instead of proving:

> **Statement (static):** I know a `secret` such that `C(secret) = true`

we now prove:

> **Statement (dynamic):** I know a `secret` such that `C(secret, nonce) = true`

where:
- `secret` is the same long‑term private witness as before
- `nonce` is a fresh public value chosen by the verifier or the surrounding protocol

The crucial idea is that the circuit must _cryptographically bind_ the secret to the nonce. This ensures that:
- a proof generated for one nonce cannot be reused for another nonce
- replaying an old proof automatically fails if the nonce has changed

This turns a static proof into a **non‑interactive challenge–response protocol**.
# Proof of Commitment

With **Proof of Commitment**, the prover demonstrates knowledge of a secret preimage corresponding to a public hash value, without revealing the secret itself, _and_ with context binding to prevent replay attacks.

More precisely, the prover:

- keeps `secret` as a **private input**
- takes a fresh `nonce` as a **public input**
- produces two **public outputs**:
    - `secretHash = Poseidon(secret)`
    - `authHash = Poseidon(secret, nonce)`

Intuitively:

- `secretHash` plays the same role as in the first tutorial: it is a public commitment to the secret
- `authHash` is the context binding value that binds the secret to the nonce, making the proof instance‑specific
