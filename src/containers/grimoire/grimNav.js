import React from 'react';
import { Menu, Input, Label } from 'semantic-ui-react'

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

            <Menu pointing vertical fluid stackable inverted>
                <Menu.Item name='all' active={activeItem === 'all'} onClick={this.handleItemClick}>
                    <Label color='teal'>1</Label>Tous</Menu.Item>
                {this.props.supports.map(support =>
                    <Menu.Item name={support.id} active={activeItem === support.id} onClick={this.handleItemClick}>
                        {support.name}</Menu.Item>
                )}

            </Menu>
        );
    }
}

export default GrimNav;
