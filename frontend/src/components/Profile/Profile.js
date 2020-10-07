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
            orders: [],
            id :"",
            keyword: "",
            res3: [],
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

    idChangeHandler = (e) => {
        this.setState({
            id : e.target.value
        })
        
    }
    

    submitEdit = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            id : this.state.id,
        }
        console.log(this.state.id);
       
        axios.post('http://localhost:3001/order-update',data)
        .then(response => {

        });
    }

    keyChangeHandler = (e) => {
        this.setState({
            keyword : e.target.value
        })

        const data = {
            keyword : e.target.value,
        }
       
        axios.post('http://localhost:3001/order-search', data)
        .then(response => {
             this.setState({
                res3: response.data
            });
            
            console.log("Status Code : ",response.data);
        }) 
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

        const orderItems = orders.map((d) => <li style={{fontSize: '20px'}} key={d.orders}>
            Order {d.id} 
            <a href={'/customers/' + d.username}>View User Details</a>  {d.orders} 
            <span style={{width: '30px'}}></span> {d.delivery}
            <span style={{ width: '30px'}}></span> {d.date}
            <span style={{ width: '30px'}}></span> <span style={{color: 'lightgreen'}}>{d.status}</span>
        </li>);


        var res3 = this.state.res3;
        const listItems3 = res3.map((d) => <li style={{fontSize: '20px'}} key={d.orders}>
            Order {d.id} 
            <a href={'/customers/' + d.username}>View User Details</a>  {d.orders} 
            <span style={{width: '30px'}}></span> {d.delivery}
            <span style={{ width: '30px'}}></span> {d.date}
            <span style={{ width: '30px'}}></span> <span style={{color: 'lightgreen'}}>{d.status}</span>
        </li>);
       
        return(
        <div>
            {redirectVar}
            <div style={{marginLeft: '100px'}}>
                  
            <h2>{name}</h2>
            <h2>{email}</h2>
        
            </div>

            <div class="" style={{marginLeft:'100px', marginTop:'30px', width:'300px'}}>
                <div class="panel">
                </div>
                <div class="form-group">
                    <input onChange = {this.keyChangeHandler} type="text" class="form-control" name="key" placeholder="Order Status (pending or delivered)"/>
                </div>

                                
            </div>

            <div style={{marginLeft: '100px'}}>
                <h3>{listItems3}</h3>
                <h3>All Orders</h3>
                <h3>{orderItems}</h3>
            </div> 

            <div style={{marginLeft:'100px', marginTop:'30px', width:'300px'}}>
                <div class="panel">
                    <h2>Update Delivered Order</h2>
                </div>
                <div class="form-group">
                    <input onChange = {this.idChangeHandler} type="text" class="form-control" name="id" placeholder="Order Id"/>
                </div>
                <button onClick = {this.submitEdit} class="btn btn-primary">Submit</button>                 
            </div>

        </div> 
        )
    }      
    
}

//export Home Component
export default Profile;