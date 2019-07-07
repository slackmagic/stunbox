import React from 'react';
import MemorizStore from "../../../services/helix/helixMemorizStore";
import { Menu, Button, Dropdown, Grid } from 'semantic-ui-react'

class MemorizHeader extends React.Component {

    state = {
        currentBoard: {},
        boardList: []
    }

    componentDidMount() {
        this.setMainBoard();
        this.refreshBoardList();
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return nextProps !== undefined;
    }

    setMainBoard() {
        var mainBoard = { uuid: 'main', title: 'Principal' };
        this.setState({ currentBoard: mainBoard });
    }

    refreshBoardList() {
        MemorizStore.boardList()
            .then(data => this.setState({ boardList: data }));
    }

    handleMainBoardClick = (e, data) => {
        this.setMainBoard();
        this.props.onChange(this.state.currentBoard);
    }

    handleBoardClick = (e, data) => {
        e.preventDefault();
        console.log(data);
        if (data === undefined) {

        } else {
            this.props.onChange(data.value);
            this.setState({ currentBoard: data.value });
        }

    }

    handleNewBoardClick = (e) => {
        var newBoard = { uuid: 'new', title: 'Nouveau tableau' };
        this.props.onChange(newBoard);
        this.setState({ currentBoard: newBoard });
    }

    render() {
        return (
            <Grid fluid="true">
                <Grid.Row columns={16} only='computer tablet' fluid="true">
                    <Menu color='green' fluid stackable  >
                        <Menu.Item header><span role="img" aria-label="Stunbox"></span>&nbsp;STUNBOX.Memoriz</Menu.Item>
                        <Dropdown item text={this.state.currentBoard.title} pointing>
                            <Dropdown.Menu>
                                <Dropdown.Item text='Principal' onClick={this.handleMainBoardClick} />
                                {this.state.boardList.map(board =>
                                    <Dropdown.Item key={board.uuid} name={board.title} displayname={board.title} onClick={this.handleBoardClick} value={board}>
                                        {board.title}</Dropdown.Item>
                                )}
                                <Dropdown.Item text='+ Ajouter nouveau' onClick={this.handleNewBoardClick} />
                            </Dropdown.Menu>
                        </Dropdown>
                        <Menu.Menu position='right'>
                            <Menu.Item href='login'><Button color='yellow'>Se déconnecter</Button></Menu.Item>
                        </Menu.Menu>
                    </Menu>
                </Grid.Row>
                <Grid.Row columns={16} only='mobile' fluid="true">
                    <Menu color='violet' stackable fluid>
                        <Dropdown item text='&nbsp;STUNBOX.Memoriz'>
                            <Dropdown.Menu>
                                <Menu.Item href='login'><Button color='yellow'>Se déconnecter</Button></Menu.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu>
                </Grid.Row>
            </Grid >
        );
    }
}

export default MemorizHeader;