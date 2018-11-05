import React, { Component } from 'react'

import { Panel, Grid, Row, Col, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Alert } from 'react-bootstrap'

import { Link } from 'react-router-dom'
import Api from '../../services/Api'
import LoadingModule from '../../components/loading'


export default class Forms extends Component {

    constructor(props, context) {
        super(props, context)
        this.state.api = new Api()
    }

    state = {
        api: null,
        show: false,
        originUniverse: '',
        destinyUniverse: '',
        valueInputCodeName: '',
        coordinateOrigin: 0,
        coordinateDestiny: 0,
        distance: 0,
        dataBlockchain: null,
        teleporterId: null,
        job: null,
        openLoading: false
    }



    sendDataForBlockchain = async () => {
        this.setState({ openLoading: true })
        this.state.api.selectWarrior(this.state.valueInputCodeName, this.state.originUniverse)
        this.state.api.setDestiny(this.state.destinyUniverse, this.state.distance)

        let trip = await this.state.api.startTrip()
        let teleporterId = trip.teleporterId
        let content = trip.content
        let job = trip.job


        this.setState({ dataBlockchain: content, teleporterId: teleporterId, job: job })

    }

    FieldGroup({ id, label, help, ...props }) {
        return (
            <FormGroup controlId={id}>
                <ControlLabel>{label}</ControlLabel>
                <FormControl {...props} />
                {help && <HelpBlock>{help}</HelpBlock>}
            </FormGroup>
        );
    }

    Alert = () => {
        return (
            <Alert bsStyle="warning" onDismiss={this.handleDismiss}>
                A distancia do universo {this.state.originUniverse} para {this.state.destinyUniverse} é {this.state.distance}
            </Alert>
        )
    }


    handleDismiss = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    sendData = async () => {

        if (this.state.originUniverse === '' || this.state.destinyUniverse === '' || this.state.valueInputCodeName === '') {
            alert('Por favor preencha os dados')
        } else {
            await this.sendDataForBlockchain()
            let jsonDataBlockchain = JSON.parse(this.state.dataBlockchain)

            this.props.history.push({
                pathname: '/send',
                search: '?query=abc',
                state: {
                    dataBlockchain: jsonDataBlockchain,
                    teleporterId: this.state.teleporterId,
                    job: this.state.job,
                    destinyUniverse: this.state.destinyUniverse
                }
            })
        }


    }

    handleChangeCodeName = (event) => {
        this.setState({ valueInputCodeName: event.target.value })
    }

    handleChangeOriginuniverse = (event) => {
        this.setState({ originUniverse: event.target.value })

    }

    handleChangeDestinyuniverse = (event) => {
        this.setState({ destinyUniverse: event.target.value })
        
        switch (event.target.value) {
            case "Via Lactea":
                this.setState({ distance: 1 });
                break;
            case "Terra C-137":
                this.setState({ distance: 2 });
                break;
            case "Realidade C500-A":
                this.setState({ distance: 3 });
                break;
            case "Buttworld":
                this.setState({ distance: 4 });
                break;
            case "J19-Zeta-7":
                this.setState({ distance: 5 });
                break;

            default:
                break;
        }
        // this.calcDistance()
    }



    render() {

        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={12}>
                        <Panel>
                            <Panel.Body>
                                <h1>Teleportador Interuniversal</h1>
                                <div className={this.state.openLoading ? 'display-true' : 'display-false'} >
                                    <LoadingModule open={this.state.openLoading} />
                                </div>
                                <form>
                                    <this.FieldGroup
                                        id="formCodenome"
                                        type="text"
                                        label="Primeiro, qual será meu codenome nessa missão?"
                                        placeholder="Codenome"
                                        onChange={this.handleChangeCodeName}
                                    />

                                    <FormGroup controlId="formControlsSelectMultiple">
                                        <ControlLabel>Universo de origem</ControlLabel>
                                        <FormControl onChange={this.handleChangeOriginuniverse} componentClass="select" multiple>
                                            <option value="Via Lactea">Via Lactea</option>
                                            <option value="Terra C-137">Terra C-137</option>
                                            <option value="Realidade C500-A">Realidade C500-A</option>
                                            <option value="Buttworld">Buttworld</option>
                                            <option value="J19-Zeta-7">J19-Zeta-7</option>
                                        </FormControl>
                                    </FormGroup>

                                    <FormGroup controlId="formControlsSelectMultiple">
                                        <ControlLabel>Universo de destino</ControlLabel>
                                        <FormControl onChange={this.handleChangeDestinyuniverse} componentClass="select" multiple>
                                            <option value="Via Lactea">Via Lactea</option>
                                            <option value="Terra C-137">Terra C-137</option>
                                            <option value="Realidade C500-A">Realidade C500-A</option>
                                            <option value="Buttworld">Buttworld</option>
                                            <option value="J19-Zeta-7">J19-Zeta-7</option>
                                        </FormControl>
                                    </FormGroup>

                                    <HelpBlock>Por ser uma versão inicial, a lista de universos é baseada em universos já conhecidos.</HelpBlock>

                                    <this.Alert></this.Alert>

                                </form>

                                <Button bsStyle="success" onClick={() => this.sendData()}>Teletransportar</Button>

                            </Panel.Body>
                        </Panel>
                    </Col>

                </Row>
            </Grid>



        )
    }

}