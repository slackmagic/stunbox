import React from 'react';
import GrimHeader from "../components/grimHeader";
import { Header, Container, Segment, Dimmer, Loader, Grid } from 'semantic-ui-react';
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
                {this.props.match.params.itemid}
            </div >
        );
    }

}

export default GrimoireItem;