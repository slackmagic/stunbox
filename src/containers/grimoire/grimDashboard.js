import React from 'react';
import GrimNav from './components/grimNav';
import GrimHeader from "./components/grimHeader";
import GrimCardList from "./collection/grimCollList";
import Itemstore from "../../utils/helix/helixItemstore";
import Formatter from "../../utils/helix/helixFormatter";
import { Grid, Container, Segment, Dimmer, Loader } from 'semantic-ui-react'

class GrimoireDashboard extends React.Component {

    state = {
        isLoading: true,
        collections: [],
        typeList: [],
    }

    componentDidMount() {
        Itemstore.collectionList()
            .then(data => this.setState({ collections: data }));
        Itemstore.typeList()
            .then(data => this.setState({ typeList: Formatter.typeToHashmap(data), isLoading: false }));
    }

    render() {
        console.log(this.state.typeList);

        var map = {};

        map["key1"] = "one";
        map["key2"] = "two";
        map["key3"] = "three";
        console.log(map);

        return (
            <div>
                <Container fluid>
                    <GrimNav />
                    <GrimHeader icon="book" title="Collection" subtitle="Liste des collections disponibles" />
                    <Grid>
                        <Grid.Row>
                            <Grid.Column computer={1} tablet={1} only='computer tablet' />
                            <Grid.Column mobile={16} tablet={14} computer={14}>
                                <Dimmer.Dimmable as={Segment} dimmed={this.state.isLoading}>
                                    <Dimmer onClickOutside={this.handleHide} active={this.state.isLoading} inverted>
                                        <Loader size='huge' inverted>Chargement</Loader>
                                    </Dimmer>
                                    <br />
                                    <GrimCardList collections={this.state.collections} typeList={this.state.typeList} />

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