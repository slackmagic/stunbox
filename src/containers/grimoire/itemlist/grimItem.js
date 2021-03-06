import React from 'react';
import _ from 'lodash'
import PropTypes from 'prop-types'
import GrimNav from '../components/grimNav';
import GrimHeader from "../components/grimHeader";
import { Container, Loader, Segment, Dimmer, Form, Grid, Search, Label, Dropdown, Button } from 'semantic-ui-react';
import SaveMessage from "../../../components/saveMsg";
import Itemstore from "../../../services/helix/helixItemstore";
import Userstore from "../../../services/helix/helixUserstore";
import Formatter from "../../../services/helix/helixFormatter";
import StunboxService from "../../../services/stunbox/stunboxService";

import "react-table/react-table.css";
import "../../../css/background.css";

class GrimoireItem extends React.Component {

    static contextTypes = {
        router: PropTypes.object
    }

    state = {
        isLoading: true,
        isSearchLoading: false,
        isUpdated: undefined,
        currentID: this.props.match.params.itemid,
        currentSearch: undefined,
        currentCollection: this.props.match.params.collid,
        currentType: this.props.match.params.typeid,
        searchResults: [],
        errMessage: "",
        collection: {},
        item: {
            id: -1,
            reference: {},
            owned_by: [StunboxService.getMyPersonUUID()],
            contained_by: [this.props.match.params.collid],
            is_collector_edition: false
        },
        supportList: [],
        typeList: [],
        userList: [],
        collectionList: [],
    }

    componentDidMount() {

        //_EDIT ITEM
        if (this.state.currentID !== undefined) {
            Itemstore.itemByUuid(this.props.match.params.itemid)
                .then(data => {
                    this.setState({ item: data, currentSearch: data.reference.name, currentType: data.reference.type_id });
                    this.loadSupports(data.reference.type_id);

                    Itemstore.collectionByUuid(data.collections[0])
                        .then(dataC => {
                            this.setState({ collection: dataC });
                            this.loadSupports(this.state.collection.type_id)
                        });

                    console.log(data);
                });
        }

        //_NEW ITEM
        if (this.props.match.params.collid !== undefined) {
            Itemstore.collectionByUuid(this.props.match.params.collid)
                .then(dataC => {
                    this.setState({ collection: dataC });
                    this.loadSupports(this.state.collection.type_id)
                });
        }

        Itemstore.supportsByType()
            .then(data => this.setState({ supportList: Formatter.userToDropdown(data) }));
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

    onItemCheckedChange = (e, data) => {
        e.preventDefault();
        const itemToUpdate = this.state.item;
        itemToUpdate[data.name] = data.checked;
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
        itemToUpdate['reference'] = { id: -1, type_id: this.state.currentType };
        this.setState({ isSearchLoading: false, searchResults: [], item: itemToUpdate });
        console.log(this.state);
    }

    onSearchRefChange = (e, data) => {
        e.preventDefault();
        const itemToUpdate = this.state.item;
        itemToUpdate['reference'] = { id: -1, name: data.value, type_id: this.state.collection.type_id };
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

    onBack = (e) => {
        e.preventDefault();
        this.context.router.history.push(`/grimoire/collection/read/` + this.state.collection.uuid);
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);

        //TODO VALIDATE

        //__REFERENCE PART
        if (this.state.item.reference.uuid === undefined) {
            //Create new reference

            Itemstore.newReference(this.state.item.reference)
                .then(data => {
                    console.log("reference data retrieve");
                    console.log(data);
                    const itemToUpdate = this.state.item;
                    itemToUpdate['reference'] = data;
                    this.setState({ item: itemToUpdate, isUpdated: true })
                })
                .catch(error => this.setState({ isUpdated: false, errMessage: error.message }));

        }

        if (this.state.item.uuid === undefined) {
            //Create new item
            Itemstore.newItem(this.state.item)
                .then(data => {
                    this.setState({ item: data, isUpdated: true })
                })
                .catch(error => this.setState({ isUpdated: false, errMessage: error.message }));

        }
        else {
            //Update new item
            Itemstore.updateItem(this.state.item)
                .then(data => {
                    this.setState({ item: data, isUpdated: true })
                })
                .catch(error => this.setState({ isUpdated: false, errMessage: error.message }));
        }
    }

    render() {

        return (
            <div>
                <Container fluid>
                    <GrimNav />

                    {this.state.item.uuid === undefined
                        ? (<GrimHeader icon="edit" title={this.state.collection.name} subtitle={"Ajouter un nouvel objet"} />)
                        : (<GrimHeader icon="edit" title={this.state.collection.name} subtitle={"Mettre à jour l'objet"} />)}
                    <Grid>
                        <Grid.Row>
                            <Grid.Column computer={3} tablet={3} only='computer tablet' />
                            <Grid.Column mobile={16} tablet={10} computer={10}>
                                <SaveMessage isCorrectlyUpdated={this.state.isUpdated} errMessage={this.state.errMessage} />
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
                                        <Form.Checkbox toggle name='is_collector_edition' checked={this.state.item.is_collector_edition || false} onChange={this.onItemCheckedChange} />
                                        <Form.Input name='purchased_on' label="Date d'achat/réception" placeholder='DD/MM/YYYY' value={Formatter.dateToText(this.state.item.purchased_on) || ''} onChange={this.onItemChange} />
                                        <b>Propriétaire(s)</b>
                                        <Dropdown input={{ fluid: true }} name='owners' placeholder='Propriétaire(s)' fluid multiple search selection value={this.state.item.owners || []} options={this.state.userList}
                                            onChange={this.onItemChange} />
                                        <br />
                                        <b>Collection(s)</b>
                                        <Dropdown input={{ fluid: true }} name='collections' placeholder='Collection(s)' fluid multiple search selection value={this.state.item.collections || []} options={this.state.collectionList}
                                            onChange={this.onItemChange} />
                                        <br />
                                        <Form.Input name='url' label='URL' placeholder='URL' value={this.state.item.url || ''} onChange={this.onItemChange} />
                                        <Form.TextArea name='comment' label='Commentaire' placeholder='Commentaire' value={this.state.item.comment || ''} onChange={this.onItemChange} />
                                    </Form>
                                    <br />
                                    <div>
                                        <Button type='submit' onClick={this.onSubmit} primary>Modifier</Button>
                                        <Button onClick={this.onBack}>Retour à la collection</Button>
                                    </div>
                                </Dimmer.Dimmable>
                            </Grid.Column>
                            <Grid.Column computer={3} tablet={3} only='computer tablet' />
                        </Grid.Row>
                    </Grid>
                </Container>
            </div >
        );
    }

}

export default GrimoireItem;