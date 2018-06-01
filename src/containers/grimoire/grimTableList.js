import React from 'react';
import { Button } from 'semantic-ui-react'
import ReactTable from "react-table";
import 'react-table/react-table.css';

class GrimoireTableList extends React.Component {


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

            <ReactTable
                data={this.props.items}
                filterable
                defaultFilterMethod={(filter, row) => String(row[filter.id]).toLowerCase().includes(filter.value.toLowerCase())}
                columns={columns}
                defaultSorted={[{ id: "reference.name" }]}
                defaultPageSize={25}
                className="-striped -highlight"
            />
        );
    }
}

export default GrimoireTableList;