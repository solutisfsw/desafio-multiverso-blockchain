import React, { Component } from 'react';
import './App.css';
import Blockchain from './Blockchain';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Desafio Multiverso Blockchain</h1>
        <p className="about">
          Olá! Meu nome é Tailine graduanda em Ciência da Computação pela Unifacs e atualmente bolsista de Iniciação Científica no estudo de Inteligência Artificial. Fui enviada a um novo universo e para isso foi necessária a construção de um blockchain para garantir uma viagem segura. Está tudo pronto! Agora é só iniciar sua viagem!
        </p>
        <Blockchain />        
      </div>
    );
  }
}

export default App;
