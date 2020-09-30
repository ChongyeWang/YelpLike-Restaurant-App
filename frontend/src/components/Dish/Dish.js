import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//Define a Login Component
class Dish extends Component{
    //call the constructor method
    constructor(props){
        
        super(props);
        //maintain the state required for this component
        this.state = {
            name : "",
            price : "",
            category : ""
        }
        
    }



    //username change handler to update state variable with the text entered by the user
    nameChangeHandler = (e) => {
        this.setState({
            name : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    priceChangeHandler = (e) => {
        this.setState({
            price : e.target.value
        })
    }

    categoryChangeHandler = (e) => {
        this.setState({
            category : e.target.value
        })
    }

    //submit Login handler to send a request to the node backend
    submitDish = (e) => {
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
                                <h2>Add Dish</h2>
                                
                            </div>
                            
                                <div class="form-group">
                                    <input onChange = {this.nameChangeHandler} type="text" class="form-control" name="name" placeholder="Name"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.priceChangeHandler} type="text" class="form-control" name="price" placeholder="Price"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.categoryChangeHandler} type="text" class="form-control" name="category" placeholder="Category"/>
                                </div>
                                <button onClick = {this.submitDish} class="btn btn-primary">Add</button>                 
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
//export Register Component
export default Dish;