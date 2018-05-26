import React from 'react';
import { Menu, Button, Dropdown } from 'semantic-ui-react'

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
          <Dropdown item text='Applications' color={mcolor} pointing>
            <Dropdown.Menu>
              <Dropdown.Item href='grimoire' color={mcolor} text='Grimoire' onClick={this.handleItemClick} />
              <Dropdown.Item href='grimoire' color={mcolor} text='UserManagement' onClick={this.handleItemClick} />
              <Dropdown.Item href='grimoire' color={mcolor} text='Wishlist' onClick={this.handleItemClick} />
              <Dropdown.Item href='grimoire' color={mcolor} text='NewApp' onClick={this.handleItemClick} />
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Menu position='right'>
            <Dropdown item text='Profile' color={mcolor} pointing>
              <Dropdown.Menu>
                <Dropdown.Item icon='edit' text='Edit Profile' />
                <Dropdown.Item icon='globe' text='Choose Language' />
                <Dropdown.Divider />
                <Dropdown.Item icon='settings' text='Account Settings' />
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item href='login'><Button basic color='violet'>Se connecter</Button></Menu.Item>
          </Menu.Menu>
        </Menu>

        <br /><br />
      </div>

    );
  }
}

export default Header;