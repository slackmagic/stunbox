import React from 'react';
import Title from "../umTitle";
import UserForm from "./umForm";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";

const USER_BY_ID_URL = "/api/userstore/user/";
const API_ACCESS_TOKEN = "1234567890-ABCDEFGH";
const ID_ACCESS_TOKEN = sessionStorage.getItem('access-key');

class UserDetail extends React.Component
{
    state = 
    {
        userdetail: undefined,
        error: undefined
    }
    
    componentDidMount() 
    {    
        fetch(`${USER_BY_ID_URL}${this.props.match.params.uuid}`, 
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
        .then(data => this.setState({userdetail: data}))
        .then(users => console.log("FETCH "+this.state))
        .catch(error => this.setState({error}));

        console.log(this.state);

    }

    render()
    {
        console.log("Render");
        return(
            <div>
            <Header />
            <div class="container body-content">
                <br/>
                <Title
                    subTitle={"ID: "+ this.props.match.params.uuid}
                /> 
                <UserForm
                    userdetail ={this.state.userdetail}
                />        
                    <hr />
                    <Footer />
                </div>
            </div>
        );      
    }
}

export default UserDetail;