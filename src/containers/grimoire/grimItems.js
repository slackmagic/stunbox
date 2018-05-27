import React from 'react';
import Nav from "./grimNav";
import Title from "./grimTitle";
import GrimHeader from "./grimHeader";
import Footer from "../../components/footer/Footer";
import { Icon, Header, Container, Segment, Card, Image, Grid } from 'semantic-ui-react'
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
        type: undefined,
        supports: [],
        items: [],
        currentSupport: undefined,
    }

    componentDidMount() {

        const state = this.state

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

        //_Support selection
        //-------------------------------------------------------
        state['currentSupport'] = this.props.match.params.supportid;


        //_Load ITEMS
        //-------------------------------------------------------
        var strURL = undefined;
        if (this.state.currentSupport === undefined) {
            strURL = ITEMS_BY_TYPE + this.props.match.params.typeid;
        }
        else {
            strURL = ITEMS_BY_SUPPORT + this.props.match.params.supportid;
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

    render() {

        const columns = [{
            Header: 'Name',
            accessor: 'reference.name'
        },
        {
            Header: 'Support',
            accessor: 'support_id',
            Cell: row => (
                <div style={{ textAlign: 'center' }} >
                    <span class="badge badge-info">{row.value}</span>
                </div >
            )
        },
        {
            Header: 'Created on',
            accessor: 'created_on',
            Cell: row => (
                <div style={{ textAlign: 'center' }} >
                    {new Date(row.value).toLocaleDateString("fr-FR")}
                </div >
            )
        },
        {
            Header: 'Actions',
            accessor: 'uuid',
            Cell: row => (
                <div style={{ textAlign: 'center' }} >
                    <a className="btn btn-primary btn-sm" href={row.value} role="button">Edit</a>
                </div >
            )
        }]

        if (this.state.isLoading) {
            return (
                <div>
                    <GrimHeader />
                    <Container textAlign='center'>

                        <h1>⏳...LOADING...⏳ </h1>
                        <hr />
                        <Footer />

                    </Container>
                </div>

            );
        }
        else {

            return (
                <div>
                    <GrimHeader />
                    <Container fluid>
                        <br />
                        <Grid>
                            <Grid.Column mobile={0} tablet={0} computer={1} />
                            <Grid.Column mobile={2} tablet={2} computer={2}>
                                <Nav supports={this.state.supports} />
                            </Grid.Column>
                            <Grid.Column mobile={14} tablet={12} computer={12}>
                                <ReactTable
                                    data={this.state.items}
                                    filterable
                                    defaultFilterMethod={(filter, row) => String(row[filter.id]).toLowerCase().includes(filter.value.toLowerCase())}
                                    columns={columns}
                                    defaultSorted={[{ id: "reference.name" }]}
                                    defaultPageSize={25}
                                    className="-striped -highlight"
                                />
                            </Grid.Column>
                            <Grid.Column mobile={0} tablet={0} computer={1} />
                        </Grid>
                        <hr />
                        <Footer />

                    </Container >
                </div >
            );
        }
    }
}

export default GrimoireItems;