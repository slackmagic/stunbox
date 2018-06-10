import React from 'react';
import GrimNav from '../components/grimNav';
import GrimHeader from "../components/grimHeader";
import { Container, Loader, Segment, Dimmer, Form, Grid } from 'semantic-ui-react'
import Itemstore from "../../../utils/helix/helixItemstore";
import Formatter from "../../../utils/helix/helixFormatter";
import 'react-table/react-table.css';

class GrimoireCollection extends React.Component {

    state = {
        isLoading: true,
        currentID: this.props.match.params.collid,
        collection: {},
        typeList: [],
    }

    componentDidMount() {
        Itemstore.collectionByUuid(this.props.match.params.collid)
            .then(data => this.setState({ collection: data }));
        Itemstore.typeList()
            .then(data => this.setState({ typeList: Formatter.typeToDropdown(data), isLoading: false }));
    }

    onSubmit = (e) => {
        e.preventDefault();
    }

    onChange = (e, data) => {
        e.preventDefault();

        const collToUpdate = this.state.collection;
        collToUpdate[data.name] = data.value;
        this.setState({ collection: collToUpdate });

        console.log(this.state);
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
                                            <Form.Input name='name' label='Nom' placeholder='Nom' value={this.state.collection.name || ''} onChange={this.onChange} required />
                                        </Form.Group>
                                        <Form.Group widths='equal'>
                                            <Form.Input name='color' label='Couleur' placeholder='Couleur' value={this.state.collection.color || ''} onChange={this.onChange} />
                                        </Form.Group>
                                        <Form.Group widths='equal'>
                                            <Form.Select name='type_id' options={this.state.typeList} fluid label='Type' placeholder='Choisissez un type' value={this.state.collection.type_id || ''} onChange={this.onChange} />
                                        </Form.Group>
                                    </Form>
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
