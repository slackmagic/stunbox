import React from 'react';
import MemorizStore from "../../../services/helix/helixMemorizStore";
import MemEditor from "../components/memEditorHtml";
import Formatter from "../../../services/helix/helixFormatter";
import { Modal, Container, Divider, Input, Label, Icon } from 'semantic-ui-react';
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
        isUpdated: false,
    }

    handleModalClose = (e) => {
        e.preventDefault();
        this.props.onClose(e);
        if (this.state.isUpdated)
            MemorizStore.updateEntry(this.state.entry);

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
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return nextProps.item !== undefined;
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
                        <Label size='mini'><Icon name='clock' />{Formatter.dateToText(this.state.entry.created_on, "créé le ")}</Label>
                        <Label size='mini'><Icon name='keyboard' />{this.state.entry.uuid}</Label>
                    </Container>
                </Modal.Content>

            </Modal >
        )
    }
}

export default memEntryModal