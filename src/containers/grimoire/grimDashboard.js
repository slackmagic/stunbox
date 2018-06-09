import React from 'react';
import GrimHeader from './grimHeader';
import GrimCardList from "./collection/grimCollCardList";
import Itemstore from "../../utils/helix/helixItemstore";
import { Grid, Header, Container, Segment, Dimmer, Loader } from 'semantic-ui-react'

class GrimoireDashboard extends React.Component {

    state = {
        isLoading: true,
        collections: [],
    }

    componentDidMount() {
        Itemstore.collectionsList()
            .then(data => this.setState({ collections: data, isLoading: false }));
    }

    render() {
        return (
            <div>
                <Container fluid>
                    <GrimHeader />
                    <Grid fluid>
                        <Grid.Row className='background4 heightbg'>
                            <Grid.Column computer={1} tablet={1} only='computer tablet' />
                            <Grid.Column mobile={16} tablet={14} computer={14}>
                                <Header as='h2' inverted>Mes collections</Header>
                            </Grid.Column>
                            <Grid.Column computer={1} tablet={1} only='computer tablet' />
                        </Grid.Row>
                    </Grid>

                    <Grid fluid>
                        <Grid.Row>
                            <Grid.Column computer={1} tablet={1} only='computer tablet' />
                            <Grid.Column mobile={16} tablet={14} computer={14}>
                                <Dimmer.Dimmable as={Segment} dimmed={this.state.isLoading}>
                                    <Dimmer onClickOutside={this.handleHide} active={this.state.isLoading} inverted>
                                        <Loader size='huge' inverted>Chargement</Loader>
                                    </Dimmer>
                                    <br />
                                    <GrimCardList collections={this.state.collections} />

                                </Dimmer.Dimmable>
                            </Grid.Column>
                            <Grid.Column computer={1} tablet={1} only='computer tablet' />
                        </Grid.Row>
                    </Grid>


                </Container>


            </div >
        );
    }
}

export default GrimoireDashboard;