import React from 'react';

class RenderUserList extends React.Component
{
    render()
    {
        return(
            <div>
            <table class="table table-hover">
                <thead class="thead-light">
                    <tr>
                        <th scope="col">Login</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Created on</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.users.map(user =>
                    <tr key={user.uuid}>
                        <th scope="row"class="text-capitalize">{user.login}</th>
                        <td>{user.person.firstname}&nbsp;{user.person.lastname}</td>
                        <td>{user.person.email}</td>
                        <td>{user.person.created_on}</td>
                        <td>
                        <a class="btn btn-primary btn-sm" href={"/usermgr/"+user.uuid} role="button">Edit</a></td>                        
                    </tr>
                )}
                </tbody>
                </table>
            </div>
        );
    }
}

export default RenderUserList;