import React from 'react';
import { Card, Label } from 'semantic-ui-react'
import Formatter from "../../../services/helix/helixFormatter";
import 'react-table/react-table.css';

class MemorizEntryCardList extends React.Component {

    handleEntryClick = (e, data) => {
        e.preventDefault();
        console.log(data);
        this.props.onChange(data.item);
    }

    render() {
        return (
            <Card.Group itemsPerRow={5} stackable>
                {
                    this.props.entryList.map(entry =>
                        <Card onClick={this.handleEntryClick} item={entry} key={entry.uuid}>
                            <Card.Content >
                                <Card.Meta></Card.Meta>
                                <Card.Description>{Formatter.htmlToRaw(Formatter.textTruncate(entry.content))}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Label size='mini' color='yellow' horizontal>label</Label>
                                <Label size='mini' horizontal>{Formatter.dateToText(entry.created_on, "créé le ")}</Label>

                            </Card.Content>

                        </Card>)
                }
            </Card.Group >
        );
    }
}

export default MemorizEntryCardList;