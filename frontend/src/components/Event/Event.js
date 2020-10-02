import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//Define a Login Component
class Event extends Component{
    //call the constructor method
    constructor(props){
        
        super(props);
        //maintain the state required for this component
        this.state = {
            name : "",
            restaurant : "",
            date : "",
            time : "",
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
    restaurantChangeHandler = (e) => {
        this.setState({
            restaurant : e.target.value
        })
    }

    dateChangeHandler = (e) => {
        this.setState({
            date : e.target.value
        })
    }

    timeChangeHandler = (e) => {
        this.setState({
            time : e.target.value
        })
    }

    locationChangeHandler = (e) => {
        this.setState({
            location : e.target.value
        })
    }

    //submit Login handler to send a request to the node backend
    submitEvent = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            name : this.state.name,
            price : this.state.price,
            category : this.state.category
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/add_dish',data)
            .then(response => {
                console.log("Status Code : ",response.status);
        
                
            })

    }

    render(){ 

        return(
            <div>

                <div class="container">
                    
                    <div class="">
                        <div class="main-div">
                            <div class="panel">
                                <h2>Add Event</h2>
                                
                            </div>
                            
                                <div class="form-group">
                                    <input onChange = {this.nameChangeHandler} type="text" class="form-control" name="name" placeholder="Name"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.restaurantChangeHandler} type="text" class="form-control" name="restaurant" placeholder="restaurant"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.dateChangeHandler} type="text" class="form-control" name="date" placeholder="date"/>
                                </div>
                                 <div class="form-group">
                                    <input onChange = {this.timeChangeHandler} type="text" class="form-control" name="time" placeholder="time"/>
                                </div>
                                 <div class="form-group">
                                    <input onChange = {this.locationChangeHandler} type="text" class="form-control" name="location" placeholder="location"/>
                                </div>
                                <button onClick = {this.submitEvent} class="btn btn-primary">Add</button>                 
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
//export Register Component
export default Event;