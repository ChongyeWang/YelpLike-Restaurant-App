import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { createStore } from 'redux'
import logo from '../../public/logo1.jpg';

class Profile extends Component {


    constructor(){
        super();
        this.state = {
            authFlag: false,
            name : "",
            email: "",
            location: "",
            dish: []
        }

    }  

    //get the data from backend  
    componentDidMount(){
        axios.get('http://localhost:3001/profile')
            .then((response) => {
                //update the state with the response data
                this.setState({
                    name: response.data.user,
                    email: response.data.email,
                    location: response.data.email,
                    dish: response.data.dish,
                    authFlag : true
                });
                
            }).catch(err => {
                this.setState({
                    authFlag : false,

                })      
            });
    }
    
	
    render(){
        let redirectVar = null;
        if(this.state.authFlag === false){
            redirectVar = <Redirect to= "/restaurant-login"/>
        }
        var name = this.state.user;
        var email = this.state.email;
        var location = this.state.location;
        var dish = this.state.dish;
        const listItems = dish.map((d) => <li key={d.name}>{d.name} <span style={{display:'inline-block', width: '50px'}}></span> {d.price}$<span style={{display:'inline-block', width: '50px'}}></span>   {d.category}</li>);
       
        return(
        <div>
            {redirectVar}
            <div style={{marginLeft: '100px'}}>
            <img src={logo} alt="Logo" style={{width:'150px'}}/>     
            <h2>{name}</h2>
            <h2>{email}</h2>
            
            </div>
            <div style={{marginLeft: '100px'}}>
            <h3>Name<span style={{display:'inline-block', width: '50px'}}></span> Price<span style={{display:'inline-block', width: '50px'}}></span> Category</h3>
            <h3>{listItems}</h3>
            </div> 
            </div> 
        )
    }      
    
}

//export Home Component
export default Profile;