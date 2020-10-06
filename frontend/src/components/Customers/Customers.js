import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


//Define a Login Component
class Customers extends Component{


    constructor(){
        super();
        this.state = {
            res: []
        }

    }  

    //get the data from backend  
    componentDidMount(){
        axios.get('http://localhost:3001/customers')
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
        console.log(res);
        const listItems = res.map((d) => <div key={d.id} style={{marginLeft: '200px', marginTop: '10px'}}>
            <a href={'/customers/' + d.id}>{d.name}</a>
        </div>);

        return(
            
          <div>
            <h3>{listItems}</h3>
            
        
          </div>
   
        )
    }
}


//export Register Component
export default Customers;