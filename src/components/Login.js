import React from 'react';
import firebase from '../firebase.js';
import './Login.css';
import {Link} from 'react-router-dom';
;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: null
        }
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = e => {
        e.preventDefault();
        const{email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({error});
            });
        
    }
 render() {
    const{email, username, password, error} = this.state;
    return(
    <div className="auth-container">
        <h1>Login</h1>
        <p>Login to your account</p>
       {error && <p className="error-message">{error.message}</p>}
       <form onSubmit={this.handleSubmit}>
           <label htmlFor="email">Email adress</label>
           <input type="text" name="email" id="email" value={email} onChange={this.handleChange}></input>
           <label htmlFor="password">Password</label>
           <input
           type="password"
           name="password"
           id="password"
           onChange={this.handleChange}
           value={password}>
               
           </input>

           <button className="submit">Get started</button>
           <p>Don't have an account? <Link className="login-btn" to="/regsiter">Login here</Link></p>
       </form>

    </div>
    )
     /* return (
        <div className="loginContainer">
            <h1>Login</h1>
        </div>
     ); */
 }
}

export default Login;