import React from 'react';
import { Card, Label } from 'semantic-ui-react'
import Formatter from "../../../services/helix/helixFormatter";
import 'react-table/react-table.css';

class GrimoireItemCardList extends React.Component {

    handleItemClick = (e, data) => {
        e.preventDefault();
        this.props.onChange(data.item);
    }


    render() {
        const myData = [].concat(this.props.items)
            .sort((a, b) => a.reference.name.toLowerCase().localeCompare(b.reference.name.toLowerCase()));

        const options = {
            gameSWI: 'red',
            gameXBO: 'green',
            gamePS4: 'blue',
            gamePS3: 'teal',
        };

        return (
            <Card.Group itemsPerRow={3} stackable>
                {
                    myData.map(item =>
                        <Card onClick={this.handleItemClick} color={options[item.support_id]} item={item} key={item.uuid}>
                            <Card.Content >
                                <Card.Header>{item.reference.name}</Card.Header>
                                <Card.Meta>{Formatter.dateToText(item.created_on, "créée le ")}</Card.Meta>

                            </Card.Content>
                            <Card.Content extra>
                                <Label size='mini' color={options[item.support_id]} horizontal>{this.props.supports[item.support_id]}</Label>
                                {
                                    item.owners.map(owner =>
                                        <Label color='grey' size='mini' horizontal basic key={owner}>{this.props.users[owner]}</Label>
                                    )
                                }
                            </Card.Content>
                        </Card>)
                }
            </Card.Group >
        );
    }
}

export default GrimoireItemCardList;;