import React from 'react';
import Title from "./umTitle";
import RenderUserList from "./all/umList";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const USERS_LIST = "/api/userstore/user/all";
const API_ACCESS_TOKEN = "1234567890-ABCDEFGH";
const ID_ACCESS_TOKEN = sessionStorage.getItem('access-key');

class UserMgrApp extends React.Component
{
    state = 
    {
        users: [],
        error: undefined
    }
    
    componentDidMount() 
    {
        fetch(`${USERS_LIST}`, 
            {
                method: "GET",                
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-api-key': API_ACCESS_TOKEN,
                    'Authorization': 'Bearer ' + ID_ACCESS_TOKEN
                }
            }
        )
        .then(response => response.json())
        .then(data => this.setState({users: data}))
        .then(users => console.log(this.state))
        .catch(error => this.setState({error}));
    }

    render()
    {
        return(

            <div>
                <Header />
                <div class="container body-content">
                    <br />
                    <Title subTitle={this.state.users.length + " users found"} />
                    <RenderUserList users={this.state.users} //Error={this.state.error}
                    />
                    <hr />
                    <Footer />
                </div>
            </div>

        );      
    }
}

export default UserMgrApp;