# Scaling

**Blockchain mainets are slow and expensive** due to design choices that prioritize decentralization and security.
## Rollups

Process transactions outside of the main chain using either:
- off-chain
- or onto another L2-chain (bridging) with a faster / cheaper validation

*Comes with a trade of security and decentralization*

### 3 Types of Rollup

#### Naive Rollup

The rollup is entirely verified on-chain. 
- Too expensive for any real use case

The rollup contract keeps track of all users balances. The rollup is the list of transactions verified on-chain by:
- verifying each transaction signature
- checking and updating each user balance accordingly
#### Optimistic Rollup

The rollup is verified off-chain.

The contract only stores the root of a Merkle tree where the leaves are different users balances. 

The rollup is:
1. The list of transactions verified off-chained
2. and the new tree root computed off-chain

The rollup coordinator is trusted to compute the right balances and build the right tree.

*If the rollup is proved fraudulent, it is rolled back and the stake deposited by the rollup coordinator is slashed.*
#### Zk-Rollup

The rollup comes with a ZK-proof that is verified on-chain.

The rollup contract stores a Merkle root that is:
1. the list of transaction verified off-chain
2. the new tree root computed off-chain
3. a ZK proof proving that given the old tree and the list of transactions, the new tree is correct
## EIP-4844 Proto-Danksharding

Ethereum blob 

- ~128 KB binary data chunk 
- Attached to a special transaction type
- Not accessible to the EVM
- Stored temporarily (~18 days) and pruned afterward 
- Has separate (and cheaper) blob gas fees