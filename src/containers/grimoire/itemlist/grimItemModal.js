import React from 'react';
import Formatter from "../../../services/helix/helixFormatter";
import { Modal, Label, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types'

const inlineStyle = {
    modal: {
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
};

class grimItemModal extends React.Component {

    static contextTypes = {
        router: PropTypes.object
    }


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

    handleEditClick = (e) => {
        e.preventDefault();
        this.context.router.history.push(`/grimoire/item/edit/` + this.state.item.uuid);
    }

    render() {

        const options = {
            gameSWI: 'red',
            gameXBO: 'green',
            gamePS4: 'blue',
            gamePS3: 'teal',
        };

        console.log(this.state);
        return (
            <Modal size="large" style={inlineStyle.modal} open={this.props.open} onClose={this.handleModalClose}>
                <Modal.Header>
                    {this.state.item.reference.name}<br />
                    <Label size="big" color={options[this.state.item.support_id]} horizontal>{this.state.item.support_id}</Label>
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>

                    </Modal.Description>
                    {Formatter.dateToText(this.state.item.created_on, "créée le ")} <br />
                    {this.state.item.uuid}<br />
                    <Button icon labelPosition='left' onClick={this.handleEditClick} >
                        <Icon name='edit' />
                        Modifier l'objet
                    </Button>
                </Modal.Content>
            </Modal >
        )
    }
}

export default grimItemModal