import React from 'react';
import { Menu, Input, Label, Dropdown, Icon } from 'semantic-ui-react'

class GrimNav extends React.Component {

    state = { activeItem: 'all', activeName: 'Tous' }
    handleItemClick = (e, { name, displayName }) => {
        e.preventDefault();
        this.setState({ activeItem: name })
        this.setState({ activeName: displayName })
        this.props.onChange(name);
    }

    render() {
        const { activeItem } = this.state;
        const { activeName } = this.state;

        return (

            <Menu pointing fluid stackable>
                <Menu.Item>
                    <Input size='large' action={{ icon: 'search' }} placeholder='Recherche par titre...' />
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Dropdown item text={'Support : ' + activeName}>
                        <Dropdown.Menu>
                            <Dropdown.Header icon='tags' content='Filter par support' />
                            <Menu.Item color='purple' displayName='Tous' active={activeItem === 'all'} onClick={this.handleItemClick}>
                                <Label color='teal'>1</Label>Tous
                            </Menu.Item>
                            {this.props.supports.map(support =>
                                <Dropdown.Item name={support.id} displayName={support.name} active={activeItem === support.id} onClick={this.handleItemClick}>
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
