import React from 'react';
import { Card, Label } from 'semantic-ui-react'
import Formatter from "../../../services/helix/helixFormatter";
import 'react-table/react-table.css';

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
                        <Card onClick={this.handleEntryClick} item={entry} key={entry.uuid}>
                            <Card.Content >
                                <Card.Meta></Card.Meta>
                                <Card.Description>
                                    <GetCardContent entry={entry} />
                                </Card.Description>
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