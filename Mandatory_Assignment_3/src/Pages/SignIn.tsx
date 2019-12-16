import React from 'react';
import { Redirect } from 'react-router';
import { User } from '../models/user';

export interface IState {
    email: string;
    password: string;
    redirect: boolean;
}

export class SignIn extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        // Set up state
        this.state = {
            email: '',
            password: '',
            redirect: false
        };
        // Set up event handlers
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event: any) {
        fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
            method: 'POST',
            body: JSON.stringify(new User(this.state.email, this.state.password)),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
            .then((resJson) => {
                if (resJson.status === 200) {
                    localStorage.setItem('token', resJson.auth);
                    localStorage.setItem('authToken', resJson.token);
                    this.setState({ ...this.state, redirect: true });
                } else {
                    console.log('An error occurred during signin');
                }
            });
        event.preventDefault();
    }

    handleInputChange(event: any) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/game' />;
        } else {
            return (
            <div className="container">
                    <form>
                        <h3>Sign In</h3>

                        <div className="form-group">
                            <label>Email address</label>
                            <input name="email" type="email" className="form-control"
                                placeholder="Enter email" value={this.state.email} onChange={this.handleInputChange} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input name="password" type="password" className="form-control"
                                placeholder="Enter password" value={this.state.password} onChange={this.handleInputChange} />
                        </div>

                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>
                <div className="container">
                        <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Submit</button>
                        <p className="forgot-password text-right">
                            Not <a href="/sign-up">registered?</a>
                        </p>
                    </div>
                    </form>
                </div>
            );
        }
    }
}