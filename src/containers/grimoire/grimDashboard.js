import React from 'react';
import GrimHeader from './grimHeader';
import GrimCardList from "./collection/grimCollCardList";
import AppFooter from "../../components/footer/Footer";
import { Grid, Header, Container, Segment, Dimmer, Loader } from 'semantic-ui-react'

const COLLECTIONS_LIST = "/api/itemstore/collection/all";
const API_ACCESS_TOKEN = "1234567890-ABCDEFGH";
const ID_ACCESS_TOKEN = sessionStorage.getItem('access-token');

class GrimoireDashboard extends React.Component {

    state = {
        isLoading: true,
        collections: [],
    }


    componentDidMount() {
        this.refreshCollection();
    }

    refreshCollection() {
        //_Load TYPE
        //-------------------------------------------------------
        fetch(`${COLLECTIONS_LIST}`,
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-api-key': API_ACCESS_TOKEN,
                    'Authorization': 'Bearer ' + ID_ACCESS_TOKEN
                }
            }
        )
            .then(response => response.json())
            .then(data => this.setState({ collections: data, isLoading: false }))
            .catch(error => this.setState({ error }));
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