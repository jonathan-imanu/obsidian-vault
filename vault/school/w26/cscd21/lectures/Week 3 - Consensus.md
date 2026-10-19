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

*This doesn't completely solve the Byzantine Agreement Problem* because two valid blocks can be found at the same time.
- It does defend against a Sybil attack though.
### Longest-chain Wins Protocol

**A miner must mine on the longest chain known**.
- One should wait at least 6 confirmation blocks to consider a transaction as fully confirmed.

**Proof of Work wastes lots of energy** as miners all do lots of work only to have one of them be rewarded.
## Proof of Stake

Elect the node that will mine the next block. This prevents a sybil attack by making the probability of being elected relative to monetary power (staking).

Electing one of the node to mine the next block requires a beacon : an ideal service that regularly publishes random value which no party can predict or manipulate

### The Collect Random Approach

- **Step 0**: Each node $i$ generates a random number $r_i$
- **Step 1**: Each node commits its random number by broadcasting $H(r_i)$
- **Step 2**: Each node broadcasts its random $r_i$ and verifies all committed hashes others
- **Step 3**: Each node calculates the beacon value $\text{beacon} = H(r_1 || r_2 || \ldots || r_n)$ 
- **Step 4**: The elected node mines the next block and broadcasts it to the network
- **Step 5**: The other nodes check the block. If the block is invalid, the elected node loses its stake. 
	- aka. **slashing**


