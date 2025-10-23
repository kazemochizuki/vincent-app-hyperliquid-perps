# vincent-app-hyperliquid-perps

App:

This project makes user place order in Hyperliquid by Vincent App.

## Summary

Ref: https://github.com/LIT-Protocol/vincent-starter-app

what`s updated:

- Utilize the Vincent Ability "@kazemochizuki/hyperliquid-perps", source code in: https://github.com/kazemochizuki/vincent-ability-hyperliquid-perps
- Deposit to Hyperliquid by official ability "ERC20 Transfer"
- Chain from Base to Arbitrum: but the name of environment variables "BASE_RPC_URL" doesn`t change due to reuse the Railway template provided by the origin repo.

what`s deprecated:

- DCA, Agenda & DCA: code is retained in case the Railway template doesn`t work.
