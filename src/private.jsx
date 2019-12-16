import React from 'react';
import { Route, Redirect } from 'react-router-dom';
var jwt_decode = require('jwt-decode');



const PrivateRoute = ({ component: Component, ...rest }) => {
    var authToken = localStorage.getItem('authToken');
    var isExpired = true;
    if(authToken !== null) 
        isExpired = (jwt_decode(authToken)).exp > (new Date()).getTime()
    return (        
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
                !isExpired ?
                <Component {...props} {...rest} />
                : <Redirect to="/sign-in" />
        )} />
    );
};

export default PrivateRoute;