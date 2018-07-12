import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react';

const inlineStyle = {
    modal: {
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
};

class grimItemModal extends React.Component {

    render() {
        return (
            <Modal trigger={<Button>Basic Modal</Button>} defaultOpen={true} size="large" style={inlineStyle.modal} >
                <Modal.Header>Select a Photo</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Header>Default Profile Image</Header>
                        <p>We've found the following gravatar image associated with your e-mail address.</p>
                        <p>Is it okay to use this photo?</p>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

export default grimItemModal