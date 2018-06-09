import React from 'react';
import { Card, Label, Button } from 'semantic-ui-react'
import 'react-table/react-table.css';

class GrimoireCollectionList extends React.Component {


    render() {
        const ascData = [].concat(this.props.collections)
            .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

        console.log(ascData);
        console.log(this.props.locmation);

        return (
            <Card.Group itemsPerRow={4} stackable>
                {
                    ascData.map(collection =>
                        <Card href={"./" + collection.type_id + "/bycollection/" + collection.uuid} key={collection.id}>
                            < Card.Content >
                                <Card.Header>{collection.name}</Card.Header>
                                <Card.Meta>{Math.floor(Math.random() * 100) + " objet(s)."}</Card.Meta>
                                <Card.Description>
                                    <Label color='grey' size='tiny' horizontal basic>{collection.type_id}</Label>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Button color='gray' href={"./collection/" + collection.uuid}>Modifier</Button>
                            </Card.Content>
                        </Card>)
                }
            </Card.Group >
        );
    }
}

export default GrimoireCollectionList;
