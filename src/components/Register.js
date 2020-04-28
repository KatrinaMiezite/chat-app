import React from 'react';
import firebase from '../firebase.js';
import {Link} from 'react-router-dom';
import './Register.css';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import FilledInput from '@material-ui/core/FilledInput';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
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
        const{email, username, password} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
            const user = firebase.auth().currentUser;
            user.updateProfile({displayName: username}).then(() => {
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({error});
            });
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
         <h1>Register your account</h1>
         </Grid>
        {error && <p className="error-message">{error.message}</p>}
        <form onSubmit={this.handleSubmit}>
        <Grid item xs={11}>
            <label htmlFor="username">Username</label>
            </Grid>
            <Grid item xs={11}>
            <TextField label="Username" variant="filled" type="text" name="username" id="username" value={username} onChange={this.handleChange}/>
            </Grid>
            <Grid item xs={11}>
            <label htmlFor="email">Email adress</label>
            </Grid>
            <Grid item xs={11}>
            <TextField label="E-mail" variant="filled" type="text" name="email" id="email" value={email} onChange={this.handleChange}/>
            </Grid>
            <Grid item xs={11}>
            <label htmlFor="password">Choose a password</label>
            </Grid>
            <Grid item xs={11}>
            <TextField
            label="Password" 
            variant="filled"
            type="password"
            name="password"
            id="password"
            onChange={this.handleChange}
            value={password}>
                
            /></TextField>
            </Grid>
            <Button variant="contained" color="primary" className="submit">Get started</Button>
            <p>Already have an account? <Link className="login-btn" to="/login">Login here</Link></p>
        </form>

     </div>
     </Grid>
     </Container>
         </div>
     )
     /* return (
        <div className="registerContainer">
            <h1>Register</h1>
        </div>
     ); */
 }
}



export default Register;