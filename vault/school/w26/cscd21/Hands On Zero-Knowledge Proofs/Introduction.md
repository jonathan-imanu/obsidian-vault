ZK-proofs are cryptographic protocols that allow one party (the prover) to convince another party (the verifier) that a certain statement is true. *The prover can do this without revealing why it is true or any additional information beyond the validity of the statement.* 

Three properties of a (good) ZK proof system:

- **Completeness: Knowing a solution should enable valid proof gen.** If the prover knows a valid solution for a given public input, they should be able to generate a proof that convinces an honest verifier. 
- **Soundness: Cannot cheat** If the prover does not know a valid witness, it sound be computationally infeasible to create a convincing proof. 
- **Zero-Knowledge: Proofs reveal no private info.** The verifier learns nothing about the witness beyond the fact that the statement is true.

## Interactive vs Non-Interactive Proofs

ZK proofs come in 2 main forms:
- Interactive proofs: These involve multiple rounds of communication between prover and verifier. 
- Non-Interactive: The prover generates a single proof that the verifier can check independently.
## SNARKS vs STARKS

Two major types of non-interactive proofs:
- zk-SNARKS: Efficient and compact proofs that support fast verification and small proof sizes. They require a trusted setup as there is a preprocessing step that must be done securely to avoid compromising the system.
- zk-STARKS: Avoids the need for a trusted setup and offers post-quantum security, but generally results in larger proof sizes and slower verification.
## Common zk-SNARK Proof Systems

Two SNARK systems:

1. **Groth16**:  Produces very small proofs (~200 bytes) and is extremely fast to verify. However, it requires a trusted setup that is specific to each circuit.
2. **PLONK**:  Supports a universal trusted setup, meaning the same setup can be reused across many circuits. It is slightly slower and produces larger proofs than Groth16, but offers greater flexibility and updatability.


![[ZK Proofs.png]]