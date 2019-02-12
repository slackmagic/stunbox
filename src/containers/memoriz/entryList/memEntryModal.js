import React from 'react';
import Formatter from "../../../services/helix/helixFormatter";
import MemEditor from "../components/memEditorHtml";
import { Modal, Container, Header, Divider, Form } from 'semantic-ui-react';
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
    }

    handleModalClose = (e) => {
        e.preventDefault();
        this.props.onClose(e);
    }

    handleEditorChange = (value) => {
        var updatedEntry = this.state.entry;
        updatedEntry.content = value;

        this.setState({ entry: updatedEntry });
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({ entry: nextProps.item });
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return nextProps.item !== undefined;
    }

    render() {

        console.log(this.state);
        return (
            <Modal style={inlineStyle.modal} open={this.props.open} onClose={this.handleModalClose}>
                <Modal.Content>
                    <Container fluid>
                        <Divider />
                        <MemEditor value={this.state.entry.content} onChange={this.handleEditorChange} />
                        <Divider />
                    </Container>
                </Modal.Content>

            </Modal >
        )
    }
}

export default memEntryModal