import React from 'react';

class Hello extends React.Component {

    render () {
        return (
        <div>
            <p>Hello, {this.props.name}</p>
            <h2>This is lesson nr <span className="pinkLetter">{this.props.lesson}</span></h2>
        </div>
       
        )
    }
}

export default Hello;