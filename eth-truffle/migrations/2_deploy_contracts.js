const EthSwap = artifacts.require("EthSwap");
const FalkToken = artifacts.require("FalkToken");

module.exports = async function (deployer) {
  await deployer.deploy(FalkToken);
  const token = await FalkToken.deployed();

  await deployer.deploy(EthSwap, token.address);
  const swap = await EthSwap.deployed();

  await token.transfer(swap.address, '1000000000000000000000000');
};
