import React from 'react';

class RenderData extends React.Component
{
    render()
    {
        return(
            <div>
            <hr/>
            <h2 class="text-capitalize">{this.props.login}</h2>
            <h4>{this.props.firstname}&nbsp;{this.props.lastname}</h4>
            {this.props.email}<br/>
            {this.props.error}<br/>
            </div>
        );
    }
}

export default RenderData;