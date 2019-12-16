import React from 'react';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from "react-bootstrap";

export class Header extends React.Component {
    render(){
        return(
        <div>
        <Navbar className="header" bg="light" expand="lg">
        <Navbar.Brand className="header-title" href="/frontpage">
            <img src="Logo128.png" alt="Logo" style={{width:50, marginTop: -7}} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="/frontpage">Home</Nav.Link>
            <Nav.Link href="/game">Play game</Nav.Link>
            <Nav.Link href="/highscores">Highscores</Nav.Link>
            <Nav.Link href="/sign-up">Sign up</Nav.Link>
            <Nav.Link href="/sign-in">Sign in</Nav.Link>
            <Nav.Link href="/sign-out" >Sign out</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
        </div>
        );
    }
}