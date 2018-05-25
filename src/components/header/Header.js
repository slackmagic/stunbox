import React from 'react';
import { Menu, Button } from 'semantic-ui-react'

const bcolor = 'gray';
const mcolor = 'violet';

class Header extends React.Component {

  state = {}
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {

    const { activeItem } = this.state

    return (
      <div>
        <Menu color={bcolor} size='large' fluid stackable>
          <Menu.Item header><span role="img" aria-label="Stunbox">📦</span>&nbsp;STUNBOX</Menu.Item>
          <Menu.Item color={mcolor} name='Grimoire' active={activeItem === 'Grimoire'} onClick={this.handleItemClick} />
          <Menu.Item color={mcolor} name='UserManagement' active={activeItem === 'UserManagement'} onClick={this.handleItemClick} />
          <Menu.Item color={mcolor} name='NewApp' active={activeItem === 'NewApp'} onClick={this.handleItemClick} />
          <Menu.Item color={mcolor} name='Wishlist' active={activeItem === 'Wishlist'} onClick={this.handleItemClick} />

          <Menu.Menu position='right'>
            <Menu.Item><Button>Log-in</Button></Menu.Item>
          </Menu.Menu>
        </Menu>

        <br /><br />
      </div>

    );
  }
}

export default Header;