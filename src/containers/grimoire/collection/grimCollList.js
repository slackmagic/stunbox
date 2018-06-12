import React from 'react';
import { Card, Button, List } from 'semantic-ui-react'
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
                        <Card key={collection.id}>
                            < Card.Content >
                                <Card.Header href={"./collection/" + collection.uuid}>
                                    {collection.name}&nbsp;
                                </Card.Header>
                                <Card.Meta>
                                    {collection.type_id}
                                </Card.Meta>
                                <Card.Description>
                                    <List>
                                        <List.Item>
                                            <List.Icon name='file' />
                                            <List.Content>{Math.floor(Math.random() * 100) + " objet(s)."}</List.Content>
                                        </List.Item>

                                        <List.Item>
                                            <List.Icon name='users' />
                                            <List.Content>Semantic UI</List.Content>
                                        </List.Item>
                                    </List>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Button.Group>
                                    <Button icon='settings' size='mini' href={"./collection/edit/" + collection.uuid} />
                                    <Button icon='pie chart' size='mini' />
                                    <Button icon='trash' size='mini' />
                                </Button.Group>
                            </Card.Content>
                        </Card>)
                }
            </Card.Group >
        );
    }
}

export default GrimoireCollectionList;
