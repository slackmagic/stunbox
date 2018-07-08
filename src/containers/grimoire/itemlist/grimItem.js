import React from 'react';
import _ from 'lodash'
import GrimNav from '../components/grimNav';
import GrimHeader from "../components/grimHeader";
import { Container, Loader, Segment, Dimmer, Form, Grid, Header, Icon, Search, Label } from 'semantic-ui-react';
import SaveMessage from "../../../components/saveMsg";
import Itemstore from "../../../utils/helix/helixItemstore";
import Userstore from "../../../utils/helix/helixUserstore";
import Formatter from "../../../utils/helix/helixFormatter";

import "react-table/react-table.css";
import "../../../css/background.css";

class GrimoireItem extends React.Component {

    state = {
        isLoading: true,
        isSearchLoading: false,
        search: undefined,
        searchResults: [],
        isUpdated: undefined,
        errMessage: "",
        currentID: this.props.match.params.itemid,
        item: {
            id: -1, reference: {}
        },
        supportList: [],
        userList: [],
    }

    componentDidMount() {

        if (this.state.currentID !== undefined) {
            Itemstore.itemByUuid(this.props.match.params.itemid)
                .then(data => {
                    this.setState({ item: data });
                    console.log(data);
                });
        }

        Itemstore.supportsByType('game')
            .then(data => this.setState({ supportList: Formatter.supportToDropdown(data) }));

        Userstore.userList()
            .then(data => this.setState({ userList: Formatter.userToDropdown(data), isLoading: false }));

        console.log(this.state);

    }

    onItemChange = (e, data) => {
        e.preventDefault();
        const itemToUpdate = this.state.item;
        itemToUpdate[data.name] = data.value;
        this.setState({ item: itemToUpdate, isUpdated: undefined });
        console.log(this.state);
    }

    onRefChange = (e, data) => {
        e.preventDefault();
        const itemToUpdate = this.state.item;
        itemToUpdate['reference'][data.name] = data.value;
        this.setState({ item: itemToUpdate, isUpdated: undefined });
    }

    handleResultSelect = (e, { result }) => {
        e.preventDefault();
        const itemToUpdate = this.state.item;
        itemToUpdate['reference'] = result;
        this.setState({ item: itemToUpdate, search: result.name, isUpdated: undefined });
        console.log(this.state);
    }

    resultRenderer = ({ title, value }) => {
        return (
            <div>
                <Label content={title} />
                <Label content={value.uuid} />
            </div>
        );
    }

    resetSearch = () => {
        const itemToUpdate = this.state.item;
        itemToUpdate['reference'] = {};
        this.setState({ isSearchLoading: false, searchResults: [], item: itemToUpdate });
        console.log(this.state);
    }

    onSearchRefChange = (e, data) => {
        e.preventDefault();
        this.setState({ isSearchLoading: true })

        setTimeout(() => {
            if (data.value.length < 3) return this.resetSearch()

            Itemstore.searchReference(data.value)
                .then(data => {
                    this.setState({ isSearchLoading: false, searchResults: Formatter.referenceToSearch(data) });
                    if (this.state.searchResults.length === 0) {
                        this.resetSearch();
                        //TODO Put name into ref
                    }
                    console.log(data);
                })
                .catch(err => console.log(err));

        }, 300);
    }

    render() {

        return (
            <div>
                <Container fluid>
                    <GrimNav />
                    <GrimHeader />
                    <Grid>
                        <Grid.Row>
                            <Grid.Column computer={3} tablet={3} only='computer tablet' />
                            <Grid.Column mobile={16} tablet={10} computer={10}>
                                <SaveMessage isCorrectlyUpdated={this.state.isUpdated} errMessage={this.state.errMessage} />
                                <Header as='h3' attached='top'>
                                    <Icon name='edit' circular />
                                    <Header.Content>
                                        Objet
                                        <Header.Subheader>Saisir les informations de l'objet.</Header.Subheader>
                                    </Header.Content>
                                </Header>
                                <Dimmer.Dimmable as={Segment} dimmed={this.state.isLoading}>
                                    <Dimmer onClickOutside={this.handleHide} active={this.state.isLoading} inverted>
                                        <Loader size='huge' inverted>Chargement</Loader>
                                    </Dimmer>
                                    <Form>
                                        <Search
                                            fluid
                                            minCharacters={3}
                                            noResultsMessage={"Pas de résultats."}
                                            loading={this.state.isSearchLoading}
                                            results={this.state.searchResults}
                                            onResultSelect={this.handleResultSelect}
                                            onSearchChange={_.debounce(this.onSearchRefChange, 500, { leading: true })}
                                            resultRenderer={this.resultRenderer}
                                            value={this.state.search}
                                            size={"large"}
                                        />
                                        <Form.Select name='support_id' fluid label='Support' placeholder='Choisissez un support' options={this.state.supportList} value={this.state.item.support_id || ''} onChange={this.onItemChange} required />
                                        <Form.Input name='edition' label='Edition' placeholder='Edition' value={this.state.item.edition || ''} onChange={this.onItemChange} />
                                        <Form.Checkbox toggle name='is_collector_edition' label='Collector' value={this.state.item.is_collector_edition || ''} onChange={this.onItemChange} />
                                        <Form.Input name='url' label='URL' placeholder='URL' value={this.state.item.edition || ''} onChange={this.onItemChange} />
                                        <Form.TextArea name='comment' label='Commentaire' placeholder='Commentaire' value={this.state.item.comment || ''} onChange={this.onItemChange} />
                                    </Form>
                                    <br />
                                    <Form.Button type='submit' onClick={this.onSubmit}>Modifier</Form.Button>
                                </Dimmer.Dimmable>
                            </Grid.Column>
                            <Grid.Column computer={3} tablet={3} only='computer tablet' />
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        );
    }

}

export default GrimoireItem;