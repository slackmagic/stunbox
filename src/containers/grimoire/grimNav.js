import React from 'react';
import { Menu, Input, Label, Dropdown, Icon } from 'semantic-ui-react'

class GrimNav extends React.Component {

    state = { activeItem: 'all' }
    handleItemClick = (e, { name }) => {
        e.preventDefault();
        this.setState({ activeItem: name })
        this.props.onChange(name);
    }

    render() {
        const { activeItem } = this.state;

        return (

            <Menu pointing fluid stackable>
                <Menu.Item>
                    <Input action={{ icon: 'search' }} placeholder='Recherche par titre...' />
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Dropdown item text='Filtrer par support'>
                        <Dropdown.Menu>
                            <Menu.Item color='purple' name='Tous' active={activeItem === 'all'} onClick={this.handleItemClick}>
                                <Label color='teal'>1</Label>Tous
                            </Menu.Item>
                            {this.props.supports.map(support =>
                                <Dropdown.Item name={support.id} active={activeItem === support.id} onClick={this.handleItemClick}>
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
