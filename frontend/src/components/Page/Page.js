import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import logo from '../../public/logo1.jpg';
import './Page.css';

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
            reviews: [],
            selectItems : [],
            delivery : false,
            file : null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

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
                location: response.data.location,
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


    selectChangeHandler = (e) => {
        e.preventDefault();
        this.setState({
            selectItems:[...this.state.selectItems, e.target.value]
        })
        console.log(this.state.selectItems);
    }


    submitReview = (e) => {
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
    

    delivery = (e) => {
        this.setState({
            delivery: true
        })
    }

    pickUp = (e) => {
        this.setState({
            delivery: false
        })
    }

    placeOrder = (e) => {
        e.preventDefault();
        const data = {
            delivery : this.state.delivery,
            selectItems : this.state.selectItems
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;

        var id = this.props.match.params.id;
        axios.post(`http://localhost:3001/restaurant/${id}/place_order`,data)
            .then(response => {
                console.log("Status Code : ",response.status);
        })
    }


    onChange(e) {
        var orig = e.target.files[0];
        var id = this.props.match.params.id;
        var renamedFile = new File([orig], 'restaurant-' + id + '.png', {type: orig.type});
        console.log(renamedFile);
        this.setState({file:renamedFile});
    }

    onFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage',this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("http://localhost:3001/upload-restaurant",formData,config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
        });
    }


    render(){
        var name = this.state.name;
        var email = this.state.email;
        var location = this.state.location;
        var dish = this.state.dish;
        var reviews = this.state.reviews;
        const dishItems = dish.map((d) => <li key={d.name}>{d.name} <span style={{display:'inline-block', width: '50px'}}></span> {d.price}$<span style={{display:'inline-block', width: '50px'}}></span>   {d.category}</li>);
        const reviewItems = reviews.map((d) => <li key={d.date}>{d.date}<span style={{display:'inline-block', width: '50px'}}></span>{d.content}</li>);
        var id = this.props.match.params.id;


        const selectItems = dish.map((d) => 
            <option value={d.name}>Name:{d.name} Price:{d.price}$ Category:{d.category}</option>);


        var image;
        try {
            const images = require.context('../../public/uploads', true);
            console.log(images);
            image = images('./' + 'IMAGE-restaurant-' + id + '.png');

        } catch (err) {
            const images = require.context('../../public/uploads', true);
            console.log(images);
            image = images('./' + 'IMAGE-restaurant-default' + '.png');
        }


        return(
            <div>
                <div style={{marginLeft: '110px', marginTop: '10px'}}>
                <div class="row">
                    <div class="column" style={{width: "30%"}}>
                    <img src={image} alt="Logo" style={{width:'150px'}}/>     
                    </div>

                    
            <form onSubmit={this.onFormSubmit}>
                <h3>Change Profile</h3>
                <input type="file" name="myImage" onChange= {this.onChange} />
                <button type="submit">Upload</button>
            </form>
                    

                    <div class="column" style={{width: "70%"}}>

                    <h2>{name}</h2>
                    <h2>{email}</h2>
                    <h2>{location}</h2>

                    <a href={'/restaurant/' + id + '/edit'}><h3>Edit</h3></a>
                
                    </div>
                </div>
                
                </div>
                    <div style={{marginLeft: '100px', marginTop: '10px'}}>
                    <h3>Name<span style={{display:'inline-block', width: '50px'}}></span> Price<span style={{display:'inline-block', width: '50px'}}></span> Category</h3>
                    <h3>{dishItems}</h3>
                </div>



                <div style={{marginLeft: '100px', marginTop: '30px'}}>
                    <h2>Choose Your Order</h2>
                    <select id="menu" onChange = {this.selectChangeHandler}>
                        {selectItems}

                    </select>  
                    <div style={{marginTop: '10px', marginBottom: '20px'}}> 
                        <button onClick = {this.delivery} style={{width: '100px', height: '40px'}} class="btn btn-primary">Delivery</button>
                        <button onClick = {this.pickUp} style={{width: '100px', height: '40px'}}  class="btn btn-primary">Pick Up</button>
                        
                    </div>
                    <button onClick = {this.placeOrder} style={{fontWeight: 'bold'}} class="btn btn-primary">Place Order</button> 
                      
                </div>


                <div style={{marginLeft: '100px', marginTop: '30px'}}>
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