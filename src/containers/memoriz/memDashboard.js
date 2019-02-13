import React from 'react';
import MemorizStore from "../../services/helix/helixMemorizStore";
import MemCardList from "./entryList/memEntryCardList";
import MemEntryModal from "./entryList/memEntryModal";
import MemNav from './components/memNav';
import MemBar from './entryList/memBar';
import MemHeader from "./components/memHeader";
import { Grid, Container, Segment, Dimmer, Loader } from 'semantic-ui-react'

class MemorizDashboard extends React.Component {

    state = {
        isLoading: true,
        isModalOpen: false,
        activeEntry: undefined,
        entryList: [],
        labelList: [],
    }

    componentDidMount() {
        MemorizStore.entryList()
            .then(data => this.setState({ entryList: data, isLoading: false }));
    }

    cardChange = (data) => {
        if (data !== undefined)
            this.setState({ activeEntry: data, isModalOpen: true });
    }

    modalClose = (e) => {
        e.preventDefault();
        this.setState({ isModalOpen: false });
    }

    navChange = (event) => {
        switch (event.type) {
            case 'new':
                this.setState({ activeEntry: { content: '' }, isModalOpen: true });
                break;
            case 'search':
                break;
            case 'filter':
                break;
            default:
                break;
        }
    }

    render() {

        return (
            <div>
                <Container fluid>
                    <MemNav />
                    <MemHeader />
                    <Grid>
                        <Grid.Row>
                            <Grid.Column computer={1} tablet={1} only='computer tablet' />
                            <Grid.Column mobile={16} tablet={14} computer={14}>
                                <MemBar collection={this.state.entryList} supports={this.state.labelList} onChange={this.navChange} />
                                <Dimmer.Dimmable as={Segment} dimmed={this.state.isLoading}>
                                    <Dimmer onClickOutside={this.handleHide} active={this.state.isLoading} inverted>
                                        <Loader size='huge' inverted>Chargement</Loader>
                                    </Dimmer>
                                    <br />
                                    <MemEntryModal item={this.state.activeEntry} open={this.state.isModalOpen} onClose={this.modalClose} />
                                    <MemCardList entryList={this.state.entryList} labelList={this.state.labelList} onChange={this.cardChange} />
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

export default MemorizDashboard;