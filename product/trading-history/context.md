You will assist me with tasks related to this project. Please read the details below and reply with "Yes" if you understand the project.

This an application for tracking trading history. It supports ETH, WETH, wBTC, and cbBTC trades on Ethereum, Polygon, and Base chains.

To get the trading history, we use Alchemy API.

The app has two main views:

- **Set API Key**: To use the app, the user must set an API key. The API key is stored in local storage.
- **Trading History**: The user can add multiple addresses to track their trading history. The app shows the combined trading history of all the addresses. Users can switch between ETH (ETH & WETH) and BTC (wBTC & cbBTC) views using a tab navigation.

Based on the last trade and the current price of the respective asset, the app tells the user if it's a good time to buy or sell.

The app is available at https://history.radzion.com

## Tech Stack

This project is a part of a TypeScript monorepo related to blockchain projects.

It's a single page application built with NextJS. It's deployed to AWS via CloudFront and S3.