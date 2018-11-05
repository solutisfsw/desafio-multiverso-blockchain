[![N|Solid](http://solutis.com.br/images/logo.png)](http://solutis.com.br)

# NOSSO DESAFIO
“Você considera a ideia de multiverso, e pensa nessa estrutura como uma rede de infinitas possibilidades”. Parabéns soldado! Você foi selecionado para ser enviado a um novo universo. Porém as tecnologias existentes não conseguem garantir sua segurança durante a transferência entre universos. Você precisa criar uma Blockchain para registrar uma transação com segurança para o novo universo. Para isso sua Blockchain precisa possuir no mínimo as seguintes funções: 
- Mineração (ex: poder computacional que o soldado vai ter que utilizar para criar um novo bloco para transação entre universos)
- Transação (ex: registrar a ida do soldado para o outro universo no bloco da sua Blockchain)
- Conteúdo (ex: nome e habilidades do soldado)
    - Considere também que as características de seu personagem tenham alguma relação com você na vida real, assim a gente já lhe conhece melhor.

### NOME:
ICARO DE SANTANA MOTA

### E-MAIL:
ICAROSAN_11@HOTMAIL.COM

### PLATAFORMA

### INTERFACE
Python

### TESTES
- Não se aplica.

### BUILD E EXECUÇÃO

Para a execução do programa desenvolvido serão necessários a instalação e importação de alguns pacotes do Python (Vesão 3.6), são eles:

- Pipenv - $ pip install pipenv
- Time
- uuid (uuid4) - $ pip install uuid
- flask - $ pip install Flask
- hashlib - $ pip install hashlib
- json - $ pip install pandas
- request - $ pip install requests
- urllib - $ pip install urllib3

Todas as importações são feitas no código do desafio.

A aplicação que desenvolvi não possui User Interface, para executá-la recomendo o uso do Postman (aplicativo que pode ser instalado no Google Chrome) ou usando o cURL.
Passos:
- Executar o programa: $ python blockchain.py
- O aviso de que a aplicação esta rodando na por 5000 irá aparecer.
- No postman basta informar a url (http://localhost:5000) e completar com um dos caminhos desejados.
- Para a função de mineração: http://localhost:5000/mine e mude a requesição para o tipo GET, clique em Send.
- O resultado irá aparecer (pode ser usada várias vezes, minerando mais blocos).
- Para ver a totalidade das correntes (todos os blocos): http://localhost:5000/chain com requisição GET, clique em Send.
- Serão mostrados todos os blocos minerados no nó.
- Para postar uma transação: http://localhost:5000/transactions/new com requisição POST, mudar para a aba -Body- e mudar o tipo da informação para JSON(aplication/json).
- Feito isto basta preencher o corpo com a transação "Remetente, recebedor, quantidade e viajantes" (pode ser copiado de um dos blocos criados para facilitar) e clicar em Send
- Para registrar outros nós na rede é possível utilizar novas portas da máquina, mas é possível exemplificar com o próprio nó (endereço)
- Basta modificar o endereço no postman http://localhost:5000/nodes/register e na aba -Body- com infomação do tipo JSON e requisição POST informar o endereço do nó a se adcionar (ex: {"nodes": ["http://127.0.0.1:5000"]} ) clique em Send.
- Agora é possível resolver conflitos, no endereço do postman informe http://localhost:5000/nodes/resolve com requisição GET, basta clicar em Send.
- Como utilizamos o próprio endereço, não ocorrerá mudanças.

#Estas foram todas as aplicações desenvolvidas em meu projeto.
