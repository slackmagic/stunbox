import React from 'react';
import { Menu, Button, Dropdown } from 'semantic-ui-react'

const mcolor = 'violet';

class RightHeaderMenu extends React.Component {

    state = {}

    render() {

        return (
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
        );
    }
}

export default RightHeaderMenu;