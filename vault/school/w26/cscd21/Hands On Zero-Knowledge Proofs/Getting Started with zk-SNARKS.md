Suppose we are a prover and we know value `secret` such that `H(secret) = hash`, where `H` is a hash function. Where:
- `secret` is private
- `hash` is public

To construct a ZK proof, we do the following:
1. Create an arithmetic circuit in Circom that checks whether a private input matches a public hash.
2. Generate the trusted setup (Powers of Tau Ceremony)
3. Generate two key artifacts:
	1. A prover that outputs a ZK proof
	2. A verifier that checks the proof using only public information
4. Generate and verify a proof in JS
5. Verify the proof on-chain via a smart contract

