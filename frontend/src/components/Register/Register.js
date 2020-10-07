import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//Define a Login Component
class Register extends Component{
    //call the constructor method
    constructor(props){
        
        super(props);
        //maintain the state required for this component
        this.state = {
            username : "",
            password : "",
            email : "",
            phone: "",
            web : "",
            like : "",
            authFlag : false,
            message : false
        }
        
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }

    emailChangeHandler = (e) => {
        this.setState({
            email : e.target.value
        })
    }

    phoneChangeHandler = (e) => {
        this.setState({
            phone : e.target.value
        })
    }

    webChangeHandler = (e) => {
        this.setState({
            web : e.target.value
        })
    }

    likeChangeHandler = (e) => {
        this.setState({
            like : e.target.value
        })
    }

    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username : this.state.username,
            password : this.state.password,
            email : this.state.email,
            phone : this.state.phone,
            web : this.state.web,
            like : this.state.like,

        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/register',data)
            .then(response => {
                console.log("Status Code : ",response.status);
            
                this.setState({
                    authFlag : true
                })
                
            }).catch(err => {
                
                this.setState({
                    authFlag : false,
                    message : true
                })
                
            });
    }

    render(){ 
        let redirectVar = null;
         if (this.state.authFlag === true) {
            redirectVar = <Redirect to= "/home"/>;
        }
        let message = "New User Register.";
        console.log(this.state.message);
        if (this.state.message === true) {
            message = "Username Already Exists";
        }
        return(
            <div>
                {redirectVar}
                <div class="container">
                    
                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                            <h2>Register</h2>
                                
                            </div>
                            
                                <div class="form-group">
                                    <input onChange = {this.usernameChangeHandler} type="text" class="form-control" name="username" placeholder="Username"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.emailChangeHandler} type="email" class="form-control" name="email" placeholder="Email"/>
                                </div>

                                <div class="form-group">
                                    <input onChange = {this.phoneChangeHandler} type="text" class="form-control" name="phone" placeholder="Phone"/>
                                </div>

                                <div class="form-group">
                                    <input onChange = {this.webChangeHandler} type="text" class="form-control" name="web" placeholder="Website"/>
                                </div>

                                <div class="form-group">
                                    <input onChange = {this.likeChangeHandler} type="text" class="form-control" name="like" placeholder="Things Love"/>
                                </div>
                                <button onClick = {this.submitLogin} class="btn btn-primary">Register</button>                 
                        </div>
                        <p>{message}</p>
                    </div>
                </div>
            </div>
        )
    }
}
//export Register Component
export default Register;