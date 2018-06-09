import React from 'react';

class GrimoireTitle extends React.Component {
    render() {
        return (
            <div>
                <h3>{this.props.type.name} collection</h3>
                <br />
            </div>
        );
    }
}

export default GrimoireTitle;
