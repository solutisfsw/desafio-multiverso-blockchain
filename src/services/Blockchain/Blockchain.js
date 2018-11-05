import Block from './Block'

export default class Blockchain {

    constructor(difficulty = 1){
        this.blocks = [new Block()]
        this.index = 1
        this.difficulty = difficulty
    }

    getLastBlock(){
        return this.blocks[this.blocks.length - 1]
    }

    addNewBlock(data) {

        const index = this.index
        const previousHash = this.getLastBlock().hash
        const difficulty = this.difficulty

        const block = new Block(index, previousHash, data, difficulty)

        this.index++
        this.blocks.push(block)

    }

    isValid() {

        for(let i = 1; i < this.blocks.length; i++){
            const currentBlock = this.blocks[i]
            const previousBlock = this.blocks[i - 1]

            if(currentBlock.hash !== currentBlock.generateHash()){
                return false
            }

            if(currentBlock.index !== previousBlock.index + 1){
                return false
            }
            
            if(currentBlock.previousHash !== previousBlock.hash) {
                return false
            }

        }

        return true
    }

}