import React from 'react';

class Form extends React.Component
{
    render()
    {
        return(
            <div>
            <form class="form-inline my-2 my-lg-0" onSubmit={this.props.getUserByID}>
            <input class="form-control mr-sm-2" type="search" name="user_id" placeholder="ID..." aria-label="Search"/>
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Retrieve user info</button>
            </form>
            </div>
        );
    }
}

export default Form;