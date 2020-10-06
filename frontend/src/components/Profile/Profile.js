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
            authFlag: true,
            name : "",
            email: "",
            location: "",
            dish: [],
            orders: []
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
                    location: response.data.location,
                    dish: response.data.dish,
                    orders: response.data.order
                });

                console.log(response.data);

                
            }).catch(err => {
                this.setState({
                    authFlag : false,

                })

            });
    }
    
	
    render(){
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/restaurant-login"/>
        }
   
        var name = this.state.name;
        var email = this.state.email;
        var location = this.state.location;
        var dish = this.state.dish;
        var orders = this.state.orders;

        const listItems = dish.map((d) => <li key={d.name}>{d.name} 
            <span style={{display:'inline-block', width: '50px'}}></span> {d.price}$
            <span style={{display:'inline-block', width: '50px'}}></span>   {d.category}
        </li>);

        const orderItems = orders.map((d) => <li key={d.orders}><a href={'/customers/' + d.username}>View User Details</a>  {d.orders} 
            <span style={{display:'inline-block', width: '50px'}}></span> {d.delivery}
            <span style={{display:'inline-block', width: '50px'}}></span> {d.date}
        </li>);
       
        return(
        <div>
            {redirectVar}
            <div style={{marginLeft: '100px'}}>
                <img src={logo} alt="Logo" style={{width:'150px'}}/>     
                <h2>{name}</h2>
            <h2>{email}</h2>
        
            </div>

            <div style={{marginLeft: '100px'}}>
                <h3>All Orders</h3>
                <h3>{orderItems}</h3>
            </div> 

        </div> 
        )
    }      
    
}

//export Home Component
export default Profile;