import React from 'react';
import { Header, Grid } from 'semantic-ui-react';
import "../../../css/background.css";

class GrimoireHeader extends React.Component {
    render() {
        return (
            <Grid fluid="true">
                <Grid.Row className='background4 heightbg'>
                    <Grid.Column computer={1} tablet={1} only='computer tablet' />
                    <Grid.Column mobile={16} tablet={14} computer={14}>
                        <Header as='h2' inverted>{this.props.title}</Header>
                        <p>{this.props.subtitle}</p>
                    </Grid.Column>
                    <Grid.Column computer={1} tablet={1} only='computer tablet' />
                </Grid.Row>
            </Grid>
        );
    }
}

export default GrimoireHeader;
