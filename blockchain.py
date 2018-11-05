''' Segue a resolução do "Desafio Morty" proposto.
Durante a confecção do código acabei por misturar inglês com o português na nomenclatura das variáveis, metodos e funções
para evitar a utilização de acentos e caracteries especiais.

Desenvolvi apenas a aplicação sem a User Interface, para executar, sugiro o PostMann, as instruções de uso seguem no Headme
'''

from time import time
from uuid import uuid4
from flask import Flask, jsonify, request
from urllib.parse import urlparse

import hashlib
import json
import requests


class Blockchain:
    def __init__(self):
        self.elos = []
        self.transaction_atual = []
        self.novo_bloco(hash_anterior=1, prova=100, raiz_merkle=self.hash(self.elos)) #Tem a função de criar o primeiro bloco
        self.nodes = set() #O Set() garante que cada nó só apareça uma única vez.

        #Cria um novo bloco com as características especificadas e o adiciona a lista de blocos (elos)
    def novo_bloco(self, prova, raiz_merkle, hash_anterior=None):
        bloco = {
            'index': len(self.elos), #+ 1,
            'timestamp': time(),
            'transaction': self.transaction_atual,
            'prova': prova,
            'hash_anterior': hash_anterior or self.hash(self.elos),
            'raiz_Merkle': raiz_merkle,
            'Nome': "Icaro Mota",
            'Filiation': "Aliança - Red Dragons - 1521001",
            'Ultimo relatorio': "Status: Estável e confiável. Ideal para missões de reconhecimento devido a sua criatividade e habilidade de aprender e se adaptar a situações adversas.",
            'Perfil': "Pragmático e Resiliente. Obs: Sua resiliencia deve ser bem dosada pelos superiores, agente possui demasiada tendencia a visão ideológica de mundo."
        }
        #atualiza os elos anteriores com a nova raiz da arvore
        for i in self.elos:
            i['raiz_Merkle'] = raiz_merkle

        self.transaction_atual = [] #Limpa a lista de transações
        self.elos.append(bloco)
        return bloco

        #Adiciona a nova transação a lista de transações e retorna o indice do próximo bloco a ser adicionado
    def nova_transaction(self, remetente, recebedor, quantidade, viajantes):
        self.transaction_atual.append({
            'viajantes': viajantes,
            'remetente': remetente,
            'recebedor': recebedor,
            'quantidade': quantidade
        })
        return self.ultimo_bloco['index']# + 1

        #Realiza o trabalho de mineração, buscando uma prova válida que atenda aos requisitos (iniciar com 2 zeros seguidos)
    def prova_de_trabalho(self, ultima_prova):
        prova = 0
        while self.prova_valida(ultima_prova, prova) is False:
            prova += 1
        return prova

        #Adiciona um novo nó à lista de nó's
    def register_node(self, address):
        parsed_url = urlparse(address) #O endereço tem formato de URL
        self.nodes.add(parsed_url.netloc)

        #Determina se o elo fornecido é válido
    def elo_valido(self, elos):
        ultimo_bloco = elos[0]
        current_index = 1
        self.merkle_tree(self.elos)
        #checa todos os elos
        while current_index < len(elos):
            bloco = elos[current_index]
            print(f'{ultimo_bloco}')
            print(f'{bloco}')
            print('\n------------\n')

            #Se a hash do bloco anterior for diferente da fornecida pelo algoritmo (checagem) o bloco não é válido
            if bloco['hash_anterior'] != self.hash(ultimo_bloco):
                return False
            #O mesmo teste é realizado para a prova
            if not self.prova_valida(ultimo_bloco['prova'], bloco['prova']):
                return False

            ultimo_bloco = bloco
            current_index += 1

        return True

        #Algorítimo de consenso. Resolve conflitos substituindo os elos mais longos
    def resolve_conflitos(self):
        neighbours = self.nodes
        novo_elo = None

        max_length = len(self.elos) #Busca por elos mais longos do que o atual.

        #Verifica cada Elo de todos os nós da rede
        for node in neighbours:
            response = requests.get(f'http://{node}/chain')

            if response.status_code == 200:
                elo = response.json()['Elo']
                comprimento = response.json()['Comprimento']

                #Verifica se o comprimento é maior e se o elo é válido
                if comprimento > max_length and self.elo_valido(elo):
                    max_length = comprimento
                    novo_elo = elo
        #Se um elo válido, maior do que o nosso for encontrado, substitui pelo nosso elo.
        if novo_elo:
            self.elos = novo_elo
            return True

        return False

        #Metodo que cria as hashs de merkle, função recursiva.
    def merkle_tree(self, elos):
        rodadas = int()
        rodadas += 1

        if len(elos) == 1:
            print("\n Raiz Merkle")
            return self.hash(elos[0])
        transaction_list = []

        for i in range(0, len(elos) - 1, 2):
            transaction_list.append(self.soma_hash(self.hash(self.elos[i]), self.hash(self.elos[i + 1])))
        if len(elos) % 2 == 1:
            transaction_list.append(self.soma_hash(self.hash(self.elos[-1]), self.hash(self.elos[-1])))
        print("Round [", rodadas, "] - Branchs [", len(elos), "]")

        return transaction_list[-1]
        #self.merkle_tree(transaction_list)

    #Recebe as hashs de cada um dos blocos e realiza a soma deles
    @staticmethod
    def soma_hash(hash1, hash2):
        h1 = json.dumps(hash1, sort_keys=True).encode()
            #binascii.hexlify(bytes(hash1, 'utf-8'))
        h2 = json.dumps(hash2, sort_keys=True).encode()
            #binascii.hexlify(bytes(hash2, 'utf-8'))
        h = hashlib.sha256(hashlib.sha256(h1+h2).digest()).digest()
        return hashlib.sha256(h).hexdigest()
        #binascii.hexlify(bytes(h, "utf-8"))

    #Recebe a última prova e a nova (gerada em prova_de_trabalho) como parametros e "hashea" elas até atenderem o requisito
    @staticmethod
    def prova_valida(ultima_prova, prova):
        guess = f'{ultima_prova}{prova}'.encode()
        guess_hash = hashlib.sha256(guess).hexdigest()
        return guess_hash[:2] == "00" #Para dificultar mais o processo de mineração, bastaria adicionar mais zeros consecutivos.

    #Cria a Hash do bloco por inteiro usando criptografria SHA 256
    @staticmethod
    def hash(bloco):
        block_string = json.dumps(bloco, sort_keys=True).encode()
        return hashlib.sha256(block_string).hexdigest()

    @property
    def ultimo_bloco(self):
        return self.elos[-1]

