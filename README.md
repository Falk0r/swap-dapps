# My first Ethereum DApp

<p align="center">
<img alt="Ethereum dapp" src="https://raw.githubusercontent.com/Falk0r/swap-dapps/538186bed93d7769b803f562007b61604a858ca9/eth-test-client/public/falkSwap.png?token=GHSAT0AAAAAABS2UCGMWD26V4XWRVZWUFZIYR4NLUA" height="300">
</p>

# Update from 03/24/2022

## Introduce the FalkToken

To update this project and continue to learn web3, I created the FalkToken. This is a new token that I have created for this project. With this new token, I can wrote a smart contract that can be used to exchange FalkToken with ETH. This token is a ERC20 token.

## New feature : Swap FALK with ETH

With the FalkToken, you can now exchange FalkToken with Ethereum or Ethereum with FalkToken. This is a new feature that I have added to this project. This app has now a swap function like uniswap.

## New tools

To create this feature, RemixIDE is not enough. To develop I needed to used [Truffle](https://trufflesuite.com/) and [Ganache](https://trufflesuite.com/ganache/index.html).

# Introduction

To introduce myself in the blockchain's world, I'll start to learn the basics of web3 development.

So, I maked a simple app to send ethereum from your account to an other. In this app you can connect your wallet (Metamask), send an amount of ETH, choice a keyword for a gif and a message.

When you are connect with your wallet, you can find below the form the last transactions with date, amount, accounts, message and gif animation related to the keyword send with the transaction.

## Stack

### Front

The client's side is code with [Vue 3](https://vuejs.org/), [Tailwindcss](https://tailwindcss.com/) and [Ethers js](https://docs.ethers.io/v5/single-page/)

### Back

Smart contracts, code in [Solidity](https://docs.soliditylang.org/en/v0.8.11/), is deploy in the Ethereum's blockchain on Ropsten testnet.

### Host

<p align="center">
<img alt="Ethereum dapps" src="https://miro.medium.com/max/770/0*B6BKEEkcGigwiR-_.png" height="100">
</p>

Because I want to create a real Dapps (Decentralized Application), we need to host this app in the web3. So I hosted this app on [IPFS](https://ipfs.io/) and linked to a NFT domain from [Unstopabble Domain](https://unstoppabledomains.com/?ref=45d96544f1184ad).

> Notice : Actually, to access from your browser to a NFT domain, you need to install an extension like [Unstopabble Extension](https://unstoppabledomains.com/extension).

### Link to the Dapp
WEB 2.0 👇

[https://test-eth-awzuwb2p3-falk0r.vercel.app/](https://test-eth-awzuwb2p3-falk0r.vercel.app/)

WEB 3.0 (with Unstoppable Extension) 👇

[http://send-and-swap-by-falk0r.crypto](http://send-and-swap-by-falk0r.crypto)

WEB 3.0 (In IPFS's system) 👇

[https://bafybeidyyusojfqgjcztkn6ia2nrwu3cqbjxi526cgih5kzuhne2e7zbly.ipfs.dweb.link/](https://bafybeidyyusojfqgjcztkn6ia2nrwu3cqbjxi526cgih5kzuhne2e7zbly.ipfs.dweb.link/)

Or IPFS's Hash  👇

`QmWU5zHeAXM9T9Dov5d9pfSm2hcjctA15RAZXpoW8NQvnq`


## Usefull links for dev this dapps :

[alchemyapi.io](https://dashboard.alchemyapi.io/)

[faucet.egorfine.com (add to token to metamask)](https://faucet.egorfine.com/)

[hardhat.org](https://hardhat.org/)

[vitejs.dev](https://vitejs.dev/)