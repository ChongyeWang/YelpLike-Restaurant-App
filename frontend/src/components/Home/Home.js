import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';
import logo from '../../public/home.jpg';
import './Home.css';
import {Link} from 'react-router-dom';

class Home extends Component {
    constructor(){
        super();
        this.state = {
            user : "",
            email: ""
        }

    }  

    //get the books data from backend  
    componentDidMount(){
        axios.get('http://localhost:3001/home')
            .then((response) => {
            //update the state with the response data
            
                if(cookie.load('cookie')){
                    var session = cookie.load('cookie').split(" ");
                    this.setState({
                        
                        user: session[0],
                        email: session[1]

                    });
                }

        });
    }
    

    render(){

        return(
            <div>

            <div >
              <img class="logo" src={logo} alt="Logo" style={{width:'100%'}}/>    
              <div class="centered"><a><Link to="/open-restaurant" style={{color:'black'}}>Open a New Restaurant</Link></a></div>
              <div class="bottom"><a><Link to="/login" style={{color:'black'}}>Login as a Customer</Link></a></div>
            
              <div class="list"><a><Link to="/restaurant" style={{color:'black'}}>View All Restaurants</Link></a></div>
              <div class="customer"><a><Link to="/customers" style={{color:'black'}}>View All Our Customers</Link></a></div>
              <div class="event"><a><Link to="/events" style={{color:'black'}}>View All Events</Link></a></div>
            </div>

               
            </div> 
        )
    }
}
//export Home Component
export default Home;