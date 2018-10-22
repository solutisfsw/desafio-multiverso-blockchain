from flask import Flask , render_template
from flask import jsonify
from flask import request
import json
from blockchain import BlockChain
blockchain= []

app = Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html')
#
# Função que irá retornar os dados ao bater na rota
@app.route('/blockchain/')
def retornajson():        
    return jsonify(blockchain)

@app.route('/blockchain/post',methods=['POST'])
def postjson():
    
    block = {}
    if len(blockchain)!=0:
        
        name = request.form['name']
        content = request.form['content']
        name = request.form['name']
        content = request.form['content']
        block = BlockChain(blockchain[len(blockchain)-1]['hash'],name,content,blockchain) 
    else:
        
        name = request.form['name']
        content = request.form['content']
        #Bloco Genesis
        block = BlockChain(0,name,content,blockchain) 
    
    blockchain.append(block)
    return jsonify(block)

@app.route('/blockchain/search=<id_transaction>',methods=['GET'])
def getTopic(id_transaction):
    
    response = []
    for block in blockchain:
        if block['hash'] == id_transaction:
            response.append(block)
    
    return jsonify(response)
    

if __name__ == '__main__':
    app.run(debug=True)


