import React from 'react';
import {Link} from 'react-router-dom';
import './App.css';
import Chatbox from './components/Chatbox';
import firebase from './firebase';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message:'',
    };
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value});
  }

  onSubmit = (event) => {
   event.preventDefault();
   if(this.state.message !== '') {
     const chatRef = firebase.database().ref('general');
     const chat = {
       message: this.state.message,
       user: this.props.user.displayName,
       timestamp: new Date().getTime()
     }

     chatRef.push(chat);
     this.setState({message: ''});
   }
  }

  render() {
  return (
    <div>
    <Container maxWidth='false' style={{ backgroundColor: 'rgb(56, 56, 56)', minHeight: '100vw'}}>
    <Grid container spacing={12}>
    <div className="App">
    <Grid item xs={12}>
      <h1>Chat App</h1>
      </Grid>
      {this.props.user &&
      <div className = "allow-chat">
      <form className="message-form" onSubmit={this.onSubmit}>
      <Grid item xs={12}>
        <input 
        type="text"
        name="message"
        id="message"
        value={this.state.message} 
        placeholder="Enter a message..."
        onChange={this.onChange}/>
        </Grid>
        <Grid item xs={12}>
        <Button variant="contained" color="primary" type="submit">Send</Button>
        </Grid>
      </form>
      <Chatbox/>
      </div>
  }

      {!this.props.user &&
        <div className="dissalow-chat">
          <p><Link to="/login">Login</Link> or <Link to="/register">register</Link> to start chatting!</p>
          </div>

      }
    </div>
    </Grid>
    </Container>
    </div>
  );
}
}

export default App;
