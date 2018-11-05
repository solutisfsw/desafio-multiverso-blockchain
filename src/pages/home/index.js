import React, { Component } from 'react'

import { Panel, Grid, Row, Col, Button } from 'react-bootstrap'

import { Link } from 'react-router-dom'


export default class Home extends Component {

    render() {

        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={12}>
                        <Panel>
                            <Panel.Body>
                                <h1>Teleportador Interuniversal</h1>
                                <p>Meu nome é Bruno e apresento minha solução de teleportador interuniversal que irá me teletransportar para um novo universo para iniciar a exploração.</p>
                                <Link to="/forms"> <Button bsStyle="success">Começar Operação</Button></Link>
                                
                            
                            </Panel.Body>
                        </Panel>
                    </Col>

                </Row>
            </Grid>

        )
    }

}