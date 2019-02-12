import React from 'react';
import Formatter from "../../../services/helix/helixFormatter";
import { Modal, Container, Header, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types'

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
                        <Header as='h2'>
                            {this.state.entry.title}
                            <Header.Subheader> {Formatter.dateToText(this.state.entry.created_on, "créée le ")}</Header.Subheader>
                        </Header>
                        <Divider />
                        {this.state.entry.content}
                        <Divider />

                    </Container>


                </Modal.Content>

            </Modal >
        )
    }
}

export default memEntryModal