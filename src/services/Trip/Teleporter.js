import Blockchain from '../Blockchain/Blockchain'

export default class Teleporter {

    constructor(warrior, destiny) {

        let blockchain = new Blockchain(destiny.distance)

        blockchain.addNewBlock({ warrior: warrior })

        this.teleporterId = blockchain.getLastBlock().hash
        this.job = blockchain.getLastBlock().nonce
        this.content = JSON.stringify(blockchain.getLastBlock().data)
    }



}