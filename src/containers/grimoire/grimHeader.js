import React from 'react';
import { Menu, Button, Dropdown, Input, Label, Grid, Sidebar, Segment } from 'semantic-ui-react'

class GrimoireHeader extends React.Component {

  state = {}
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {

    const { activeItem } = this.state

    return (

      <Grid fluid>
        <Grid.Row columns={14} only='computer tablet' fluid>
          <Menu color='blue' fluid stackable inverted>
            <Menu.Item header><span role="img" aria-label="Stunbox"></span>&nbsp;STUNBOX.Grimoire</Menu.Item>
            <Menu.Item name='📈 Tableau de bord' onClick={this.handleItemClick} />
            <Menu.Item name='🎮 Jeux Vidéo' onClick={this.handleItemClick} />
            <Menu.Item name='💿 Films' onClick={this.handleItemClick} />
            <Menu.Item name='📚 Livres' onClick={this.handleItemClick} />
            <Menu.Item name='🎲 Jeux de société' onClick={this.handleItemClick} />
            <Menu.Item name='📦 Divers' onClick={this.handleItemClick} />
            <Menu.Menu position='right'>
              <Menu.Item href='login'><Button color='violet'>Se déconnecter</Button></Menu.Item>
            </Menu.Menu>
          </Menu>
        </Grid.Row>
        <Grid.Row columns={14} only='mobile' fluid>
          <Menu color='blue' inverted stackable fluid>
            <Dropdown item text='&nbsp;STUNBOX.Grimoire'>
              <Dropdown.Menu>
                <Menu.Item name='📈 Tableau de bord' onClick={this.handleItemClick} />
                <Menu.Item name='🎮 Jeux Vidéo' onClick={this.handleItemClick} />
                <Menu.Item name='💿 Films' onClick={this.handleItemClick} />
                <Menu.Item name='📚 Livres' onClick={this.handleItemClick} />
                <Menu.Item name='🎲 Jeux de société' onClick={this.handleItemClick} />
                <Menu.Item name='📦 Divers' onClick={this.handleItemClick} />
                <Menu.Item href='login'><Button color='red'>Se déconnecter</Button></Menu.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu>
        </Grid.Row>
      </Grid >
    );
  }
}

export default GrimoireHeader;