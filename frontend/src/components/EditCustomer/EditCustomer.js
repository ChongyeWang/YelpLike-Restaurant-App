import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//Define a Login Component
class EditCustomer extends Component{
    //call the constructor method
    constructor(props){
        
        super(props);
        //maintain the state required for this component
        this.state = {
            email : "",
            phone : ""
        }
        
    }

    emailChangeHandler = (e) => {
        this.setState({
            email : e.target.value,
        })
    }

    phoneChangeHandler = (e) => {
        this.setState({
            phone : e.target.value
        })
    }

    //submit Login handler to send a request to the node backend
    submitEdit = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            email : this.state.email,
            phone : this.state.phone
        }

        var id = this.props.match.params.id;

        //set the with credentials to true
        axios.defaults.withCredentials = true;

        axios.post(`http://localhost:3001/customers/${id}/edit`,data)
            .then(response => {
                console.log("Status Code : ",response.status);
            })

    }

    render(){ 

        var id = this.props.match.params.id;

        return(
            <div>

                <div class="container">
                    
                    <div class="">
                        <div class="main-div">
                            <div class="panel">
                                <h2>Edit Profile</h2>
                                
                            </div>
                          
                                <div class="form-group">
                                    <input onChange = {this.emailChangeHandler} type="text" class="form-control" name="email" placeholder="Email"/>
                                </div>

                                <div class="form-group">
                                    <input onChange = {this.phoneChangeHandler} type="text" class="form-control" name="phone" placeholder="Phone"/>
                                </div>
                                
                                <button onClick = {this.submitEdit} class="btn btn-primary">Edit</button>  

                                <a href={'/customers/' + id}><h3>Go Back</h3></a>               
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}
//export Register Component
export default EditCustomer;