import React from 'react';

class UserMgrTitle extends React.Component
{
    render()
    {
        return(
          <div>
          <h3><span role="img" aria-label="user manager">👨‍💻</span> User Manager</h3>
          <br/>
          <div>{this.props.subTitle}</div>
          <br/>
          </div>
        );      
    }
}

export default UserMgrTitle;
