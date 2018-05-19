import React from 'react';

class CollMgrNav extends React.Component {
    render() {
        return (

            <div>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" href="/ALL">All</a>
                    </li>
                    {this.props.supports.map(support =>
                        <li className="nav-item" key={support.id}>
                            <a className="nav-link active" href={support.type_id + "/" + support.id}>{support.name}</a>
                        </li>
                    )}
                </ul>
                <br />
            </div>
        );
    }
}

export default CollMgrNav;
