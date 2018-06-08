import React from 'react';
import { Card, Label } from 'semantic-ui-react'
import 'react-table/react-table.css';

class GrimoireCardList extends React.Component {


    render() {
        const ascData = [].concat(this.props.collections)
            .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

        console.log(ascData);
        console.log(this.props.locmation);

        return (
            <Card.Group itemsPerRow={4} stackable>
                {
                    ascData.map(collection =>
                        <Card href={collection.type_id + "/" + collection.uuid}>
                            < Card.Content >
                                <Card.Header>{collection.name}</Card.Header>
                                <Card.Meta>{Math.floor(Math.random() * 100) + " objet(s)."}</Card.Meta>
                                <Card.Description>

                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>

                                <Label color='gray' size='tiny' horizontal basic>{collection.type_id}</Label>
                            </Card.Content>
                        </Card>)
                }
            </Card.Group >
        );
    }
}

export default GrimoireCardList;
