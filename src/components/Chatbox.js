import React from 'react';
import './Chatbox.css';

const Chatbox = props => (
   
    <ul>
        {
            props.items.map((item, index) => <li className="arrow_box" key={index}>{item}</li>) 
        }

    </ul>
);

export default Chatbox;