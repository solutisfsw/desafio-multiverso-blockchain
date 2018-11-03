import  React, { Component } from 'react';
import Block from './blockchain/block';

class Blockchain extends Component {

  state = {
    blockchain: '',
    viagemIniciada: false,
    blockNum: 0,
  }

  constructor(props) {
    super(props);
    this.chain = [this.createGenesisBlock()];
    this.index = 1;
    this.data = {
      nome: 'Tailine' ,
      habilidades: ['proativa', 'curiosa', 'comprometida', 'atenciosa'],
    }
  }

  createGenesisBlock() {
    return new Block(0, 'Genesis Block', '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  // add new block to the chain
  addBlock() {
    const previousHash = this.getLatestBlock().hash;
    const newBlock = new Block(this.index, this.data, previousHash);

    this.index++;
    this.chain.push(newBlock)

    this.setState(({ blockchain: this.chain }))
    console.log(this.chain)
    // newBlock.previousHash = this.getLatestBlock().hash;
    // newBlock.mineBlock(this.difficulty);
    // this.chain.push(newBlock);
    // console.log(newBlock)
  }

  isChainValid() {
    for(let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // check if the hash of the block is still valid
      if(currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      return currentBlock.previousHash === previousBlock.hash ? true : false;
    }
  }
  
  displayLastBlock() {
    // const blockChain = this.chain.map(block => 
    //   <li>{block.index}</li>
    // )
    const lastBlock = this.getLatestBlock();
    if(lastBlock.index !== 0)
      return <ul>
              <li><span>Universo:</span> {lastBlock.index}</li>
              <li><span>Início da viagem:</span> {lastBlock.timestamp}</li>
              <li><span>Soldado(a):</span> {lastBlock.data.nome}</li>
              <li><span>Habilidades:</span> {lastBlock.data.habilidades.join(', ')}</li>
              <li><span>Poder computacional:</span> {lastBlock.nonce}</li>
              <li><span>Hash:</span> {lastBlock.hash}</li>
              <li><span>Previous hash:</span> {lastBlock.previousHash}</li>
             </ul>;

    return null;   
  }

  handleClick() {
    this.setState((prevState) => {
      return {blockNum: prevState.blockNum + 1};
    })

    this.setState({viagemIniciada: true})
    this.addBlock();
    this.displayLastBlock();
    console.log(this.state.viagemIniciada)
  }

  

  render() {
    
    let button = this.state.viagemIniciada ?
                <button onClick={this.handleClick.bind(this)}>Continuar viagem</button> :
                <button onClick={this.handleClick.bind(this)}>Iniciar viagem</button>;
    
    return(
      <div>
        {this.state.blockNum === 0 ? null
           : <div className='block-container'>
           {this.displayLastBlock()}
         </div>}
        {button}
      </div>
    );
  }
}

export default Blockchain;