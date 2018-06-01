import React from 'react';
import { Button, Card, Label } from 'semantic-ui-react'
import ReactTable from "react-table";
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


        console.log(myData);

        return (
            <Card.Group itemsPerRow={4} stackable>
                {
                    myData.map(item =>
                        <Card href='#card-example-link-card' color={options[item.support_id]}>
                            <Card.Content>
                                <Card.Header>{item.reference.name}</Card.Header>
                                <Card.Meta>
                                    {item.uuid}
                                </Card.Meta>
                                <Card.Description>

                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>

                                <Label size='tiny' color={options[item.support_id]} horizontal>{item.support_id}</Label>
                                <Label color='gray' size='tiny' horizontal basic>Laurent</Label>
                                <Label color='gray' size='tiny' horizontal basic>Laure</Label>
                            </Card.Content>
                        </Card>)
                }
            </Card.Group >
        );
    }
}

export default GrimoireCardList;