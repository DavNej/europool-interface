## Europool Interface

User interface for interacting with the [EuroPool](https://alfajores.celoscan.io/contract/0xb45Fa036d3E90c9900397D1F0EcaBE65A6967C93) contract deployed on Celo Alfajores. This interface enables users to perform the following actions :

* [x] Connect their wallets
* [x] Deposit cEUR into the EuroPool pool
* [x] View the amount of cEUR they have deposited
* [x] Withdraw their cEUR
* [x] Claim their cEUR rewards

Technologies used:

- React / Next.js
- Viem / Wagmi

## Deployment & CD

The final application is accessible at [europool.vercel.app](https://europool.vercel.app/).
Continuous deployment is set up. Commit to `main` triggers the latest version's deployment.

## To run locally

First install dependencies

```bash
npm install
```

then run the development server:

```bash
npm run dev
```
