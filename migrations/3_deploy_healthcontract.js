var HealthContract = artifacts.require('./HealthContract.sol')

module.exports = function (deployer) {
  deployer.deploy(HealthContract, 'HealthContract', 0x111, 0x1111)
}
