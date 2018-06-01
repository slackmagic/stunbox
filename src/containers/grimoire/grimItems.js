import React from 'react';
import Nav from "./grimNav";
import Title from "./grimTitle";
import GrimHeader from "./grimHeader";
import GrimCardList from "./grimCardList";
import GrimTableList from "./grimTableList";
import Footer from "../../components/footer/Footer";
import { Icon, Header, Container, Segment, Dimmer, Loader, Card, Image, Grid, Button } from 'semantic-ui-react'
import ReactTable from "react-table";
import 'react-table/react-table.css';

const SUPPORTS_LIST = "/api/itemstore/support/bytype/";
const TYPE_BY_ID = "/api/itemstore/type/";
const ITEMS_BY_TYPE = "/api/itemstore/item/bytype/";
const ITEMS_BY_SUPPORT = "/api/itemstore/item/bysupport/";
const API_ACCESS_TOKEN = "1234567890-ABCDEFGH";
const ID_ACCESS_TOKEN = sessionStorage.getItem('access-token');

class GrimoireItems extends React.Component {

    state = {
        isLoading: true,
        supports: [],
        items: [],
        currentType: this.props.match.params.typeid,
        currentSupport: undefined,
    }

    componentDidMount() {

        this.refreshTypes();
        this.refreshSupports();

        //_Support selection
        //-------------------------------------------------------
        this.setState({
            currentSupport: this.props.match.params.supportid
        }, this.refreshItems());
    }

    refreshTypes() {
        //_Load TYPE
        //-------------------------------------------------------
        fetch(`${TYPE_BY_ID}${this.props.match.params.typeid}`,
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
            .then(data => this.setState({ type: data }))
            .catch(error => this.setState({ error }));
    }

    refreshSupports() {
        //_Load SUPPORTS
        //-------------------------------------------------------
        fetch(`${SUPPORTS_LIST}${this.props.match.params.typeid}`,
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
            .then(data => this.setState({ supports: data }))
            .then(supports => console.log(this.state))
            .catch(error => this.setState({ error }));
    }

    refreshItems() {

        console.log("refreshItemsOnType: " + this.state.currentType);
        console.log("refreshItemsOnSupport: " + this.state.currentSupport);

        //_Load ITEMS
        //-------------------------------------------------------
        var strURL = undefined;
        if (this.state.currentSupport === undefined) {
            strURL = ITEMS_BY_TYPE + this.state.currentType;
        }
        else {
            strURL = ITEMS_BY_SUPPORT + this.state.currentSupport;
        }

        fetch(`${strURL}`,
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
            .then(data => this.setState({ items: data, isLoading: false }))
            .then(supports => console.log(this.state))
            .catch(error => this.setState({ error }));

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