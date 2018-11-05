/**
 * Arquivo principal de backend. Responsável por instanciar o web3 para interagir 
 * com os contratos inteligentes, iniciar os contratos, renderizar os dados 
 * na página principal,  executar o comando de viagem e aguardar a mudança de 
 * estado dos contratos de acordo com seus eventos e atualizar a página.
 * 
 * Autor: Augusto Rodrigues
 * Versão: 0.0.1
 */

App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {      
      // Se uma instância de web3 já foi disponibiliza pelo MetaMask
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {      
      // Especifica uma instância padrão se não foi disponibilizada uma instância de web3
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("NewUniverse.json", function(newuniverse) {
      // Inicia um novo contrato truffle
      App.contracts.NewUniverse = TruffleContract(newuniverse);
      // Conecta o provedor para interagir com os contratos
      App.contracts.NewUniverse.setProvider(App.web3Provider);
      // Aguarda a emissão de algum evento para o contrato
      App.listenForEvents();

      return App.render();
    });
  },

  render: function() {
    var newUniverseInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Carrega os dados da conta atual em uso
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Sua conta atual é: " + account);
      }
    });

    // Carrega os dados do contrato inteligente
    App.contracts.NewUniverse.deployed().then(function(instance) {
      newUniverseInstance = instance;
      return newUniverseInstance.soldiersCount();
    }).then(function(soldiersCount) {
      var soldiersResults = $("#soldiersResults");
      soldiersResults.empty();

      var soldiersSelect = $('#soldiersSelect');
      soldiersSelect.empty();

      for (var i = 1; i <= soldiersCount; i++) {
        newUniverseInstance.soldiers(i).then(function(soldier) {
          var id = soldier[0];
          var name = soldier[1];
          var classs = soldier[2];
          var level = soldier[3];
          var location = soldier[4];

          // Renderiza os soldados disponíveis no contrato na tabela
          var soldierTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + classs + "</td><td>" + level +"</td><td>" + location + "</td></tr>"
          soldiersResults.append(soldierTemplate);

          // Renderiza os soldados disponíveis no contrato no seletor
          var soldierOption = "<option value='" + id + "' >" + name + "</ option>"
          soldiersSelect.append(soldierOption);
        });
      }
      return newUniverseInstance.travelers(App.account);

      //loader.hide();
      //content.show();
    }).then(function(hasTraveled) {
      if(hasTraveled) {
        $('form').hide();
      }
      loader.hide();
      content.show();    
    }).catch(function(error) {
      console.warn(error);
    });
  },

  makeTravel: function() {
    var soldierId = $('#soldiersSelect').val();
    App.contracts.NewUniverse.deployed().then(function(instance) {
      return instance.travel(soldierId, { from: App.account });
    }).then(function(result) {
      // Aguarda enquanto a viagem é realizada (a propagação da transação)
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },
  
  listenForEvents: function() {
    App.contracts.NewUniverse.deployed().then(function(instance) {
      instance.traveledEvent({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("evento acionado", event)
        // Recarrega quando a viagem é finalizada
        App.render();
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});