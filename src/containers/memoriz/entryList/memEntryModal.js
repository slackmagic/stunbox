import React from 'react';
import MemorizStore from "../../../services/helix/helixMemorizStore";
import StunboxService from "../../../services/stunbox/stunboxService";
import MemEditor from "../components/memEditorHtml";
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

class memEntryModal extends React.Component {

    static contextTypes = {
        router: PropTypes.object
    }

    state = {
        entry: {},
        isCreation: false,
        isUpdated: false,
    }

    handleModalClose = (e) => {
        e.preventDefault();
        if (this.state.isUpdated) {
            if (this.state.isCreation) {

                var entryToCreate = this.state.entry;
                entryToCreate.owner = StunboxService.getMyUUID();
                entryToCreate.data = {};
                entryToCreate.archived = false;
                entryToCreate.labels = [];
                entryToCreate.id = -1;

                this.setState({ entry: entryToCreate });

                MemorizStore.newEntry(this.state.entry).then(this.closeProperly(e));
            }
            else {
                MemorizStore.updateEntry(this.state.entry).then(this.closeProperly(e));
            }
        } else { this.closeProperly(e); }
    }

    closeProperly(e) {
        this.props.onClose(e);
    }

    onEntryChange = (e, data) => {
        e.preventDefault();
        const entryToUpdate = this.state.entry;
        entryToUpdate[data.name] = data.value;
        this.setState({ entry: entryToUpdate, isUpdated: true });
    }


    handleEditorChange = (value) => {
        var entryToUpdate = this.state.entry;
        entryToUpdate.content = value;

        this.setState({ entry: entryToUpdate, isUpdated: true });
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({ entry: nextProps.item });
        this.setState({ isCreation: nextProps.item === undefined || nextProps.item.uuid === undefined })

    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return nextProps.item !== undefined;
    }

    handleDeleteClick = (e) => {
        e.preventDefault();
        MemorizStore.deleteEntry(this.state.entry).then(this.closeProperly(e));
    }

    render() {
        return (
            <Modal style={inlineStyle.modal} open={this.props.open} onClose={this.handleModalClose}>
                <Modal.Content>
                    <Container fluid>
                        <Input fluid icon='sticky note' iconPosition='left' transparent placeholder='Titre (facultatif)' name='title' size='large' value={this.state.entry.title || ''} onChange={this.onEntryChange} />
                        <Divider />
                        <MemEditor value={this.state.entry.content} onChange={this.handleEditorChange} />
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
                                    <Label size='mini'><Icon name='clock' />{Formatter.dateToText(this.state.entry.created_on, "créé le ")}</Label>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </Modal.Content>

            </Modal >
        )
    }
}

export default memEntryModal