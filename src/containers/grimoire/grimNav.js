import React from 'react';
import { Menu, Input, Label } from 'semantic-ui-react'

class CollMgrNav extends React.Component {

    state = { activeItem: 'inbox' }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state;

        return (

            <Menu vertical fluid stackable>
                <Menu.Item name='all' active={activeItem === 'all'} onClick={this.handleItemClick}>
                    <Label color='teal'>1</Label>Tous</Menu.Item>
                {this.props.supports.map(support =>
                    <Menu.Item name={support.id} active={activeItem === support.id} onClick={this.handleItemClick}>
                        <Label color='teal'>1</Label>{support.name}</Menu.Item>
                )}

            </Menu>
        );
    }
}

export default CollMgrNav;
