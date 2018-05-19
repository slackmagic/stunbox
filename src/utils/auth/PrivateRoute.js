import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import auth from './Auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest}
        render={
            props => auth.isAuthenticated()
                ? (<Component {...props} />)
                : (<Redirect to={{ pathname: "/login", state: { from: props.location } }} />)
        }
    />
);

export default PrivateRoute;