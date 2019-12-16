import React from 'react';

export class Frontpage extends React.Component {

    render() {
        return (
            <div style={{textAlign:"center"}}>
                <h1>Welcome to Dual-n-back Game!</h1>
                <p>Please select an option from the navigation bar!</p>
                <a href="/game">                
                    <img src="Logo512.png" alt="Logo" style={{width:500, marginTop: -7}}/>
                </a>
            </div>
        );
    }
}