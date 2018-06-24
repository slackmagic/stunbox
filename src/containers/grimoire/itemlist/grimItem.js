import React from 'react';
import GrimNav from '../components/grimNav';
import GrimHeader from "../components/grimHeader";
import { Container, Loader, Segment, Dimmer, Form, Grid, Dropdown, Label } from 'semantic-ui-react';
import SaveMessage from "../../../components/saveMsg";
import Itemstore from "../../../utils/helix/helixItemstore";
import Userstore from "../../../utils/helix/helixUserstore";
import Formatter from "../../../utils/helix/helixFormatter";

import "react-table/react-table.css";
import "../../../css/background.css";

class GrimoireItem extends React.Component {

    state = {
        isLoading: true,
        isUpdated: undefined,
        errMessage: "",
        currentID: this.props.match.params.itemid,
        item: { id: -1, reference: {} },
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

        Itemstore.supportsByType(this.props.match.params.itemid)
            .then(data => this.setState({ supportList: data }));

        Userstore.userList()
            .then(data => this.setState({ userList: Formatter.userToDropdown(data), isLoading: false }));

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
                                <SaveMessage isCorrectlyUpdated={this.state.isUpdated} errMessage={this.state.errMessage} />
                                <Dimmer.Dimmable as={Segment} dimmed={this.state.isLoading}>
                                    <Dimmer onClickOutside={this.handleHide} active={this.state.isLoading} inverted>
                                        <Loader size='huge' inverted>Chargement</Loader>
                                    </Dimmer>
                                    <Form>
                                        <Form.Group widths='equal'>
                                            <Form.Input name='name' label='Nom' placeholder='Nom' value={this.state.item.reference.name || ''} onChange={this.onCollChange} required />
                                        </Form.Group>
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