import React from 'react';
import GrimNav from '../components/grimNav';
import GrimHeader from "../components/grimHeader";
import { Container, Loader, Segment, Dimmer, Form, Grid, Header, Icon, Divider } from 'semantic-ui-react';
import SaveMessage from "../../../components/saveMsg";
import Itemstore from "../../../utils/helix/helixItemstore";
import Userstore from "../../../utils/helix/helixUserstore";
import Formatter from "../../../utils/helix/helixFormatter";
import GrimItemSteps from "./grimItemSteps";

import "react-table/react-table.css";
import "../../../css/background.css";

class GrimoireItem extends React.Component {

    state = {
        isLoading: true,
        isUpdated: undefined,
        errMessage: "",
        currentID: this.props.match.params.itemid,
        item: {
            id: -1, reference: {}
        },
        supportList: [],
        userList: [],
    }

    componentDidMount() {

        if (this.state.currentID !== undefined) {
            Itemstore.itemByUuid(this.props.match.params.itemid)
                .then(data => {
                    this.setState({ item: data });
                    console.log(data);
                });
        }

        Itemstore.supportsByType('game')
            .then(data => this.setState({ supportList: Formatter.supportToDropdown(data) }));

        Userstore.userList()
            .then(data => this.setState({ userList: Formatter.userToDropdown(data), isLoading: false }));

        console.log(this.state);

    }

    onItemChange = (e, data) => {
        e.preventDefault();
        const itemToUpdate = this.state.item;
        itemToUpdate[data.name] = data.value;
        this.setState({ item: itemToUpdate, isUpdated: undefined });
        console.log(this.state);
    }

    onRefChange = (e, data) => {
        e.preventDefault();
        const itemToUpdate = this.state.item;
        itemToUpdate['reference'][data.name] = data.value;
        this.setState({ item: itemToUpdate, isUpdated: undefined });
    }

    render() {

        return (
            <div>
                <Container fluid>
                    <GrimNav />
                    <GrimHeader />
                    <Grid>
                        <Grid.Row>
                            <Grid.Column computer={3} tablet={3} only='computer tablet' />
                            <Grid.Column mobile={16} tablet={10} computer={10}>
                                <SaveMessage isCorrectlyUpdated={this.state.isUpdated} errMessage={this.state.errMessage} />
                                <Header as='h3' attached='top'>
                                    <Icon name='edit' circular />
                                    <Header.Content>
                                        Objet
                                        <Header.Subheader>Saisir les informations de l'objet.</Header.Subheader>
                                    </Header.Content>
                                </Header>
                                <Dimmer.Dimmable as={Segment} dimmed={this.state.isLoading}>
                                    <Dimmer onClickOutside={this.handleHide} active={this.state.isLoading} inverted>
                                        <Loader size='huge' inverted>Chargement</Loader>
                                    </Dimmer>
                                    <Form>
                                        <Form.Group widths='equal'>
                                            <Form.Input name='name' label='Nom' placeholder='Nom' value={this.state.item.reference.name || ''} onChange={this.onRefChange} required />
                                        </Form.Group>
                                        <Form.Select name='support_id' fluid label='Support' placeholder='Choisissez un support' options={this.state.supportList} value={this.state.item.support_id || ''} onChange={this.onItemChange} required />
                                        <Form.Input name='edition' label='Edition' placeholder='Edition' value={this.state.item.edition || ''} onChange={this.onItemChange} />
                                        <Form.Checkbox toggle name='is_collector_edition' label='Collector' value={this.state.item.is_collector_edition || ''} onChange={this.onItemChange} />
                                        <Form.Input name='url' label='URL' placeholder='URL' value={this.state.item.edition || ''} onChange={this.onItemChange} />
                                        <Form.TextArea name='comment' label='Commentaire' placeholder='Commentaire' value={this.state.item.comment || ''} onChange={this.onItemChange} />
                                    </Form>
                                    <br />
                                    <Form.Button type='submit' onClick={this.onSubmit}>Modifier</Form.Button>
                                </Dimmer.Dimmable>
                            </Grid.Column>
                            <Grid.Column computer={3} tablet={3} only='computer tablet' />
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        );
    }

}

export default GrimoireItem;