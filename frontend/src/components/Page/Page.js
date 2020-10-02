import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import logo from '../../public/logo1.jpg';

//Define a Login Component
class Page extends Component{


    constructor(){
        super();
        this.state = {
            name : "",
            email: "",
            location: "",
            dish: [],
            review: "",
            reviews: []
        }

    }  

    //get the data from backend  
    componentDidMount(){
        var id = this.props.match.params.id;
        axios.get(`http://localhost:3001/restaurant/${id}`)
            .then((response) => {
            //update the state with the response data
    
            console.log(response.data);

            this.setState({
                name: response.data.user,
                email: response.data.email,
                location: response.data.email,
                dish: response.data.dish,
                reviews: response.data.review
            });
        });
    }

    contentChangeHandler = (e) => {
        e.preventDefault();
        this.setState({
            review : e.target.value
        })
    }


    submitReview = (e) => {
        e.preventDefault();
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            content : this.state.review,
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;

        var id = this.props.match.params.id;
        axios.post(`http://localhost:3001/restaurant/${id}/review`,data)
            .then(response => {
                console.log("Status Code : ",response.status);
        })

    }


    render(){
        var name = this.state.name;
        var email = this.state.email;
        var location = this.state.location;
        var dish = this.state.dish;
        var reviews = this.state.reviews;
        const dishItems = dish.map((d) => <li key={d.name}>{d.name} <span style={{display:'inline-block', width: '50px'}}></span> {d.price}$<span style={{display:'inline-block', width: '50px'}}></span>   {d.category}</li>);
        const reviewItems = reviews.map((d) => <li key={d.date}>{d.date}<span style={{display:'inline-block', width: '50px'}}></span>{d.content}</li>);
       
        return(
            <div>
                <div style={{marginLeft: '110px', marginTop: '10px'}}>
                <div class="row">
                    <div class="column" style={{width: "30%"}}>
                    <img src={logo} alt="Logo" style={{width:'150px'}}/> 
                    </div>
                    <div class="column" style={{width: "70%"}}>

                    <h2>{name}</h2>
                    <h2>{email}</h2>
                
                    </div>
                </div>
                
                </div>
                    <div style={{marginLeft: '100px', marginTop: '10px'}}>
                    <h3>Name<span style={{display:'inline-block', width: '50px'}}></span> Price<span style={{display:'inline-block', width: '50px'}}></span> Category</h3>
                    <h3>{dishItems}</h3>
                </div>

                <div style={{marginLeft: '100px', marginTop: '10px'}}>
                    <div class="panel">
                        <h2 >Add Review</h2>
                    </div>
                    
                    <div class="form-group">
                        <input onChange = {this.contentChangeHandler} type="text" class="form-control" name="category" placeholder="Review"/>
                    </div>
                    <button onClick = {this.submitReview} class="btn btn-primary">Submit</button>                 
                </div>
                <h5 style={{marginLeft: '100px', marginTop: '30px'}}>{reviewItems}</h5>
                
             
            </div> 
        )
    }   
}


//export Register Component
export default Page;