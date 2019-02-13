import React from 'react';
import { Card, Label, Button } from 'semantic-ui-react'
import Formatter from "../../../services/helix/helixFormatter";

function GetCardContent(props) {
    if (props.entry.title === "") {
        return Formatter.htmlToRaw(Formatter.textTruncate(props.entry.content));
    } else {
        return props.entry.title;
    }
}

class MemorizEntryCardList extends React.Component {

    handleEntryClick = (e, data) => {
        e.preventDefault();
        this.props.onChange(data.item);
    }

    render() {
        return (
            <Card.Group itemsPerRow={5} stackable>
                {
                    this.props.entryList.map(entry =>
                        <Card onClick={this.handleEntryClick} item={entry} key={entry.uuid} color="yellow">
                            <Card.Content >
                                <Card.Header><GetCardContent entry={entry} /></Card.Header>
                                <Card.Meta>
                                    {Formatter.dateToText(entry.created_on, "créé le ")}
                                </Card.Meta>
                                <Card.Description>
                                    <Label size='mini' color='yellow' horizontal>label</Label>
                                    <Label size='mini' color='yellow' horizontal>label2</Label>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra textAlign='right'>
                                <Button.Group size='mini' inverted >
                                    <Button icon='copy' />
                                    <Button icon='trash' />
                                </Button.Group>
                            </Card.Content>

                        </Card>)
                }
            </Card.Group >
        );
    }
}

export default MemorizEntryCardList;