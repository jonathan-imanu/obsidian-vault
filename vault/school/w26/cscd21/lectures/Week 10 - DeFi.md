
Two operations bridge the gap between DeFi and TradFi:
- **On-Ramp**: Purchasing crypto with actual FIAT currency
- **Off-Ramp**: Selling crypto to get FIAT
## Decentralized Exchanges 

aka Automated Market Makers

**An exchange** converts one currency to another given an exchange rate that is calculated dynamically based on supply/demand (assuming a fair market).
### Finding an Exchange Rate

- TradFi uses an order-book based approach

In theory, we could write a smart contract that implements an automated order book-based exchange. 
- "In theory" because gas because this practically infeasible.

Hyperliquid uses a hybrid approach where they use a custom built blockchain to process trades.
### Liquidity Pools: A fully decentralized approach

A pools of various tokens where the exchange rate is between tokens is calculated based on pool levels.
#### Dynamic Pricing using the Constant Product Market Maker

Constant Product Market Maker is about maintaining a value $k$ constant between two liquidity pools
$$k = vol(T_A)\cdot vol(T_b)$$ 
This constant allows us to calculate swap values
- **Swap Values**: What quantity of $T_B$ must be withdrawn when adding adding a given quantity of $T_A$ to keep $k$ constant

Swapping a amount of $T_A$ for $b$ amount of $T_B$:
- Since $vol(T_A) \cdot vol(T_B) = (vol(T_A) + a) \cdot (vol(T_B) - b)$ 
- Then $b = (a \cdot vol(T_B)) / (a + vol(T_A))$
#### Side Effects of the Dynamic Pricing

When a user submits an exchange transaction, the actual exchange may varies depending on other transactions executed before.
##### Slippage

Difference between the exchange rate when quoted and the actual one when executed.
##### Sandwich Attack

An attacker can monitor transactions in the mempool and emit concurrent transactions that will take advantage of dynamic exchange rate. 

**Example**.

Suppose $x = Vol(T_a, y = vol(T_b))$.

We submit a transaction that swaps $a$ of $T_a$ for $T_b$. This transaction is currently in the mempool.

An attacker sees this transaction and submits two transactions simultaneously:
1. A transaction that swaps $a_1$ of $T_a$ for $T_b$ with a higher tip than our transaction (so it gets executed first)
2. A transaction that swaps the $T_b$ they bought back for $T_a$ with lower tip than our transaction

The first transaction increases $x$ but decreases $y$. Since the exchange has a dynamic exchange rate, the price of $T_b$ has been pushed up.

Our transaction pushes this price even more up.

The second attacker transaction gets more $T_a$ than they originally started with because our trade bumped up the price of $T_b$

## DEX Staking

### Incentive for Liquidity Pool Providers

Liquidity pools must stash large volumes of cryptocurrencies to absorb a great quantity of possibly unbalanced transactions. 
- Have a fee for every swap transaction and reward liquidity pools
### Liquidity Token

Liquidity providers must add or withdraw $T_A$ and $T_B$ from/to the pools while preserving the ratio.

A token $T_L$ represents the contribution to these pools. A deposit or withdrawl either burns or mints these tokens accordingly.
### Impermanent Loss - The Risk Behind Staking

AMM constantly rebalances a portfolio. 
## Automatic Price Discovery

**Arbitrage**: Exploiting price differences between markets.
- As traders take advantages of arbitrage, the market as a whole move to a state where no one can make these profits. This is called **Nash Equilibrium**.
- **Automatic Price Discovery**: As traders take advantages of arbitrage, the market as a whole move to a state where no one can make these profits. 
## Flash Loans

Borrow and repay the token within the same transaction.
- If the token is not repaid (with interest), the last transaction fails.
- Risk free for the lender.
## Concept of Lending Market

- Lenders make money available to borrow and earn interest.
- Borrowers can take out a loan and repay it with interest before maturity date.

*What happens if a borrower defaults on a loan?*

The lender must deposit collateral.
### Undercollaterized vs Overcollaterized

**Undercollaterized**: Borrower must provide a collateral that is less than the value of the loan `val(collateral) < val(loan)`.

**Overcollaterized**: Borrower must provide a collateral that is more than the value of the loan `val(collateral) > val(loan)`

Due to dynamic exchange rates, the value of a loan might increase compared to the value of the collateral.  

To prevent against this, throughout the whole loan period, the value of collateral must not fall below a threshold called **collateral factor**.

This factor is usually 
- >1 for undercollaterized loan 
- <1 for overcollaterized loan

Overcollaterized borrowing exists primarily for shorting.
## Stablecoins

A cryptocurrency designed to trade at a fixed (*"pegged"*) price.
- Integrate real-world currencies into on-chain applications 
- Enable people without easy access to USD, to hold and trade a USD-equivalent asset
### Peg Stabilization Mechanisim

Maintaining the peg means maintaining the exchange rate between the stablecoin (SC) and its value (USD).

If SC loses its peg, the goal is to create arbitrage opportunities to restore the peg
- If it trades above its peg (e.g., 1.05 USD per SC), users can mint stablecoins cheaply and sell them at a profit
- If it trades below its peg (e.g., 0.95 USD per SC), users can buy SC on the market and repay their debt at a discount
### Centralized vs Decentralized Stablecoins

Centralized stablecoins can be either overcollaterized or undercollaterized and relies on a trusted-third party to maintain the peg.
#### Decentralized Stablecoin

Implemented as a Collateralized Debt Position (similar to borrowing schemes):
- Users can borrow (mint) SC by depositing collateral
- Users can get collateral back by repaying (actually burning) SC
## Yield Optimization

A yield optimizer takes advantages of DeFi protocols to maximize revenue by doing;
- **Multi-protocol and multi-chain optimization:** By taking advantages of multiple protocols through multiple chains 
- **Auto-compounding:** By automating harvesting rewards and reinvesting them





