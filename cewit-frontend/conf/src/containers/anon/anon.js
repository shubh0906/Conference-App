import React, { Component } from 'react';


class anon extends Component {
    render() {
        return (
            <div>
                <input type="text" placeholder="Your Passcode"></input>
                <button >Guest Login</button>
            </div>
        );
    }
}

anon.propTypes = {

};

export default anon;