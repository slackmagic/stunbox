import React from 'react';
import GrimHeader from './grimHeader';
import AppHeader from "../../components/header/Header";
import AppFooter from "../../components/footer/Footer";
import { Icon, Header, Container, Segment, Card, Image } from 'semantic-ui-react'

class GrimoireDashboard extends React.Component {

    state = {
        type: undefined,
        ref: undefined
    }

    componentDidMount() {
        const state = this.state
        state['type'] = this.props.match.params.typeid;
        state['ref'] = -1;
        this.setState(state);
    }

    render() {
        return (
            <div>
                <GrimHeader />
                <br /><br />
                <Container textAlign='center'>
                    <Segment Raised>
                        <Header as='h1' icon>
                            <Icon name='book' color='violet' />GRIMOIRE
                            <Header.Subheader>Gestion de collections</Header.Subheader>
                        </Header>
                    </Segment>
                    <Card.Group itemsPerRow={"3"}>
                        <Card>
                            <Header as='h1'>
                                <span role="img" aria-label="">🎮</span>
                            </Header>
                            <Card.Content>
                                <Card.Header>JEUX VIDEO</Card.Header>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Header as='h1'>
                                <span role="img" aria-label="">📚</span>
                            </Header>
                            <Card.Content>
                                <Card.Header>LIVRES</Card.Header>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Header as='h1'>
                                <span role="img" aria-label="">💿</span>
                            </Header>
                            <Card.Content>
                                <Card.Header>FILMS</Card.Header>
                            </Card.Content>
                        </Card>

                    </Card.Group>
                    <AppFooter />
                </Container>
            </div>
        );
    }
}

export default GrimoireDashboard;