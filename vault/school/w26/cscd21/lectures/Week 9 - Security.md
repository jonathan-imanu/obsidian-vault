## Recap
### Access Control

Incorrectly configured permissions allow unauthorized users to access privileged functions.
### Frontrunning

The attacker can observe transactions in the mempool and can use their payloads and/or race to exploit them.
## Fallback DOS

A vulnerability where a SMART contract becomes  unusable or 'stuck' because its `fallback()` or `receive()` functions fail, revert, or consume too much gas.

The immutability of SMART contracts means that a poorly designed fallback function can halt all interactions with it.
## Reentrancy

A reentrancy attack exploits the vulnerability in smart contracts when a function makes an external call to another contract before updating its own state. 

This allows the external contract, possibly malicious, to reenter the original function and repeat certain actions, like withdrawals, using the same state. Through such attacks, an attacker can possibly drain all the funds from a contract.
### The Fix

- Update contract state before, not after, calling external contracts.
- Use OpenZepplin's reentrancy guards
## Bad Delegate Call 

`delegatecall` function is often used with libraries. 

It allows one contract to call another contract and run its code within the context of the calling contract.
- "Run contract A's code within this current execution context"

*Important Details*:
1. Storage layout (the order of variables in a SMART contract) must be the same for the contract calling `delegatecall` and the contract getting called.
### The Fix

- Don't use libraries that update caller context
- Only use "pure" libraries with `staticcall`
## `origin` vs `sender`

- `tx.origin`: The EOA address that initiated the transaction
- `msg.sender`: The address of the function caller

*Not always equal since smart contracts can call other smart contracts*

Check `msg.sender` NOT `tx.origin`
## Timestamp-based Randomness

There is no function `random` in solidity.

**BAD**: Using `block.timestamp` or `block.blockhash` as sources of randomness are bad because they can be manipulated by the validator.

**Better**: Using a random oracle



