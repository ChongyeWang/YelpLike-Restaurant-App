import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


class Events extends Component{


    constructor(){
        super();
        this.state = {
            res: [],
            res2: [],
            res3: [],
            id: "",
            keyword: ""
        }

    }  

    //get the data from backend  
    componentDidMount(){
        axios.get('http://localhost:3001/events')
            .then((response) => {
            //update the state with the response data
    
            console.log(response.data);

            this.setState({
                res: response.data.data1,
                res2: response.data.data2
            });
            
        });
    }



    idChangeHandler = (e) => {
        this.setState({
            id : e.target.value
        })
        
    }

    //submit Login handler to send a request to the node backend
    submitEdit = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            id : this.state.id,
        }
        console.log(this.state.id);
       
        axios.post('http://localhost:3001/events/register',data)
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
       
        axios.post('http://localhost:3001/events-search', data)
        .then(response => {
             this.setState({
                res3: response.data
            });
            
            console.log("Status Code : ",response.data);
        }) 
    }



    render(){ 
        var res = this.state.res;
        const listItems = res.map((d) => <div key={d.id} style={{marginLeft: '200px', marginTop: '10px'}}>
            No.{d.id}
            <span style={{display:'inline-block', width:'20px'}}></span>{d.name}
            <span style={{display:'inline-block', width: '20px'}}></span>{d.restaurant}
            <span style={{display:'inline-block', width: '20px'}}></span>{d.date}
            <span style={{display:'inline-block', width: '20px'}}></span>{d.time}
            <span style={{display:'inline-block', width: '20px'}}></span>{d.location}
            {"\n"}
            {d.location}
        </div>);

        var res2 = this.state.res2;
        const listItems2 = res2.map((d) => <div key={d.id} style={{marginLeft: '200px', marginTop: '10px'}}>
             <a href={'/customers/' + d.userId}>User {d.user}</a> has registered for event No.
            <span style={{display:'inline-block', width:'20px'}}></span>{d.id}
            <span style={{display:'inline-block', width: '20px'}}></span>{d.restaurant}
        </div>);

        
        var res3 = this.state.res3;
        const listItems3 = res3.map((d) => <div key={d.id} style={{marginLeft: '200px', marginTop: '10px'}}>
            No.{d.id}
            <span style={{display:'inline-block', width:'20px'}}></span>{d.name}
            <span style={{display:'inline-block', width: '20px'}}></span>{d.restaurant}
            <span style={{display:'inline-block', width: '20px'}}></span>{d.date}
            <span style={{display:'inline-block', width: '20px'}}></span>{d.time}
            <span style={{display:'inline-block', width: '20px'}}></span>{d.location}
            {"\n"}
            {d.location}
        </div>);
        return(
            
          <div>
           <div class="" style={{marginLeft:'200px', marginTop:'30px', width:'300px'}}>
                <div class="panel">
                </div>
                <div class="form-group">
                    <input onChange = {this.keyChangeHandler} type="text" class="form-control" name="key" placeholder="Search Event"/>
                </div>
                                
            </div>
            <h4>{listItems3}</h4>

            <h2 style={{marginLeft:'200px', marginTop:'30px'}}>All Events</h2>
            <h4>{listItems}</h4>
            <h2 style={{marginLeft:'200px', marginTop:'30px'}}>Joined Customers</h2>
            <h4>{listItems2}</h4>
            <div style={{marginLeft:'200px', marginTop:'30px', width:'300px'}}>
                <div class="panel">
                    <h2>Register for Event</h2>
                </div>
                <div class="form-group">
                    <input onChange = {this.idChangeHandler} type="text" class="form-control" name="id" placeholder="Event Id"/>
                </div>
                <button onClick = {this.submitEdit} class="btn btn-primary">Submit</button>                 
            </div>

          </div>

   
        )
    }
}


//export Register Component
export default Events;