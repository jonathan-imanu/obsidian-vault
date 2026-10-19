## In a Nutshell

- Uses ECC Public Keys and the ECDSA signature algorithm
- Is a UTXO Blockchain
- Has a proof of work consensus
- A block time of roughly 10 minutes
- Bitcoins are created through block reward
## Building the Blockchain

### Process

1. Transactions are broadcasted on the network 
2. The nodes verify each transaction before adding them to their local mempool of unconfirmed transactions 
3. Miners select transactions from the mempool (maximizing the Maximal) Extractable Value MEV) and start mining the next block 
4. Once a nonce matching the current difficulty is found, the miner broadcast the block on the network 
5. The nodes verify each block before adding it to the blockchain. The transactions are confirmed and the mempool is updated
### Rules

- New transactions cannot use UTXO inputs of transactions that have not been confirmed yet.
- Data is always consistent for a given chain and no double spending attack for a given chain
	- But we can have competing chains with double spent UTXOs
### Miner Rewards

Miners are rewarded by:
1. A Block Reward
2. All Transaction Fees

These are added together into a **Coinbase transaction**.
#### Transaction Fees

A fee that matches the transaction fee is not an obligation but needed in practice.
- A transaction with a underpaid fee will remain unconfirmed for a long time during network congestion.
- A fee can be used cancel/modify an unconfirmed transaction

### Block Size Limit

**Before 2017**: 1 MB 
**After 2017 and BIP-141**: Signatures are stored outside of the main block structure allowing transactions to use less space.
## Bitcoin Scripts

[Ref](https://learnmeabitcoin.com/technical/script/)

Basically a stack-based programming language that consists of:
1. Opcodes - Simple functions that operate on data
2. Data - Such as public keys and signatures

Data elements can include public keys and signatures and have to be manually pushed on to the stack with an opcode.
### Mechanics

**scriptPubKey** (transaction output): The locking script that specified the condition that needs to be fulfilled to use the UTXO 

**scriptSig** (transaction input): The unlocking script (transaction input) provided by the user who wants to use the UTXO 
# Some important **B**itcoin **I**mprovement **P**roposals (**BIP**) 

## BIP 39: Seeds and Mnemonic Codes

Generates a 512 bit seed from a mnemonic phrase. 
- Each word comes from a wordlist of 2048 words with some useful properties to make memorizing sentences easier. 
- There are 11 bits per word
- There is also an optional passphrase
## BIP 32: Deriving child keys from a master key using a tree-like structures

![[HD Wallets.png]]

A hierarchical deterministic wallet (or "HD Wallet") is a wallet that generates all of its keys and addresses from a single source.

- **Hierarchical** – The keys and addresses can be organized into a _tree_.
- **Deterministic** – The keys and addresses are always generated in the _same way_.
## BIP 44: 

BIP 44 keys are derived from a BIP39 mnemonic phrase and a BIP32 key derivation path. A BIP 44 path has the following structure:

```
m / purpose' / cointype' / account' / change / address_index
```

- purpose is usually fixed to `44`
