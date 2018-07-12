import React from 'react';
import { Menu, Input, Label, Dropdown, Button, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'

class GrimNav extends React.Component {

    static contextTypes = {
        router: PropTypes.object
    }

    state = { activeItem: 'all', activeName: 'Tous' }

    handleItemClick = (e, { name, displayname }) => {
        e.preventDefault();
        this.setState({ activeItem: name })
        this.setState({ activeName: displayname })
        this.props.onChange(name);
    }

    handleAddNewClick = (e) => {
        e.preventDefault();
        this.context.router.history.push(`/grimoire/item/new/` + this.props.collection);
    }

    onNameChange = (e) => {
        e.preventDefault();
        this.setState({ namefilter: e.target.value });
        console.log(this.state);
    }

    render() {
        const { activeItem } = this.state;
        const { activeName } = this.state;
        return (

            <Menu pointing fluid stackable>
                <Menu.Item>
                    <Input size='large' name='namefilter' action={{ icon: 'search' }} placeholder='Recherche par titre...' onChange={this.onNameChange} />
                </Menu.Item>
                <Menu.Item>
                    <Button icon labelPosition='left' onClick={this.handleAddNewClick} >
                        <Icon name='plus' />
                        Ajouter nouveau
                    </Button>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Dropdown item text={'Support : ' + activeName}>
                        <Dropdown.Menu>
                            <Dropdown.Header icon='tags' content='Filtrer par support' />
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

export default GrimNav;