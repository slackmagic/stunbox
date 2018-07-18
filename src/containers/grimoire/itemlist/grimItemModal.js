import React from 'react'
import { Header, Modal } from 'semantic-ui-react';

const inlineStyle = {
    modal: {
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
};

class grimItemModal extends React.Component {


    state = {
        item: { reference: {} },
    }

    handleModalClose = (e) => {
        e.preventDefault();
        this.props.onClose(e);
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({ item: nextProps.item });
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return nextProps.item !== undefined;
    }

    render() {
        console.log(this.state);
        return (
            <Modal size="large" style={inlineStyle.modal} open={this.props.open} onClose={this.handleModalClose}>
                <Modal.Header>{this.state.item.reference.name}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Header></Header>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

export default grimItemModal