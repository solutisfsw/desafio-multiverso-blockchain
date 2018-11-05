import Warrior from './Trip/Warrior'
import Teleporter from './Trip/Teleporter'
import Destiny from './Trip/Destiny'

export default class Api {

    selectWarrior(name, oUniverse) {
        this.warrior = new Warrior()    
        this.warrior.name = name
        this.warrior.oUniverse = oUniverse
    }


    setDestiny(dUniverse, distance = 1) {
        this.destiny = new Destiny()
        this.destiny.dUniverse = dUniverse
        this.destiny.distance = distance
    }

    startTrip() {
        this.teleporter = new Teleporter(this.warrior, this.destiny)       

        return this.teleporter
    }
 
}






// 1 - fazer o blockchain rodar no express
// 2 - obter dados do front end
