import React from 'react';
import { Card, Label } from 'semantic-ui-react'
import Formatter from "../../../services/helix/helixFormatter";
import 'react-table/react-table.css';

class GrimoireItemCardList extends React.Component {

    render() {
        const myData = [].concat(this.props.items)
            .sort((a, b) => a.reference.name.toLowerCase().localeCompare(b.reference.name.toLowerCase()));

        const options = {
            gameSWI: 'red',
            gameXBO: 'green',
            gamePS4: 'blue',
            gamePS3: 'teal',
        };

        console.log("-------------------------------");
        console.log(this.props);
        console.log(this.props.users);
        return (
            <Card.Group itemsPerRow={4} stackable>
                {
                    myData.map(item =>
                        <Card href={"../../item/edit/" + item.uuid} color={options[item.support_id]} key={item.id}>
                            < Card.Content >
                                <Card.Header>{item.reference.name}</Card.Header>
                                <Card.Meta>{Formatter.dateToText(item.created_on, "créée le ")}</Card.Meta>
                                <Card.Description>

                                </Card.Description>
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