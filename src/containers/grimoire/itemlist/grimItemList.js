import React from 'react';
import { Container, Segment, Dimmer, Loader, Grid } from 'semantic-ui-react';
import Formatter from "../../../services/helix/helixFormatter";
import Itemstore from "../../../services/helix/helixItemstore";
import Userstore from "../../../services/helix/helixUserstore";
import GrimBar from "./grimBar";
import GrimNav from "../components/grimNav";
import GrimHeader from "../components/grimHeader";
import GrimCardList from "./grimItemCardList";
import GrimItemModal from "./grimItemModal";

import "react-table/react-table.css";

class GrimoireItemList extends React.Component {

    state = {
        isLoading: true,
        isModalOpen: false,
        activeItem: undefined,
        supports: [],
        items: [],
        users: [],
        collection: {},
        currentCollection: this.props.match.params.collid,
        currentType: this.props.match.params.typeid,
        currentSupport: this.props.match.params.supportid,
    }

    componentDidMount() {
        if (this.state.currentCollection !== undefined) {
            Itemstore.collectionByUuid(this.props.match.params.collid)
                .then(data => {
                    this.setState({ collection: data });

                    Itemstore.supportsByType(data.type_id)
                        .then(data => this.setState({ supports: data }));

                    Userstore.userList()
                        .then(data => this.setState({ users: data }));
                });
        }

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

    cardChange = (data) => {
        if (data !== undefined)
            this.setState({ activeItem: data, isModalOpen: true });
    }

    modalClose = (e) => {
        e.preventDefault();
        this.setState({ isModalOpen: false });
    }

    render() {

        return (
            <div>
                <Container fluid>
                    <GrimNav />
                    <GrimHeader icon="play" title={this.state.collection.name} subtitle="Contenu de la collection" />
                    <Grid>
                        <Grid.Row>
                            <Grid.Column computer={1} tablet={1} only='computer tablet' />
                            <Grid.Column mobile={16} tablet={14} computer={14}>
                                <GrimBar collection={this.state.collection.uuid} supports={this.state.supports} onChange={this.navChange} />
                                <Dimmer.Dimmable as={Segment} dimmed={this.state.isLoading}>
                                    <Dimmer onClickOutside={this.handleHide} active={this.state.isLoading} inverted>
                                        <Loader size='huge' inverted>Chargement</Loader>
                                    </Dimmer>
                                    <br />
                                    <GrimItemModal item={this.state.activeItem} open={this.state.isModalOpen} onClose={this.modalClose} />
                                    <GrimCardList items={this.state.items} supports={Formatter.supportToHashmap(this.state.supports)} users={Formatter.userToHashmap(this.state.users)} onChange={this.cardChange} />
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