import React, { Component } from 'react';

class login extends Component {
    render() {
        return (
            <div>
                <input type="text" placeholder="Your Email"></input>
                <input type="password" placeholder="Your Password"></input>
                <button >User Login</button>
            </div>
        );
    }
}


export default login;