var NewUniverse = artifacts.require("./NewUniverse.sol");

contract("NewUniverse", function(accounts) {
  var newUniverseInstance;

  it("inicializa com um único soldado", function() {
    return NewUniverse.deployed().then(function(instance) {
      return instance.soldiersCount();
    }).then(function(count) {
      assert.equal(count, 1);
    });
  });

  it("inicializa o soldado com os valores corretos", function() {
    return NewUniverse.deployed().then(function(instance) {
      newUniverseInstance = instance;
      return newUniverseInstance.soldiers(1);
    }).then(function(soldier) {
      assert.equal(soldier[0], 1, "id correta");
      assert.equal(soldier[1], "Augusto", "nome correto");
      assert.equal(soldier[2], "Guerreiro", "classe correto");
      assert.equal(soldier[3], 102, "level correto");
      //return electionInstance.candidates(2);
    });
  });

  it("permite que o soldado realize a viagem", function() {
    return NewUniverse.deployed().then(function(instance) {
      newUniverseInstance = instance;
      soldierId = 1;
      return newUniverseInstance.travel(soldierId, { from: accounts[0] });
    }).then(function(receipt) {
      return newUniverseInstance.travelers(accounts[0]);
    }).then(function(traveled) {
      assert(traveled, "o soldado já realizou a viagem");
      return newUniverseInstance.soldiers(soldierId);
    })
  });
});