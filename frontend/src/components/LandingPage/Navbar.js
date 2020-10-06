import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';

//create the Navbar Component
class Nav extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' });
        localStorage.clear();


        axios.get('http://localhost:3001/logout')
            .then((response) => {
                
          }).catch(err => {

          });

    }
    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        if(cookie.load('cookie')){
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/home" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
      
                </ul>
            );
        }else{
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Customer Login </Link></li>
                        <li><Link to="/restaurant-login" ><span class="glyphicon glyphicon-log-in"></span> Restaurant Login</Link></li>
                </ul>
            )
        }

        return(
            <div>

                <nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
                  <a class="navbar-brand" href="#">Fooood!</a>
                  
                  <a class="nav-item nav-link active" href="#"><Link to="/home" style={{color:'white'}}>Home</Link> <span class="sr-only">(current)</span></a> 
                  <a class="nav-item nav-link"><Link to="/register" style={{color:'white'}}>Register</Link></a>
                  <a class="nav-item nav-link"><Link to="/profile" style={{color:'white'}}>Profile</Link></a>
                  <a class="nav-item nav-link"><Link to="/open-restaurant" style={{color:'white'}}>Open New Restaurant</Link></a>
                  <a class="nav-item nav-link"><Link to="/add-dish" style={{color:'white'}}>Add Dish</Link></a>
                  <a class="nav-item nav-link"><Link to="/add-event" style={{color:'white'}}>Add Event</Link></a>
                  <a class="nav-item nav-link" href="#" >{navLogin}</a>
                   
                </nav>

            
        </div>
        )
    }
}

export default Nav;