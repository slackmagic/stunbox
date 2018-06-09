import React from 'react';
import GrimBar from "./grimBar";
import GrimNav from "../components/grimNav";
import GrimHeader from "../components/grimHeader";
import GrimCardList from "./grimItemListCards";
import { Container, Segment, Dimmer, Loader, Grid } from 'semantic-ui-react';
import Itemstore from "../../../utils/helix/helixItemstore";

import "react-table/react-table.css";

class GrimoireItemList extends React.Component {

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

    refreshItems(id) {

        if (this.props.match.params.collid === undefined) {
            Itemstore.itemsByType(this.props.match.params.typeid)
                .then(data => this.setState({ items: this.filterItems(data), isLoading: false }));
        }
        else {
            Itemstore.itemsByCollection(this.props.match.params.collid)
                .then(data => this.setState({ items: this.filterItems(data), isLoading: false }));
        }
    }

    filterItems(data) {
        return data.filter(item => (this.state.currentSupport === undefined) || (item.support_id === this.state.currentSupport));
    }

    navChange = (id) => {
        if (id === "all") id = undefined;
        this.setState({ isLoading: true, currentSupport: id }, this.refreshItems(id));
    }

    render() {

        return (
            <div>
                <Container fluid>
                    <GrimNav />
                    <GrimHeader />
                    <Grid>
                        <Grid.Row>
                            <Grid.Column computer={1} tablet={1} only='computer tablet' />
                            <Grid.Column mobile={16} tablet={14} computer={14}>
                                <GrimBar supports={this.state.supports} onChange={this.navChange} />
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

export default GrimoireItemList;