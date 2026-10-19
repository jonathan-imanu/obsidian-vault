## ZK-STARKS

Users would accept this drawback because it means that they do not have to rely on a trusting that a ZK-SNARK network has correctly and safely (this means discarding the secrets used in the trusted ceremony).
## What is StarkNet?

> A decentralized, permissionless Layer 2 (L2) validity rollup that scales Ethereum by utilizing STARK-based zero-knowledge proofs to bundle thousands of transactions off-chain for verified settlement on the mainnet.


### Architecture

![[StarkNetArch.png]]
[Source](https://www.certik.com/blog/an-introduction-to-the-cairo-programming-language)

**Key Observations**

- Accounts are SMART Contracts not just a pair of keys
- **The sequencer is run by StarkWave!** It's not truly decentralized.
	- [Decentralization is being worked towards though](https://www.starknet.io/blog/starknet-grinta-the-architecture-of-a-more-decentralized-future/)

**The fact that accounts are natively built into the platform is a big differentiator from ETH**

> Doesn't ETH already have this?

Not really. ETH has *Externally Owned Accounts (EOAs)* which are controlled by a pair of keys. Everything from the account addr. to the authority to execute txns comes from said keys.
## Reading List

- [A good overview on StarkNet and Cairo](https://www.certik.com/blog/an-introduction-to-the-cairo-programming-language)
- [StarkNet's S-two](https://docs.starknet.io/learn/S-two-book/introduction)





