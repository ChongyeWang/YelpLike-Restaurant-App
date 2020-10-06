import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//Define a Login Component
class Edit extends Component{
    //call the constructor method
    constructor(props){
        
        super(props);
        //maintain the state required for this component
        this.state = {
            name : "",
            email : "",
            location : ""
        }
        
    }



    //username change handler to update state variable with the text entered by the user
    nameChangeHandler = (e) => {
        this.setState({
            name : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    emailChangeHandler = (e) => {
        this.setState({
            email : e.target.value
        })
    }

    locationChangeHandler = (e) => {
        this.setState({
            location : e.target.value
        })
    }

    //submit Login handler to send a request to the node backend
    submitEdit = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            name : this.state.name,
            email : this.state.email,
            location : this.state.location
        }

        var id = this.props.match.params.id;

        //set the with credentials to true
        axios.defaults.withCredentials = true;

        axios.post(`http://localhost:3001/restaurant/${id}/edit`,data)
            .then(response => {
                console.log("Status Code : ",response.status);
                console.log("Status Code : ",111);
                // this.setState({
                //     authFlag : true
                // })
                
            })

    }

    render(){ 

        return(
            <div>

                <div class="container">
                    
                    <div class="">
                        <div class="main-div">
                            <div class="panel">
                                <h2>Edit Profile</h2>
                                
                            </div>
                            
                                <div class="form-group">
                                    <input onChange = {this.nameChangeHandler} type="text" class="form-control" name="name" placeholder="Name"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.emailChangeHandler} type="text" class="form-control" name="email" placeholder="Email"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.locationChangeHandler} type="text" class="form-control" name="location" placeholder="Location"/>
                                </div>
                                <button onClick = {this.submitEdit} class="btn btn-primary">Edit</button>                 
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
//export Register Component
export default Edit;