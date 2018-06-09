import React from 'react';
import GrimNav from '../components/grimNav';
import GrimHeader from "../components/grimHeader";
import { Container } from 'semantic-ui-react';
import Itemstore from "../../../utils/helix/helixItemstore";

import "react-table/react-table.css";
import "../../../css/background.css";

class GrimoireItem extends React.Component {

    state = {
        isLoading: true,
        currentID: this.props.match.params.itemid,
        currentItem: undefined,
    }

    componentDidMount() {
        Itemstore.supportsByType(this.props.match.params.itemid)
            .then(data => this.setState({ currentItem: data, isLoading: false }));

    }

    render() {

        return (
            <div>
                <Container fluid>
                    <GrimNav />
                    <GrimHeader />
                    {this.props.match.params.itemid}
                </Container>
            </div >
        );
    }

}

export default GrimoireItem;