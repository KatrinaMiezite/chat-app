import React from 'react';
import {Link} from 'react-router-dom';
import './App.css';
import Chatbox from './components/Chatbox'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term:'',
      items: []
    };
  }

  onChange = (event) => {
    this.setState({ term: event.target.value});
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.setState({
      term: '',
      items: [...this.state.items, this.state.term]
    });
  }

  render() {
  return (
    <div className="App">
      <h1>Chat App</h1>
      {this.props.user &&
      <div className = "allow-chat">
      <form className="message-form" onSubmit={this.onSubmit}>
        <input value={this.state.term} onChange={this.onChange}/>
        <button>Send</button>
      </form>
      <Chatbox items={this.state.items} />
      </div>
  }

      {!this.props.user &&
        <div className="dissalow-chat">
          <p><Link to="/login">Login</Link> or <Link to="/register">register</Link> to start chatting!</p>
          </div>

      }
    </div>
  );
}
}

export default App;
