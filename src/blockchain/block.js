import sha256 from 'crypto-js/sha256';


export default class Block {

    constructor(index = 0, previousHash, data='genesis block', difficulty = 3) {
        
        this.index = index;
        this.timestamp = new Date();
        this.hash = this.generateHash();
        this.previousHash = previousHash;
        this.data = data;
        this.difficulty = difficulty;
        this.nonce = 0;

        this.mine();

    }

    mine() {
        this.hash = this.generateHash();
        
        while (!(/^0*$/.test(this.hash.substring(0, this.difficulty)))) {
            this.nonce++;
            this.hash = this.generateHash();
        }
    }

    generateHash() {
        return sha256(this.index + this.previousHash + JSON.stringify(this.data) + this.timestamp + this.nonce).toString();
    }

  

    
}