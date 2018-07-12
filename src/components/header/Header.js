import React from 'react';
import { Menu, Dropdown } from 'semantic-ui-react'
import RightHeaderMenu from "./RightHeaderMenu";

const bcolor = 'grey';
const mcolor = 'violet';

class Header extends React.Component {

  state = {}
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {

    return (
      <Menu color={bcolor} size='large' fluid stackable>
        <Menu.Item header><span role="img" aria-label="Stunbox">📦</span>&nbsp;STUNBOX</Menu.Item>
        <Dropdown item text='Applications' color={mcolor} pointing>
          <Dropdown.Menu>
            <Dropdown.Item href='grimoire/' color={mcolor} text='Grimoire' onClick={this.handleItemClick} />
            <Dropdown.Item href='grimoire' color={mcolor} text='UserManagement' onClick={this.handleItemClick} />
            <Dropdown.Item href='grimoire' color={mcolor} text='Wishlist' onClick={this.handleItemClick} />
            <Dropdown.Item href='grimoire' color={mcolor} text='NewApp' onClick={this.handleItemClick} />
          </Dropdown.Menu>
        </Dropdown>
        <RightHeaderMenu />
      </Menu>
    );
  }
}

export default Header;