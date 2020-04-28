import React from 'react';
import './Chatbox.css';
import firebase from '../firebase';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class Chatbox extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            chats: []
        }
    }

    componentDidMount(){
        const chatRef = firebase.database().ref('general');
        chatRef.on('value', snapshot => {
            const getChats = snapshot.val();
            let ascChats=[];
            for(let chat in getChats) {
                if(getChats[chat].message !== '') {
                    ascChats.push({
                        id: chat,
                        message: getChats[chat].message,
                        user: getChats[chat].user,
                        date: getChats[chat].timestamp
                    });
                }
            }
            const chats = ascChats.reverse();
            this.setState({chats});
        });
    }
    render() {
        return (
            <div>
            <Container maxWidth='false' style={{ backgroundColor: 'rgb(56, 56, 56)', minHeight: '100vw' }}>
            <Grid container spacing={12}>
            <Grid item xs={12}>
            <div className="chatBox">
            <Grid item xs={12}>
                <ul className="chat-list">
                    {this.state.chats.map(chat=> {
                        const postDate = new Date(chat.date);
                        return(
                            <li key={chat.id}>
                                <p id="displayName">{chat.user}</p>
                                <p id="date">{postDate.getDate() + '.' + (postDate.getMonth()+1)}</p>
                        
                        <p id="chatMessage">{chat.message}</p>
                            </li>
                        )
                    })}
                </ul>
                </Grid>
            </div>
            </Grid>
            </Grid>
            </Container>
            </div>
        );
    }
}



export default Chatbox;