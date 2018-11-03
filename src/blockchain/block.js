import SHA256 from 'crypto-js/sha256';

// let SHA256 = require('crypto-js/sha256');

class Block {

  constructor(index, data, previousHash = '') {
    this.time = new Date();
    this.minutes = this.time.getMinutes();
    this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;

    this.index = index;
    this.timestamp = `${this.time.getDate()}/${this.time.getMonth() + 1}/${this.time.getFullYear()} às ${this.time.getHours()} : ${this.minutes}`;
    this.data = data;
    this.previousHash = previousHash;
    this.difficulty = 3;
    this.hash = this.calculateHash();
    this.nonce = 0;

    this.mineBlock();
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + 
                  JSON.stringify(this.data) + this.nonce).toString();
  }

  mineBlock() {
    while(this.hash.substring(0, this.difficulty) !== Array(this.difficulty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    // console.log(`Index: ${this.index} Block mined: ${this.hash} PreviousHash: ${this.previousHash}Nonce: ${this.nonce}`);
  }
}

export default Block;