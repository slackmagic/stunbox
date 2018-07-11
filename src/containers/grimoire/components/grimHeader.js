import React from 'react';
import { Header, Grid, Icon } from 'semantic-ui-react';
import "../../../css/background.css";

class GrimoireHeader extends React.Component {
    render() {
        return (
            <Grid fluid="true">
                <Grid.Row className='headerBg heightbg'>
                    <Grid.Column computer={1} tablet={1} only='computer tablet' />
                    <Grid.Column mobile={16} tablet={14} computer={14}>
                        <Header as='h3' className='headerFont' inverted>
                            <Icon name={this.props.icon} />
                            <Header.Content>
                                {this.props.title}
                                <Header.Subheader>{this.props.subtitle}</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Grid.Column>
                    <Grid.Column computer={1} tablet={1} only='computer tablet' />
                </Grid.Row>
            </Grid>
        );
    }
}

export default GrimoireHeader;
