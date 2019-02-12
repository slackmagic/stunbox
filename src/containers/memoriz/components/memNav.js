import React from 'react';
import { Menu, Button, Dropdown, Grid } from 'semantic-ui-react'

class MemorizHeader extends React.Component {

    state = {}

    handleItemClick = (e, data) => {
        this.setState({ activeItem: data.name });
    }

    render() {
        return (
            <Grid fluid="true">
                <Grid.Row columns={16} only='computer tablet' fluid="true">
                    <Menu color='brown' fluid stackable  >
                        <Menu.Item header><span role="img" aria-label="Stunbox"></span>&nbsp;STUNBOX.Memoriz</Menu.Item>
                        <Menu.Item><Button color='green'>Nouveau</Button></Menu.Item>
                        <Menu.Menu position='right'>
                            <Menu.Item href='login'><Button color='yellow'>Se déconnecter</Button></Menu.Item>
                        </Menu.Menu>
                    </Menu>
                </Grid.Row>
                <Grid.Row columns={16} only='mobile' fluid="true">
                    <Menu color='violet' stackable fluid>
                        <Dropdown item text='&nbsp;STUNBOX.Memoriz'>
                            <Dropdown.Menu>
                                <Menu.Item><Button color='green'>Nouveau</Button></Menu.Item>
                                <Menu.Item href='login'><Button color='yellow'>Se déconnecter</Button></Menu.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu>
                </Grid.Row>
            </Grid >
        );
    }
}

export default MemorizHeader;