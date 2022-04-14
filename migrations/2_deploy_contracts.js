const Lottery = artifacts.require("./Lottery.sol");
const NuxToken = artifacts.require("./NuxToken.sol");

module.exports = function (deployer) {
  deployer.deploy(Lottery);
  deployer.deploy(NuxToken, 1000);
};
