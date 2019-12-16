import React from 'react';
import { Redirect } from 'react-router';
import { User } from '../models/user';

export interface IState {
    name: string;
    email: string;
    password: string;
    redirect: boolean;
}

export class SignUp extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            redirect: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event: any) {

        fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
            method: 'POST',
            body: JSON.stringify(new User(this.state.email, this.state.password, this.state.name)),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.status === 200) {
                    localStorage.setItem('token', resJson.auth);
                    localStorage.setItem('authToken', resJson.token);
                    this.setState({ ...this.state, redirect: true });
                } else {
                    console.log('An error occurred during signup');
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
                        <h3>Sign Up</h3>
                        <div className="form-group">
                            <label>Username</label>
                            <input name="name" type="text" className="form-control"
                                placeholder="Username" value={this.state.name} onChange={this.handleInputChange} />
                        </div>
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
                    <div className="container">
                        <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Sign Up</button>
                        <p className="forgot-password text-right">
                            Already registered, <a href="/sign-in">sign in?</a>
                        </p>
                    </div>
                    </form>
                </div>
            );
        }
    }
}