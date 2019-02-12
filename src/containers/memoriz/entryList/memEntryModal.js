import React from 'react';
import Formatter from "../../../services/helix/helixFormatter";
import MemEditor from "../components/memEditor";
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
                        <Form>
                            <Header as='h2'>
                                <Form.Input fluid placeholder='Titre' value={this.state.entry.title} />
                                <Header.Subheader> {Formatter.dateToText(this.state.entry.created_on, "créée le ")}</Header.Subheader>
                            </Header>

                        </Form>
                        <MemEditor />
                        <Divider />
                        {this.state.entry.content}
                        <div id='here'></div>
                        <Divider />

                    </Container>


                </Modal.Content>

            </Modal >
        )
    }
}

export default memEntryModal