import React from 'react';
import { Card, Button, List, Icon } from 'semantic-ui-react'
import 'react-table/react-table.css';

class GrimoireCollectionList extends React.Component {

    render() {
        console.log(this.props.typeList);

        const ascData = [].concat(this.props.collections)
            .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

        return (
            <Card.Group itemsPerRow={4} stackable>
                {
                    ascData.map(collection =>
                        <Card key={collection.id}>
                            < Card.Content >
                                <Card.Header href={"./collection/read/" + collection.uuid}>
                                    {collection.name}&nbsp;
                                </Card.Header>
                                <Card.Meta>
                                    {this.props.typeList[collection.type_id]}
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

                <Card href={"./collection/new/"}>
                    <Card.Content>
                        <Card.Header>
                            Nouvelle collection
                        </Card.Header>
                        <Card.Description textAlign='center'>
                            <Icon.Group size='huge'>
                                <Icon name='archive' color='grey' />
                                <Icon corner name='add' color='grey' />
                            </Icon.Group>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Card.Group >
        );
    }
}

export default GrimoireCollectionList;
