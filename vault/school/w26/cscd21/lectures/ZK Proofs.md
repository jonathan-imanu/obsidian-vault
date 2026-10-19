## Nutshell from Lecture

ZK Proofs let a **prover** prove to a verifier that it knows a secret without revealing it.
- Proof Generation
	- The prover generates a ZK proof with some secret input
- Proof Verification
	- The verifier verifies the proof without the secret input

*The verifier does not know the secret* but is convinced that the prover knows the secret since it can prove it using a ZK-proof.

There are two types of ZK proofs:
1. Interactive proofs
	1. A back-and-forth conversation to prove something
2. Non-interactive proofs
	1. A single message to prove something

# 