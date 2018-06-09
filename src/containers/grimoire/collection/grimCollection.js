import React from 'react';
import GrimNav from '../components/grimNav';
import GrimHeader from "../components/grimHeader";
import { Container, Loader, Segment, Dimmer, Form, Grid } from 'semantic-ui-react'
import Itemstore from "../../../utils/helix/helixItemstore";
import 'react-table/react-table.css';

class GrimoireCollection extends React.Component {

    state = {
        isLoading: true,
        currentID: this.props.match.params.collid,
        collection: {},
    }

    componentDidMount() {
        Itemstore.collectionByUuid(this.props.match.params.collid)
            .then(data => this.setState({ collection: data, isLoading: false }));
    }

    save = () => {
        console.log(this.state);
    };

    onSubmit = (e) => {
        e.preventDefault();
        alert("Name change: " + this.state.collection.name);
        this.save();
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
                                        <Form.Group widths='equal'>
                                            <Form.Input fluid label='Nom' placeholder='Nom' value={this.state.collection.name || ''} required />
                                        </Form.Group>
                                        <Form.Group widths='equal'>
                                            <Form.Input fluid label='Couleur' placeholder='Couleur' value={this.state.collection.color || ''} />
                                        </Form.Group>
                                    </Form>
                                    <Form.Button type='submit' onClick={this.onSubmit} >Modifier</Form.Button>
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
