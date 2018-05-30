import React from 'react';
import Nav from "./grimNav";
import Title from "./grimTitle";
import GrimHeader from "./grimHeader";
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

        const columns = [{
            Header: 'Name',
            accessor: 'reference.name'
        },
        {
            Header: 'Support',
            accessor: 'support_id',
            Cell: row => (
                <div style={{ textAlign: 'center' }} >
                    <span className="badge badge-info">{row.value}</span>
                </div >
            )
        },
        /*
        {
            Header: 'Created on',
            accessor: 'created_on',
            Cell: row => (
                <div style={{ textAlign: 'center' }} >
                    {new Date(row.value).toLocaleDateString("fr-FR")}
                </div >
            )
        },*/
        {
            Header: 'Actions',
            accessor: 'uuid',
            Cell: row => (
                <div style={{ textAlign: 'center' }} >
                    <Button color='blue' href={row.value}>Modifier</Button>
                </div >
            )
        }]

        return (
            <div>
                <GrimHeader />
                <Container fluid>
                    <br />
                    <Grid>
                        <Grid.Column mobile={1} tablet={1} computer={1} />
                        <Grid.Column mobile={2} tablet={2} computer={2}>
                            <Nav supports={this.state.supports} onChange={this.navChange} />
                        </Grid.Column>
                        <Grid.Column mobile={12} tablet={12} computer={12}>
                            <Dimmer.Dimmable as={Segment} dimmed={this.state.isLoading}>
                                <Dimmer onClickOutside={this.handleHide} active={this.state.isLoading} inverted>
                                    <Loader size='huge' inverted>Chargement</Loader>
                                </Dimmer>
                                <ReactTable
                                    data={this.state.items}
                                    filterable
                                    defaultFilterMethod={(filter, row) => String(row[filter.id]).toLowerCase().includes(filter.value.toLowerCase())}
                                    columns={columns}
                                    defaultSorted={[{ id: "reference.name" }]}
                                    defaultPageSize={25}
                                    className="-striped -highlight"
                                />
                            </Dimmer.Dimmable>
                        </Grid.Column>
                        <Grid.Column mobile={1} tablet={1} computer={1} />
                    </Grid>
                    <hr />
                    <Footer />

                </Container >
            </div >
        );
    }

}

export default GrimoireItems;