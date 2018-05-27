import React from 'react';
import AppHeader from "../../components/header/Header";
import AppFooter from "../../components/footer/Footer";
import { Icon, Header, Container, Segment } from 'semantic-ui-react'

class Main extends React.Component {
    render() {
        return (
            <div>
                <AppHeader />
                <Container textAlign='center'>
                    <Segment Raised>
                        <Header as='h1' icon>
                            <Icon name='cube' color='blue' />STUNBOX
                    <Header.Subheader>Home applications & more.</Header.Subheader>
                        </Header>
                    </Segment>
                    <AppFooter />
                </Container>
            </div>
        );
    }
}

export default Main;