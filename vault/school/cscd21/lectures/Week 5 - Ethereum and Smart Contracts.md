## TLDR

- Uses ECC and ECDSA as signature algorithm 
- Consensus was originally Proof of Work and shifted to Proof of Stake in 2022
- It's an account-based blockchain with **programable smart contracts**
	- ETH is more than just cryptocurrency, it enables decentralized applications
## ETH Accounts & Transactions

There are different types of ETH accounts that are all associated with an address:
- Externally Owned Accounts
- Contract Accounts
Different types of ETH transactions
- Transfer ETH from EOA accounts to ETH addresses
- Deploy smart contracts
- Call methods of a deployed smarts
# Smart Contracts

A smart contract is a program (EVM bytecode) that is deployed on the blockchain that defines:
1. A set of state variables
2. Methods to read/write those state variables
3. Events
	1. These are just logs that will be written on the blockchain

*This is a lot like a class in Java*

A smart contract can hold ETH as it has an address BUT it doesn't have a private key.
### Deploy a Smart Contract

Send a transaction that writes the EVM bytecode on the ETH blockchain
- Once deployed, the code is immutable. The state can change of course depending on the contents of the Smart Contract
- To call a method, we do it via an EOA account (by sending a transaction) or from another contract

## Who Executes These?

ETH Nodes that process transactions. When the transaction is received (unconfirmed mempool), the code is executed (by the node) as a dry-run (not changing state).

Nodes charge a fee (called **gas**) for running a smart contract.





