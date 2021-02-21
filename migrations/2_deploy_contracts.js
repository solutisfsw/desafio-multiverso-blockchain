/**
 * Arquivo de migrações para o contrato inteligente NewUniverse.
 * 
 * Autor: Augusto Rodrigues
 * Versão: 0.0.1
 */

var NewUniverse = artifacts.require("./NewUniverse.sol");

module.exports = function(deployer) {
  deployer.deploy(NewUniverse);
};
