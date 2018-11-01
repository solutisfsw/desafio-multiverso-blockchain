import React from 'react';


import Side from './sidenav';
import BlockChain from '../blockchain/blockchain';
import { Modal, Button } from 'react-materialize';


export default class Content extends React.Component {

    constructor(props) {
        super(props);
     
        this.state = {
            i: 1
            
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNome = this.handleNome.bind(this);
    }
   

    handleNome(e) {
        this.setState({data:e.target.value})
    }

    handleSubmit(e) {
  
        this.setState({
            nome: this.state.nome,
            universo: this.state.i++
            
        });
        
        e.preventDefault();
     
    }

   

    render() {
        return(
            <div className="section white">
            <div className="row container">
                <h2 className="header">Multiverso</h2>
                <p className="grey-text text-darken-3 lighten-3">
                 Bem Vindo ao Multiverso, meu nome é Mateus e 
                 juntos iremos viajar entre os mundos, quando estiver pronto basta pressionar o botão
                 para atraversarmos o portal, eu já configurei para que ele possa nos levar a outros universos.
               </p>
             
               <Modal
                header='Portal'
                trigger={<Button>Viajar</Button>}>
                <form onSubmit={this.handleSubmit}>
                    
                    <Button type="submit" >Viajar</Button >
                </form>
                <p>Universo  {this.state.i}</p>
                <BlockChain data='Mateus' />
               
                </Modal>
                
            </div>
           
            <div className="container row">
                <Side />
               
            </div>
        </div>

        );
    }

        
    
}