import React from 'react';
import MemorizStore from "../../services/helix/helixMemorizStore";
import MemCardList from "./entryList/memEntryCardList";
import MemEntryModal from "./entryList/memEntryModal";
import MemBoardModal from "./entryList/memBoardModal";
import MemNav from './components/memNav';
import MemBar from './entryList/memBar';
import MemHeader from "./components/memHeader";
import { Grid, Container, Segment, Dimmer, Loader } from 'semantic-ui-react'

class MemorizDashboard extends React.Component {

    state = {
        isLoading: true,
        isEntryModalOpen: false,
        isBoardModalOpen: false,
        activeEntry: undefined,
        activeBoard: {},
        entryList: [],
        labelList: [],
    }

    componentDidMount() {
        this.refreshEntryList();
    }

    refreshEntryList() {
        MemorizStore.entryList()
            .then(data => this.setState({ entryList: data, isLoading: false }));
    }

    cardChange = (data) => {
        if (data !== undefined)
            this.setState({ activeEntry: data, isEntryModalOpen: true });
    }

    modalClose = (e) => {
        e.preventDefault();
        this.setState({ isLoading: true, isEntryModalOpen: false, isBoardModalOpen: false });
        this.refreshEntryList();

    }

    navChange = (event) => {
        switch (event.type) {
            case 'new':
                this.setState({ activeEntry: { content: '' }, isEntryModalOpen: true });
                break;
            case 'search':
                break;
            case 'filter':
                break;
            default:
                break;
        }
    }

    boardChange = (board) => {
        switch (board.uuid) {
            case 'new':
                this.setState({ isBoardModalOpen: true });
                break;
            default:

                if (board.uuid != "main") {
                    MemorizStore.entryListByBoard(board.uuid)
                        .then(data => this.setState({ entryList: data, isLoading: false }));
                } else {
                    this.refreshEntryList();
                }

                break;
        }
    }

    render() {

        return (
            <div>
                <Container fluid>
                    <MemNav board={{ uuid: 'main', title: 'Principal' }} onChange={this.boardChange} />
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
                                    <MemBoardModal item={this.state.activeBoard} open={this.state.isBoardModalOpen} onClose={this.modalClose} />
                                    <MemEntryModal item={this.state.activeEntry} open={this.state.isEntryModalOpen} onClose={this.modalClose} />
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
