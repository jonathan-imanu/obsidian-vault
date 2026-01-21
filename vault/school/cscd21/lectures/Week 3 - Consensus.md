##### Recap

**Client**: Creates transactions using a wallet to manage cryptographic keys
**Blockchain Node**: Ensures integrity of the blockchain by validating and forwarding transactions and blocks 
**Miner**: Creates blocks using consensus
# Consensus

## Byzantine Agreement Problem

Generals attacking a fortress must decide to attack or repeat
- Must reach a consensus but some participants may try to sabotage this (byzantine failure)

In a fully connected network, each general could send their vote to everyone else.
- *Failure:* Some votes might not reach their destination
- *Sabotage:* A bad general could send different votes to different people
So this approach isn't resistant to byzantine failure.

In a P2P network, each general could sign and forward their vote to peers and who relay it along. This is an example of the flooding algorithm.
- *Failure:* Some votes might not reach their destination
- *Sabotage:* 
	- A bad general could send different votes to different people
	- A bad general might not forward certain votes
So this approach isn't resistant to byzantine failure.

## Requirements for Byzantine Fault Tolerance

Given a system of $n$ nodes, $t$ of which are dishonest. When a node $A$ broadcasts the value $x$, the other nodes are allowed to discuss with each other and verify the consistency of $A$'s broadcast, and eventually settle on a common value $y$.

The system is said to resist Byzantine faults if either:
- $A$ is honest and all honest nodes agree that $A$ says $x$
- $A$ fails or is dishonest and all honest nodes agree that $A$ says $Y$

Security properties:
- **Consistency**: Honest nodes do not contradict
- **Liveness**: Progress is made
## Sybil Attack 

If we have a reputation system, an attacker can creates and operates multiple nodes/identities to:
- Carry out a 51% attack to control the consensus outcome
- Block messages from honest nodes (P2P network)
## Proof of Work (Nakamoto Consensus)

**Nonce**: Number only used once

We want to find a nonce such that `H(block)` has a certain number of leading 0s where the number of zeros is determined from the target which is reevaluated every 2016 blocks.
- Remember `H(block) = H(merkleRoot, previous, nonce)`
- Finding the right nonce that outputs the right hash is hard (but not impossible) to compute
	- Recall the properties of hashing