import React, { Component } from 'react'

import { Panel, Grid, Row, Col, Button, ProgressBar, Well } from 'react-bootstrap'
import LoadingModule from '../../components/loading'
import '../../'

import { Link } from 'react-router-dom'
import Api from '../../services/Api'


export default class Send extends Component {



    state = {
        api: null,
        dataBlockchain: this.props.location.state.dataBlockchain,
        teleporterId: this.props.location.state.teleporterId,
        job: this.props.location.state.job,
        destinyUniverse: this.props.location.state.destinyUniverse,
        now: 50
    }

    render() {

        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={12}>
                        <Panel>
                            <Panel.Body>
                                <h1>Teleportador Interuniversal</h1>
                                <h2 className="title-info">Codenome do passageiro: <span className="info">{this.state.dataBlockchain.warrior.name}</span></h2>
                                <h2 className="title-info">Identificação do teletransporte: <span className="info">{this.state.teleporterId}</span></h2>
                                <h2 className="title-info">Origem: <span className="info">{this.state.dataBlockchain.warrior.oUniverse}</span></h2>
                                <h2 className="title-info">Destino: <span className="info">{this.state.destinyUniverse}</span></h2>
                                <h2 className="title-info">Trabalho realizado: <span className="info">{this.state.job}</span></h2>
                            </Panel.Body>
                        </Panel>
                        <Well>Envio realizado com sucesso! Até a volta!</Well>
                        <Link to="/forms"> <Button bsStyle="success">Nova Operação</Button></Link>
                                
                    </Col>

                </Row>
            </Grid>

        )
    }

}