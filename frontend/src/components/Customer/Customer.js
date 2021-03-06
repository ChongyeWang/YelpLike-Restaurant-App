import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { createStore } from 'redux'
import logo from '../../public/logo1.jpg';



class Customer extends Component {


    constructor(){
        super();
        this.state = {
            authFlag: true,
            name : "",
            email: "",
            phone: "",
            web: "",
            likes: "",
            file: null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }  

    //get the data from backend  
    componentDidMount(){
        var id = this.props.match.params.id;
        axios.get(`http://localhost:3001/customers/${id}`)
            .then((response) => {
                //update the state with the response data
                this.setState({
                    name: response.data.name,
                    email: response.data.email,
                    phone: response.data.phone,
                    web: response.data.web,
                    likes: response.data.likes,
                });

                console.log(this.state.name);
                console.log(this.state.email);

                
            }).catch(err => {
                this.setState({
                    authFlag : false,

                })

            });
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
        axios.post("http://localhost:3001/upload-customer",formData,config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
        });
    }
    onChange(e) {
        var orig = e.target.files[0];
        var id = this.props.match.params.id;
        var renamedFile = new File([orig], 'customer-' + id + '.png', {type: orig.type});
        console.log(renamedFile);
        this.setState({file:renamedFile});
    }

    render(){
        var name = this.state.name;
        var email = this.state.email;
        var phone = this.state.phone;
        var web = this.state.web;
        var likes = this.state.likes;
        var id = this.props.match.params.id;

        var image;
        try {
            const images = require.context('../../public/uploads', true);
            console.log(images);
            image = images('./' + 'IMAGE-customer-' + id + '.png');

        } catch (err) {
            const images = require.context('../../public/uploads', true);
            console.log(images);
            image = images('./' + 'IMAGE-customer-default' + '.png');
        }
        
      
        return(
        <div>
            <div style={{marginLeft: '100px'}}>
            
            </div>

            <div style={{marginLeft: '100px'}}>

            <img src={image} alt="Logo" style={{width:'150px'}}/>     
            <form onSubmit={this.onFormSubmit}>
                <h3>Change Profile</h3>
                <input type="file" name="myImage" onChange= {this.onChange} />
                <button type="submit">Upload</button>
            </form>
            <h3>Name : {name}</h3>
            <h3>Email : {email}</h3>
            <h3>Phone : {phone}</h3>
            <h3>Website : {web}</h3>
            <h3>Things Love : {likes}</h3>

            <a href={'/customers/' + id + '/edit'}><h3>Edit Profile</h3></a>

            </div> 

            

        </div> 
        )
    }      
    
}

//export Home Component
export default Customer;