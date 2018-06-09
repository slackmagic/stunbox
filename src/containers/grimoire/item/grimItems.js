import React from 'react';
import Nav from "../grimNav";
import GrimHeader from "../grimHeader";
import GrimCardList from "./grimItemCardList";
import { Header, Container, Segment, Dimmer, Loader, Grid } from 'semantic-ui-react';
import Itemstore from "../../../utils/helix/helixItemstore";

import "react-table/react-table.css";
import "../../../css/background.css";

class GrimoireItems extends React.Component {

    state = {
        isLoading: true,
        supports: [],
        items: [],
        currentCollection: this.props.match.params.collid,
        currentType: this.props.match.params.typeid,
        currentSupport: this.props.match.params.supportid,
    }

    componentDidMount() {
        Itemstore.supportsByType(this.props.match.params.typeid)
            .then(data => this.setState({ supports: data }));

        this.setState({
            currentSupport: this.props.match.params.supportid
        }, this.refreshItems());

    }

    refreshItems() {
        var strURL = undefined;
        if (this.state.currentSupport === undefined) {
            Itemstore.itemsByType(this.props.match.params.typeid)
                .then(data => this.setState({ items: data, isLoading: false }));
        }
        else {
            Itemstore.itemsBySupport(this.state.currentSupport)
                .then(data => this.setState({ items: data, isLoading: false }));
        }
    }

    navChange = (id) => {
        console.log("navRefresh: " + id);
        if (id === "all") {
            id = undefined;
        }
        this.setState({ isLoading: true, currentSupport: id }, this.refreshItems);
    }

    render() {

        const { active } = this.state

        return (
            <div>
                <Container fluid>
                    <GrimHeader />
                    <Grid fluid>
                        <Grid.Row className='background4 heightbg'>
                            <Grid.Column computer={1} tablet={1} only='computer tablet' />
                            <Grid.Column mobile={16} tablet={14} computer={14}>
                                <Header as='h2' inverted>GRIMOIRE</Header>
                                <p>Jeux vidéo</p>
                            </Grid.Column>
                            <Grid.Column computer={1} tablet={1} only='computer tablet' />
                        </Grid.Row>
                    </Grid>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column computer={1} tablet={1} only='computer tablet' />
                            <Grid.Column mobile={16} tablet={14} computer={14}>
                                <Nav supports={this.state.supports} onChange={this.navChange} />
                                <Dimmer.Dimmable as={Segment} dimmed={this.state.isLoading}>
                                    <Dimmer onClickOutside={this.handleHide} active={this.state.isLoading} inverted>
                                        <Loader size='huge' inverted>Chargement</Loader>
                                    </Dimmer>
                                    <br />
                                    <GrimCardList items={this.state.items} />
                                </Dimmer.Dimmable>
                            </Grid.Column>
                            <Grid.Column computer={1} tablet={1} only='computer tablet' />
                        </Grid.Row>
                    </Grid>
                </Container >
            </div >
        );
    }

}

export default GrimoireItems;