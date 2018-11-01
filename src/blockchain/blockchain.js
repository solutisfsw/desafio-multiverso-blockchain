import React from 'react';
import Block from './block';

export default class BlockChain extends React.Component {

    constructor(props) {
        super(props);
        this.blocks = [new Block()];
        this.index = 1;
       
    
    }

    getLastblock() {
       
        return this.blocks[this.blocks.length-1];
    }

    newBlock(data) {
        const index =   this.index;
        const previousHash = this.getLastblock().hash;
       
        const block = new Block(index, previousHash, data);

        this.index++;
        this.blocks.push(block);
        
        
    }
    
    isValid() {
        for (let i = 1; i < this.blocks.length; i++) {
            const currentBlock = this.blocks[i]
            const previousBlock = this.blocks[i - 1]
    
            if (currentBlock.hash !== currentBlock.generateHash()) {
                return false
            }
    
            if (currentBlock.index !== previousBlock.index + 1) {
                return false
            }
    
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false
            }
          

        }
        
        return true
    }
    showLasBlock() {
       
       let lastBlock = this.blocks[this.blocks.length-1];
       let block = {
           index:Object.values(lastBlock)[0],
           timeStamp:Object.values(lastBlock)[1].toString(),
           hash :Object.values(lastBlock)[2],
           previousHash :Object.values(lastBlock)[3],
           data: Object.values(lastBlock)[4],
           difficulty: Object.values(lastBlock)[5],
           nonce: Object.values(lastBlock)[6]
       };
   
       return block;

    }

    render(){
        return(
            <div>
            
                {this.newBlock(this.props.data)}
            
               
                <p>Index: {this.showLasBlock().index}</p>
                <p>timeStamp: {this.showLasBlock().timeStamp}</p>
                <p>hash: {this.showLasBlock().hash}</p>
                <p>previousHash: {this.showLasBlock().previousHash}</p>
                <p>Viajante: {this.showLasBlock().data}</p>
                <p>difficulty: {this.showLasBlock().difficulty}</p>
                <p>nonce: {this.showLasBlock().nonce}</p>
                
               
            
            </div>



        );
    }
}