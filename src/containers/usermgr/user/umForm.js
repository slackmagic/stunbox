import React from 'react';

class UserForm extends React.Component
{
    render()
    {
        if(this.props.userdetail !== undefined)
        {
            const user = this.props.userdetail;
            return(
                <div>
                    <form>

                        <div class="form-group row">
                            <label for="login" class="col-sm-2 col-form-label">Login:</label>
                            <div class="col-sm-10">
                                <input type="text" readonly class="form-control-plaintext text-capitalize" id="login" value={user.login} />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="email" class="col-sm-2 col-form-label">Email:</label>
                            <div class="col-sm-10">
                                <input type="text" readonly class="form-control-plaintext" id="email" value={user.person.email}/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="created_on" class="col-sm-2 col-form-label">Created on:</label>
                            <div class="col-sm-10">
                                <input type="text" readonly class="form-control-plaintext" id="created_on" value={user.created_on}/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="firstname" class="col-sm-2 col-form-label">First name:</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="firstname" defaultValue={user.person.firstname}/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="lastname" class="col-sm-2 col-form-label">Last name:</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="lastname" defaultValue={user.person.lastname}/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="phone" class="col-sm-2 col-form-label">Phone:</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="phone" defaultValue={user.person.phone}/>
                            </div>
                        </div>
                       
                        <button type="submit" class="btn btn-primary">Update</button>

                    </form>
                </div>
            );
    }
    else
    {
        return null;
    }
    }
}

export default UserForm;