#Instancia do nó (usando o framework Flask)
app = Flask(__name__)

#Gera um endereço aleatório geral para o nó
node_identifier = str(uuid4()).replace('-', '')

#Instancia da classe Blockchain
blockchain = Blockchain()

'''Daqui em diante serão criados os endpoints, as URLs da nossa blockchain como uma API.
            É aqui que serão executadas as funções acima descritas'''


#A rota de mineração que terá o GET como requisição HTTP
@app.route('/mine', methods=['GET'])
def mine():
    last_block = blockchain.ultimo_bloco #Instancia do ultimo bloco adicionado passando apenas o cabeçalho
    proof = blockchain.prova_de_trabalho(last_block) #Executa o metodo prova_de_trabalho e guarda a nova prova no objeto proof
    merkle = blockchain.merkle_tree(blockchain.elos) #Executa o metodo merkle_tree passando os elos como parâmetro

    blockchain.nova_transaction(
        viajantes="Robô: Marvin",
        remetente="Nossa Dimensão: " + node_identifier,
        recebedor="Dimensão: C-132",
        quantidade=42
    ) #Nos recompensa pelo "trabalho" com uma transação
    #Executa o metodo nova_transaction, com o endereço gerado aleatoriamente no parâmetro recipient

    previous_hash = blockchain.hash(last_block) #Guarda a Hash resultante do ultimo bloco no objeto previous_hash
    block = blockchain.novo_bloco(proof, merkle, previous_hash) #Instancia (forja) o novo bloco

    response = {
        'index': block['index'],
        'transaction': block['transaction'],
        'prova': block['prova'],
        'hash_anterior': block['hash_anterior'],
        'raiz_Merkle': block['raiz_Merkle'],
        'Nome': block['Nome'],
        'Filiação': block['Filiation'],
        'Ultimo relatorio': block['Ultimo relatorio'],
        'Perfil': block['Perfil'],
        'Mensagem': "Parabéns soldado, missão cumprida!"
    }
    return jsonify(response), 200


#A rota que gera a nova transação que terá o POST como requisição HTTP
@app.route('/transactions/new', methods=['POST'])
def new_transaction():
    values = request.get_json()
    required = ['remetente', 'recebedor', 'quantidade', 'viajantes']

    if not all(k in values for k in required): #Garantia de que todos os dados foram adicionados
        return 'Missing Values', 400

    #guarda o indice do próximo bloco.
    index = blockchain.nova_transaction(values['viajantes'], values['remetente'], values['recebedor'], values['quantidade'])
    response = {'message': f'Transporte realizado com sucesso! A transação será adicionada ao Bloco {index} viajante!'} #Avisa qual bloco receberá a nova transação.
    return jsonify(response), 201


#A rota que retorna o "Elo" criado através do metodo GET
@app.route('/chain', methods=['GET'])
def full_chain():
    response = {
        'Elo': blockchain.elos,
        'Comprimento': len(blockchain.elos)
    }
    return jsonify(response), 200


#Rota responsável por aceitar e adicionar novos 'nó's' em uma lista
@app.route('/nodes/register', methods=['POST'])
def register_nodes():
    values = request.get_json()
    nodes = values.get('nodes')

    if nodes is None:
        return "Error: Por favor, informe uma lista de nós válidos",

    for node in nodes:
        blockchain.register_node(node)

    response = {
        'Mensagem': 'Novos nós adicionados!',
        'Total_nodes': list(blockchain.nodes)
    }

    return jsonify(response)


#Rota para resolver conflitos e garantir que cada nó está com seu devido "elo"
@app.route('/nodes/resolve', methods=['GET'])
def consensus():
    replaced = blockchain.resolve_conflitos()

    #Se houver conflito mostra o novo elo.
    if replaced:
        response = {
            'Mensagem': "O Elo foi substituido",
            'Novo_elo': blockchain.elos[-1]
        }
    else:
        response = {
            'Mensagem': "O Elo não foi substituido",
            'Elo': blockchain.elos[-1]
        }

    return jsonify(response)

#Executa o programa e roda a aplicação da porta 5000
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)