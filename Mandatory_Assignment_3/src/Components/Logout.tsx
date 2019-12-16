import { Redirect } from "react-router";
import React from "react";

class Logout extends React.Component<{}> {
    constructor(props: any) {
        super(props);
        this.state = {
            navigate: false
        };
        this.logout();
    }

    logout = () => {
        localStorage.clear();
        this.setState({ navigate: true });
    }

    render() {
        return <Redirect to="/sign-in" push={true} />;
    }
}

export default Logout;