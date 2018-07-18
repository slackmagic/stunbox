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

    handleModalClose = (e) => {
        e.preventDefault();
        this.props.onClose(e);
    }

    render() {
        if (this.props.item !== undefined) {

            return (
                <Modal defaultOpen={true} size="large" style={inlineStyle.modal} onClose={this.handleModalClose}>
                    <Modal.Header>{this.props.item.reference.name}</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Header></Header>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            )
        }
        else {
            return ("")
        }
    }
}

export default grimItemModal