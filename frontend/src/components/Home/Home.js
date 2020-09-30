import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';


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
       
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }

        return(
            <div>
            {redirectVar} 
            <h2>Current User:</h2>
            <h2>{this.state.user}</h2>
            <h2>{this.state.email}</h2>
               
            </div> 
        )
    }
}
//export Home Component
export default Home;