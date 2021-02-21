/**
 * NewUniverse é responsável por armazenar os soldados que estão para realizar
 * a viagem ou que já realizaram a viagem, e controlar as permissões de viagem.
 * 
 * Autor: Augusto Rodrigues
 * Versão: 0.0.1
 */

//solium-disable linebreak-style
pragma solidity ^0.4.24;

contract NewUniverse {
    // Modelo de soldado
    struct Soldier {
        uint id;
        string name;
        string class;
        uint level;
        string location;
    }

    event traveledEvent(uint indexed _soldierId);

    // Mapeia informações dos soldados
    mapping(uint => Soldier) public soldiers;

    // Mapeia contas de soldados que já foram tranferidos
    mapping(address => bool) public travelers;

    // Armazena quantidade de soldados
    uint public soldiersCount;

    // Construtor
    function NewUniverse() public {
        addSoldier("Augusto", "Guerreiro", 102, "Planeta Terra");
        addSoldier("Khaly", "Espiritualista", 105, "Planeta Terra");
        addSoldier("Katsu", "Arqueiro", 101, "Planeta Terra");
        addSoldier("Peke", "Mercenário", 102, "Planeta Terra");
    
    }

    function addSoldier(string _name, string _class, uint _level, string _location) private {
        soldiersCount++;
        soldiers[soldiersCount] = Soldier(soldiersCount, _name, _class, _level, _location);
    }

    function travel(uint _soldierId) public {
        // Requer que a conta que está executando a viagem já não tenha feito a viagem ainda
        require(!travelers[msg.sender]);

        // Requer que o soldado esteja cadastrado
        require(_soldierId > 0 && _soldierId <= soldiersCount);

        // O soldado realiza a viagem
        travelers[msg.sender] = true;

        // Altera a localização depois de tealizar a viagem
        soldiers[_soldierId].location = "New Universe";

        // Evento é ativado quando o soldado realiza a viagem para o novo universo
        emit traveledEvent(_soldierId);
    }
}