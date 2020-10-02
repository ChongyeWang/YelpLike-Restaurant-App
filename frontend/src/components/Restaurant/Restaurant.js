import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

function User() {
  let { id } = useParams();
  return (
    <h2>User {id}</h2>
  )
}

//Define a Login Component
class Restaurant extends Component{


    constructor(){
        super();
        this.state = {
            res: []
        }

    }  

    //get the data from backend  
    componentDidMount(){
        axios.get('http://localhost:3001/restaurant')
            .then((response) => {
            //update the state with the response data
    
            console.log(response.data);

            this.setState({
                res: response.data

            });
            
        });
    }


    render(){ 
        var res = this.state.res;
        const listItems = res.map((d) => <div key={d.id} style={{marginLeft: '200px', marginTop: '10px'}}>
            <a href={'/restaurant/' + d.id}>{d.name}</a>
            <span style={{display:'inline-block', width: '50px'}}></span>{d.location}
            <span style={{display:'inline-block', width: '50px'}}></span>{d.email}
        </div>);

        return(
            
          <div>
            <h3>{listItems}</h3>
            
        
          </div>
   
        )
    }
}


//export Register Component
export default Restaurant;