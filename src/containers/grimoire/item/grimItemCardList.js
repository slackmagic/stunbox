import React from 'react';
import { Card, Label } from 'semantic-ui-react'
import 'react-table/react-table.css';

class GrimoireCardList extends React.Component {


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
            <Card.Group itemsPerRow={4} stackable>
                {
                    myData.map(item =>
                        <Card href={"./GAME/" + item.uuid} color={options[item.support_id]} key={item.id}>
                            < Card.Content >
                                <Card.Header>{item.reference.name}</Card.Header>
                                <Card.Meta>{item.created_on}</Card.Meta>
                                <Card.Description>

                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>

                                <Label size='tiny' color={options[item.support_id]} horizontal>{item.support_id}</Label>
                                <Label color='grey' size='tiny' horizontal basic>Laurent</Label>
                                <Label color='grey' size='tiny' horizontal basic>Laure</Label>
                            </Card.Content>
                        </Card>)
                }
            </Card.Group >
        );
    }
}

export default GrimoireCardList;