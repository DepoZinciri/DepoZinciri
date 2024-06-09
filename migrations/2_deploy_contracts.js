const akys = artifacts.require("akys");
const DepoZinciri = artifacts.require("DepoZinciri");

module.exports = function(deployer){
    //deployer.deploy(akys);
    deployer.deploy(DepoZinciri);
};