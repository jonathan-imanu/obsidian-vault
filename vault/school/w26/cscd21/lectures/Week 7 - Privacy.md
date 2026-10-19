# Privacy in Blockchains
### Privacy in BTC & ETH

#### ETH

Everyone can see:
- Addresses and their balances
- Contract state
- Call data
- Events / logs

Privacy is a priority for ETH:
- Stealth Address was done in ERC-5564
- Creation of the Privacy Stewards of Ethereum (PSE) & Ethereum Foundation Privacy Roadmap
	- To incentivize developers to build features with selective disclosure in Ethereum. 
#### BTC

You can be pseudonymous. The privacy is partial and fragile.
- Address reuse enables traceability
- Graphs & other heuristics can be used to link inputs and outputs
### Know Your Customer (KYC)

In many jurisdictions, some services are required to collect customer identification.
- Centralized Exchanges
- On-Ramp and Off-Ramp Services
## Major Privacy Approaches

### Bitcoin CoinJoin - Concept of Mixer

Multiple users combine inputs in one transaction. 
- This is still vulnerable to graph and heuristics but it blurs things

![[CoinJoinCSCD71.png]]

#### ETH Mixer

Implemented as a smart contract and uses ZK proofs with a commitment and nullifier scheme. 
### SGX-Based Privacy

Encrypt information on the blockchain and use special hardware to decrypt and compute data.
- Validators use hardware-based security technology to isolate sensitive code and data in protected, encrypted memory regions called enclaves.

**Pro**: Prevents validators from dumping the memory and looking at the data
**Cons**: Requires complex key distribution and is prone to hardware vulnerabilities.
### Fully Homomorphic Encryption (FHE)

A cryptographic technique allowing computations to be performed on encrypted data without decrypting it.
- No need for specialized hardware
- Only allows for a limited set of operations
### Monero

The coin of choice for illegal activity. It has the following features:
1. Ring Signatures
	1. Hide sender among N decoys
2. Stealth Addresses
	1. One-time receiver addresses
3. Confidential Transactions 
	1. Uses a ZK proof with a commitment



