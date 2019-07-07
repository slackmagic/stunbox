import React from 'react';
import { Menu, Input, Label, Dropdown, Button, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'

class MemBar extends React.Component {

    static contextTypes = {
        router: PropTypes.object
    }

    state = { activeItem: 'all', activeName: 'Tous' };
    event = { type: '', value: '' };

    handleItemClick = (e, { name, displayname }) => {
        e.preventDefault();
        this.setState({ activeItem: name })
        this.setState({ activeName: displayname })

        this.event.type = 'filter';
        this.event.value = name;

        this.props.onChange(this.event);
    }

    handleAddNewClick = (e) => {
        e.preventDefault();
        this.event.type = 'new';
        this.event.value = undefined;
        this.props.onChange(this.event);
    }

    handleSearch = (e, data) => {
        e.preventDefault();

        this.event.type = 'search';
        this.event.value = this.state.namefilter;
        this.props.onChange(this.event);
    }


    onNameChange = (e) => {
        e.preventDefault();
        this.setState({ namefilter: e.target.value });
    }

    render() {
        const { activeItem } = this.state;
        const { activeName } = this.state;
        return (

            <Menu pointing fluid stackable>
                <Menu.Item>
                    <Input size='large' name='namefilter' action={{ icon: 'search', onClick: this.handleSearch }} placeholder='Recherche dans le contenu...' onChange={this.onNameChange}>
                    </Input>
                </Menu.Item>
                <Menu.Item>
                    <Button icon labelPosition='left' onClick={this.handleAddNewClick} >
                        <Icon name='plus' />
                        Ajouter nouveau
                    </Button>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Dropdown item text={'Label : ' + activeName}>
                        <Dropdown.Menu>
                            <Dropdown.Header icon='tags' content='Filtrer par labels' />
                            <Menu.Item color='purple' displayname='Tous' active={activeItem === 'all'} onClick={this.handleItemClick}>
                                <Label color='teal'>1</Label>Tous
                            </Menu.Item>
                            {this.props.supports.map(support =>
                                <Dropdown.Item key={support.id} name={support.id} displayname={support.name} active={activeItem === support.id} onClick={this.handleItemClick}>
                                    {support.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Menu>
        );
    }
}

export default MemBar;