import React from 'react';
import _ from 'lodash'
import GrimNav from '../components/grimNav';
import GrimHeader from "../components/grimHeader";
import { Container, Loader, Segment, Dimmer, Form, Grid, Header, Icon, Search, Label, Dropdown } from 'semantic-ui-react';
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
        currentSearch: undefined,
        currentType: this.props.match.params.typeid,
        searchResults: [],
        isUpdated: undefined,
        errMessage: "",
        currentID: this.props.match.params.itemid,
        item: {
            id: -1, reference: {}
        },
        supportList: [],
        typeList: [],
        userList: [],
        collectionList: [],
    }

    componentDidMount() {

        //Edit
        if (this.state.currentID !== undefined) {
            Itemstore.itemByUuid(this.props.match.params.itemid)
                .then(data => {
                    this.setState({ item: data, currentSearch: data.reference.name, currentType: data.reference.type_id });
                    this.loadSupports(data.reference.type_id);
                    console.log(data);
                });
        }

        if (this.state.currentType !== undefined) {
            this.setState({ currentType: this.state.currentType.toUpperCase() });
            this.loadSupports(this.state.currentType);

        }

        Itemstore.typeList()
            .then(data => { this.setState({ typeList: Formatter.typeToHashmap(data) }) });
        Userstore.userList()
            .then(data => this.setState({ userList: Formatter.userToDropdown(data) }));
        Itemstore.collectionList()
            .then(data => this.setState({ collectionList: Formatter.collectionToDropdown(data), isLoading: false }));
    }

    loadSupports(id) {
        Itemstore.supportsByType(id)
            .then(data => {
                this.setState({ supportList: Formatter.supportToDropdown(data) });
            });
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
        itemToUpdate['reference'] = result.value;
        this.setState({ item: itemToUpdate, currentSearch: result.value.name, isUpdated: undefined });
        console.log(this.state);
    }

    resultRenderer = ({ title, value }) => {
        return (
            <div>
                {title}&nbsp;
                <Label content={this.state.typeList[value.type_id]} />
            </div>
        );
    }

    resetSearch = () => {
        const itemToUpdate = this.state.item;
        itemToUpdate['reference'] = { type_id: this.state.currentType };
        this.setState({ isSearchLoading: false, searchResults: [], item: itemToUpdate });
        console.log(this.state);
    }

    onSearchRefChange = (e, data) => {
        e.preventDefault();
        const itemToUpdate = this.state.item;
        itemToUpdate['reference'] = { name: data.value, type_id: this.state.currentType };
        this.setState({ isSearchLoading: true, searchResults: [], item: itemToUpdate, currentSearch: data.value });
        console.log(this.state);

        setTimeout(() => {
            if (data.value.length < 3) return this.resetSearch()

            Itemstore.searchReference(data.value)
                .then(rData => {
                    this.setState({ isSearchLoading: false, searchResults: Formatter.referenceToSearch(rData) });
                    console.log(rData);
                })
                .catch(err => console.log(err));

        }, 300);
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.item.uuid === -1) {
            //Create new item


            Itemstore.newCollection(this.state.collection)
                .then(data => this.setState({ collection: data, isUpdated: true }))
                .catch(error => this.setState({ isUpdated: false, errMessage: error.message }));
        }
        else {
            //Update item
            Itemstore.updateCollection(this.state.collection)
                .then(data => this.setState({ collection: data, isUpdated: true }))
                .catch(error => this.setState({ isUpdated: false, errMessage: error.message }));
        }
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
                                <Header as='h3' attached='top' color='green' inverted>
                                    <Icon name='edit' circular />
                                    <Header.Content>

                                        {this.state.item.reference.uuid === undefined
                                            ? (<div>Créer nouveau {this.state.typeList[this.state.currentType]}</div>)
                                            : (<div>Mettre à jour {this.state.typeList[this.state.currentType]}</div>)}

                                        <Header.Subheader>Saisir les informations de l'objet.</Header.Subheader>
                                    </Header.Content>
                                </Header>
                                <Dimmer.Dimmable as={Segment} dimmed={this.state.isLoading}>
                                    <Dimmer onClickOutside={this.handleHide} active={this.state.isLoading} inverted>
                                        <Loader size='huge' inverted>Chargement</Loader>
                                    </Dimmer>
                                    <Form>
                                        <b>Référence&nbsp;&nbsp;</b>
                                        <Search
                                            input={{ fluid: true }}
                                            minCharacters={3}
                                            noResultsMessage={"Pas de résultats."}
                                            loading={this.state.isSearchLoading}
                                            results={this.state.searchResults}
                                            onResultSelect={this.handleResultSelect}
                                            onSearchChange={_.debounce(this.onSearchRefChange, 500, { leading: true })}
                                            resultRenderer={this.resultRenderer}
                                            size="huge"
                                            value={this.state.currentSearch}

                                        />

                                        {this.state.item.reference.uuid === undefined
                                            ? (<Label content="Nouvelle référence" color="green" size="tiny" />)
                                            : (<Label content="Référence existante" color="blue" size="tiny" />)}
                                        <br /><br />
                                        <Form.Select name='support_id' fluid label='Support' placeholder='Choisissez un support' options={this.state.supportList} value={this.state.item.support_id || ''} onChange={this.onItemChange} required />
                                        <Form.Input name='edition' label='Edition' placeholder='Edition' value={this.state.item.edition || ''} onChange={this.onItemChange} />
                                        <b>Collector&nbsp;&nbsp;</b>
                                        <Form.Checkbox toggle name='is_collector_edition' checked={this.state.item.is_collector_edition || false} onChange={this.onItemChange} />
                                        <Form.Input name='purchased_on' label="Date d'achat/réception" placeholder='DD/MM/YYYY' value={Formatter.dateToText(this.state.item.purchased_on) || ''} onChange={this.onItemChange} />
                                        <b>Propriétaire(s)</b>
                                        <Dropdown input={{ fluid: true }} name='owned_by' placeholder='Propriétaire(s)' fluid multiple search selection value={this.state.item.owned_by || []} options={this.state.userList}
                                            onChange={this.onItemChange} />
                                        <br />
                                        <b>Collection(s)</b>
                                        <Dropdown input={{ fluid: true }} name='contained_by' placeholder='Collection(s)' fluid multiple search selection value={this.state.item.contained_by || []} options={this.state.collectionList}
                                            onChange={this.onItemChange} />
                                        <br />
                                        <Form.Input name='url' label='URL' placeholder='URL' value={this.state.item.url || ''} onChange={this.onItemChange} />
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