import hashlib
import pickle
class BlockChain:

    def __new__(self,previous_hash,name,content,blockchain):
        difficulty = 3
        difficulty_string = ''.join(['0' for x in range(difficulty)])
        nounce = 1
        block = {}
        block['previous_hash'] = previous_hash
        # block['hash'] = m.hexdigest()
        block['name'] = name
        block['content'] = content
        m = hashlib.sha3_256()
        
        
        while m.hexdigest()[:difficulty] != difficulty_string:
            nounce +=1
            m.update(pickle.dumps(blockchain))
            block['nounce'] = nounce
            block['hash'] = m.hexdigest()

        return block
        