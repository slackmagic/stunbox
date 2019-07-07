import React from 'react';
import MemorizStore from "../../../services/helix/helixMemorizStore";
import StunboxService from "../../../services/stunbox/stunboxService";
import Formatter from "../../../services/helix/helixFormatter";
import { Modal, Container, Divider, Input, Label, Icon, Button, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const inlineStyle = {
    modal: {
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
};

class memBoardModal extends React.Component {

    static contextTypes = {
        router: PropTypes.object
    }

    state = {
        board: {},
        isCreation: false,
        isUpdated: false,
    }

    handleModalClose = (e) => {
        e.preventDefault();
        if (this.state.isUpdated) {
            if (this.state.isCreation) {

                var boardToCreate = this.state.board;
                boardToCreate.owner = StunboxService.getMyUUID();
                boardToCreate.data = {};

                this.setState({ board: boardToCreate });

                MemorizStore.newBoard(this.state.board).then(this.closeProperly(e));
            }
            else {
                MemorizStore.updateBoard(this.state.board).then(this.closeProperly(e));
            }
        } else { this.closeProperly(e); }
    }

    closeProperly(e) {
        this.setState({ isUpdated: true });
        this.props.onClose(e);
    }

    onEntryChange = (e, data) => {
        e.preventDefault();
        const boardToUpdate = this.state.board;
        boardToUpdate[data.name] = data.value;
        this.setState({ board: boardToUpdate, isUpdated: true });
    }


    componentWillReceiveProps = (nextProps) => {
        this.setState({ board: nextProps.item });
        this.setState({ isCreation: nextProps.item === undefined || nextProps.item.uuid === undefined })

    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return nextProps.item !== undefined;
    }

    handleDeleteClick = (e) => {
        e.preventDefault();
        MemorizStore.deleteBoard(this.state.board).then(this.closeProperly(e));
    }

    render() {
        return (
            <Modal style={inlineStyle.modal} open={this.props.open} onClose={this.handleModalClose}>
                <Modal.Content>
                    <Container fluid>
                        <Input fluid icon='sticky note' iconPosition='left' transparent placeholder='Titre (facultatif)' name='title' size='large' value={this.state.board.title || ''} onChange={this.onEntryChange} />
                        <Divider />
                        <Grid>
                            <Grid.Row>
                                <Grid.Column floated='left' width={4}>
                                    <Button.Group>
                                        <Button icon>
                                            <Icon name='copy' />
                                        </Button>
                                        <Button icon onClick={this.handleDeleteClick}>
                                            <Icon name='trash' />
                                        </Button>
                                    </Button.Group>
                                </Grid.Column>
                                <Grid.Column floated='right' textAlign='right' width={12}>
                                    <Label size='mini'><Icon name='clock' />{Formatter.dateToText(this.state.board.created_on, "créé le ")}</Label>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </Modal.Content>

            </Modal >
        )
    }
}

export default memBoardModal