import React from 'react';
import { Card, Label, Icon } from 'semantic-ui-react'
import Formatter from "../../../services/helix/helixFormatter";
import '../../../css/memCardList.css';
import StackGrid, { transitions, easings } from "react-stack-grid";

function GetCardContent(props) {
    let truncatedText = "";
    if (props.entry.title === "") {
        truncatedText = Formatter.htmlToRaw(Formatter.textTruncate(props.entry.content));
    } else {
        truncatedText = props.entry.title;
    }

    //Adapt the font size
    if (truncatedText.length > 50) {
        truncatedText = <h5 > {truncatedText}</ h5>;
    } else if (truncatedText.length > 20) {
        truncatedText = <h4 > {truncatedText}</ h4>;
    } else if (truncatedText.length > 15) {
        truncatedText = <h3 >{truncatedText}</h3>;
    } else if (truncatedText.length > 10) {
        truncatedText = <h2>{truncatedText}</h2>;
    } else {
        truncatedText = <h1>{truncatedText}</h1>;
    }


    return truncatedText;
}

class MemorizEntryCardList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            entryList: null,
            duration: 480,
            columnWidth: 200,
            gutter: 15,
            easing: easings.quartOut,
            transition: 'fadeDown',
            rtl: false,
        }

    }

    handleEntryClick = (e, data, value) => {
        e.preventDefault();
        console.log(e.currentTarget);
        this.props.onChange(data.item);

    }

    handleDeleteClick = (e, data, value) => {
        e.preventDefault();
        console.log("DELETE THIS :", data.value);

        this.props.onChange(data.item);

    }

    componentDidMount() {
        this.setState({ entryList: this.props.entryList });

    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({ entryList: this.props.entryList });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.entryList !== undefined;
    }

    render() {

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
                    <Card item={entry} onClick={this.handleEntryClick} key={entry.uuid} value="update" color="yellow" style={{ background: "#ffffaa" }}>
                        <Card.Content>
                            <Card.Header>

                                <GetCardContent entry={entry} />

                            </Card.Header>
                        </Card.Content>
                        <Card.Content extra textAlign='right'>
                            <Label size='mini'><Icon name='clock' />{Formatter.dateToText(entry.created_on, "créé le ")}</Label>
                        </Card.Content>
                    </Card>)}
            </StackGrid>

        );
    }
}

export default MemorizEntryCardList;
