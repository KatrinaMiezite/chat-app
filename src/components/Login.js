import React from 'react';
import firebase from '../firebase.js';
import './Login.css';
import {Link} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

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
        <div>
        <Container maxWidth='false' style={{ backgroundColor: 'rgb(56, 56, 56)', minHeight: '100vw'}}>
        <Grid container spacing={12}>
    <div className="auth-container">
    <Grid item xs={12}>
        <h1>Login</h1>
        </Grid>
        <Grid item xs={12}>
        <p>Login to your account</p>
        </Grid>
        <Grid item xs={12}>
       {error && <p className="error-message">{error.message}</p>}
       </Grid>
       <form onSubmit={this.handleSubmit}>
       <Grid item xs={12}>
           <label htmlFor="email">Email adress</label>
           </Grid>
           <Grid item xs={12}>
           <TextField label="E-mail" variant="filled" type="text" name="email" id="email" value={email} onChange={this.handleChange}/>
           </Grid>
           <Grid item xs={12}>
           <label htmlFor="password">Password</label>
           </Grid>
           <Grid item xs={12}>
           <TextField label="Password" variant="filled"
           type="password"
           name="password"
           id="password"
           onChange={this.handleChange}
           value={password}>
               
           /></TextField>
           </Grid>
           <Grid item xs={12}>
           <Button variant="contained" color="primary" className="submit" type="submit">Log In</Button>
           </Grid>
           <Grid item xs={12}>
           <p>Don't have an account? <Link className="login-btn" to="/register">Register here</Link></p>
           </Grid>
       </form>

    </div>
    </Grid>
    </Container>
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