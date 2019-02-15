import React from 'react';
import { Card, Label, Button } from 'semantic-ui-react'
import Formatter from "../../../services/helix/helixFormatter";
import '../../../css/memCardList.css';
import StackGrid, { transitions, easings } from "react-stack-grid";

const itemModifier = [
    'pattern1',
    'pattern2',
    'pattern3',
    'gray',
    'gray-light',
    'gray-dark',
    'yellow',
    'pink',
    'purple',
];


function GetCardContent(props) {
    if (props.entry.title === "") {
        return Formatter.htmlToRaw(Formatter.textTruncate(props.entry.content));
    } else {
        return props.entry.title;
    }
}

class MemorizEntryCardList extends React.Component {

    constructor(props) {
        super(props);

        const items = [];
        for (let i = 0; i < 10; i += 1) {
            items.push(this.createItem());
        }

        this.state = {
            entryList: null,
            items,
            duration: 480,
            columnWidth: 200,
            gutter: 15,
            easing: easings.quartOut,
            transition: 'fadeDown',
            rtl: false,
        }

    }

    createItem() {
        const id = Math.random().toString(36).substr(2, 9);
        const height = Math.floor((Math.random() * (300 - 80)) + 80);
        const modifier = itemModifier[Math.floor(Math.random() * itemModifier.length)];

        return { id, height, modifier };
    }


    handleEntryClick = (e, data) => {
        e.preventDefault();
        this.props.onChange(data.item);
    }

    componentDidMount() {
        console.log("componentDidMount");
        this.setState({ entryList: this.props.entryList });

    }

    componentDidUpdate(prevProps) {
        console.log("componentDidUpdate");
        if (prevProps !== this.props) {
            this.setState({ entryList: this.props.entryList });
        }
    }


    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate");
        return nextProps.entryList !== undefined;
    }

    render() {
        console.log("RENDER");
        console.log(this.state)
        console.log(this.props.entryList);

        const {
            duration,
            columnWidth,
            gutter,
            easing,
            transition: transitionSelect,
            rtl,
        } = this.state;

        const transition = transitions[transitionSelect];


        return (

            <StackGrid duration={duration}
                columnWidth={columnWidth}
                gutterWidth={gutter}
                gutterHeight={gutter}
                easing={easing}
                appear={transition.appear}
                appeared={transition.appeared}
                enter={transition.enter}
                entered={transition.entered}
                leaved={transition.leaved}
                rtl={rtl}>


                {this.props.entryList.map(entry =>
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

                    </Card>)}
            </StackGrid>

        );
    }
}

export default MemorizEntryCardList;