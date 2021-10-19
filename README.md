# Solidity Game - Game of Thrones

_Inspired by OpenZeppelin's [Ethernaut](https://ethernaut.openzeppelin.com), King Level_

⚠️Do not try on mainnet!

## Task

The contract below represents a very simple game: whoever sends it an amount of ether that is larger than the current prize becomes the new king. On such an event, the overthrown king gets paid the new prize, making a bit of ether in the process! As ponzi as it gets 😁
Such a fun game. Your goal is to become a permanent king.

1. Be a king.
2. Make sure that nobody else can be a new king.

_Hint:_

1. `transfer` always makes your contract vulnerable, it may take over the control fully to a malicious contract.
2. `fallback` is powerful function at times not just for receiving money.

## What will you learn?

1. `revert` will stop processing immediately, and reverts states.
2. `fallback` function is used to receive ether.

## What is the most difficult challenge?

**How can you be a permanent king?** 🤔

The only way to be staying on the throne forever is to destroy any attempts made by other competitions.

Yes, you can be a king for the coming winter.

In order to prevent any other attempts, you can refuse the transactions that make them a new king.

When a new king arrived, the contract returns your previous stake back to you. If you refuse to receive it? Nobody can be a new king once I got the throne. 🤴

So, your only target is not to receive any ether.

## Source Code

⚠️This contract contains a bug or risk. Do not use on mainnet!

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

contract King {
  address payable king;
  uint256 public prize;
  address payable public owner;

  constructor() payable {
    owner = payable(msg.sender);
    king = payable(msg.sender);
    prize = msg.value;
  }

  fallback() external payable {
    require(msg.value >= prize || msg.sender == owner);
    king.transfer(msg.value);
    king = payable(msg.sender);
    prize = msg.value;
  }

  function _king() public view returns (address payable) {
    return king;
  }
}

```

## Configuration

### Install Truffle cli

_Skip if you have already installed._

```
npm install -g truffle
```

### Install Dependencies

```
yarn install
```

## Test and Attack!💥

### Run Tests

```
truffle develop
test
```

You should see logs as following.

```
truffle(develop)> test
Using network 'develop'.


Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



  Contract: Hacker
    √ should be a pemanent king (1336ms)


  1 passing (440ms)

```
