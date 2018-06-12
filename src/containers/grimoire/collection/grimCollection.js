import React from 'react';
import GrimNav from '../components/grimNav';
import GrimHeader from "../components/grimHeader";
import { Container, Loader, Segment, Dimmer, Form, Grid, Dropdown } from 'semantic-ui-react'
import Itemstore from "../../../utils/helix/helixItemstore";
import Userstore from "../../../utils/helix/helixUserstore";
import Formatter from "../../../utils/helix/helixFormatter";
import 'react-table/react-table.css';

class GrimoireCollection extends React.Component {

    state = {
        isLoading: true,
        currentID: this.props.match.params.collid,
        collection: { id: -1 },
        owners: {},
        typeList: [],
        userList: [],
    }

    componentDidMount() {

        if (this.state.currentID !== undefined) {
            Itemstore.collectionByUuid(this.props.match.params.collid)
                .then(data => this.setState({ collection: data }));
        }
        Itemstore.typeList()
            .then(data => this.setState({ typeList: Formatter.typeToDropdown(data), isLoading: false }));

        Userstore.userList()
            .then(data => this.setState({ userList: Formatter.userToDropdown(data), isLoading: false }));
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.currentID === undefined) {
            Itemstore.newCollection(this.state.collection)
                .then(data => this.setState({ collection: data }));
        }
        else {
            Itemstore.updateCollection(this.state.collection)
                .then(data => this.setState({ collection: data }));
        }

        console.log(this.state);
    }

    onCollChange = (e, data) => {
        e.preventDefault();

        const collToUpdate = this.state.collection;
        collToUpdate[data.name] = data.value;
        this.setState({ collection: collToUpdate });

    }

    onOwnersChange = (e, data) => {
        e.preventDefault();
        this.setState({ owners: data.value });
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
                                <Dimmer.Dimmable as={Segment} dimmed={this.state.isLoading}>
                                    <Dimmer onClickOutside={this.handleHide} active={this.state.isLoading} inverted>
                                        <Loader size='huge' inverted>Chargement</Loader>
                                    </Dimmer>
                                    <Form>
                                        {this.state.currentID === undefined ? (
                                            <Form.Group widths='equal'>
                                                <Form.Input disabled name='uuid' label='uuid' placeholder='UUID' value={this.state.collection.uuid || ''}
                                                    onChange={this.onCollChange} required />
                                            </Form.Group>
                                        ) : (
                                                <Form.Group widths='equal'>
                                                    {this.state.collection.uuid}
                                                </Form.Group>
                                            )
                                        }

                                        {this.state.currentID === undefined ? (
                                            <Form.Group widths='equal'>
                                                <Form.Select disabled={this.state.collection.uuid !== undefined} name='type_id' options={this.state.typeList} fluid label='Type'
                                                    placeholder='Choisissez un type' value={this.state.collection.type_id || ''} onChange={this.onCollChange} required />
                                            </Form.Group>
                                        ) : (
                                                <Form.Group widths='equal'>
                                                    {this.state.collection.type_id}
                                                </Form.Group>
                                            )
                                        }


                                        <Form.Group widths='equal'>
                                            <Form.Input name='name' label='Nom' placeholder='Nom' value={this.state.collection.name || ''} onChange={this.onCollChange} required />
                                        </Form.Group>
                                        <Form.Group widths='equal'>
                                            <Form.Input name='color' label='Couleur' placeholder='Couleur' value={this.state.collection.color || ''} onChange={this.onCollChange} />
                                        </Form.Group>

                                        <Form.Group widths='equal'>
                                            <Dropdown name='owner' placeholder='Propriétaire(s)' fluid multiple search selection options={this.state.userList}
                                                onChange={this.onOwnersChange} />
                                        </Form.Group>
                                        <Form.Group widths='equal' />
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

export default GrimoireCollection;
