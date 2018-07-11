import React from 'react';
import { Menu, Button, Dropdown, Grid } from 'semantic-ui-react'

class GrimoireHeader extends React.Component {

  state = {}

  handleItemClick = (e, data) => {
    this.setState({ activeItem: data.name });
  }

  render() {

    return (

      <Grid fluid="true">
        <Grid.Row columns={16} only='computer tablet' fluid="true">
          <Menu color='violet' fluid stackable  >
            <Menu.Item header><span role="img" aria-label="Stunbox"></span>&nbsp;STUNBOX.Grimoire</Menu.Item>
            <Menu.Item name='📈 Tableau de bord' value='here' onClick={this.handleItemClick} />
            <Menu.Menu position='right'>
              <Menu.Item href='login'><Button color='violet'>Se déconnecter</Button></Menu.Item>
            </Menu.Menu>
          </Menu>
        </Grid.Row>
        <Grid.Row columns={16} only='mobile' fluid="true">
          <Menu color='violet' stackable fluid>
            <Dropdown item text='&nbsp;STUNBOX.Grimoire'>
              <Dropdown.Menu>
                <Menu.Item name='📈 Tableau de bord' onClick={this.handleItemClick} />
                <Menu.Item name='🎮 Jeux Vidéo' onClick={this.handleItemClick} />
                <Menu.Item name='💿 Films' onClick={this.handleItemClick} />
                <Menu.Item name='📚 Livres' onClick={this.handleItemClick} />
                <Menu.Item name='🎲 Jeux de société' onClick={this.handleItemClick} />
                <Menu.Item name='📦 Divers' onClick={this.handleItemClick} />
                <Menu.Item href='login'><Button color='violet'>Se déconnecter</Button></Menu.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu>
        </Grid.Row>
      </Grid >
    );
  }
}

export default GrimoireHeader;