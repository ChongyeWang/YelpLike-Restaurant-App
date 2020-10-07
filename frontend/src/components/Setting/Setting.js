import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { createStore } from 'redux'
import logo from '../../public/logo1.jpg';



class Setting extends Component {


    constructor(){
        super();
        this.state = {
            authFlag: true,
            name : "",
            email: "",
            file: null,
            id: ""
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }  

    //get the data from backend  
    componentDidMount(){

        axios.get('http://localhost:3001/customers-setting')
            .then((response) => {
                //update the state with the response data
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email,
                });
                console.log(11111);
                console.log(this.state.name);
                console.log(this.state.id);

                
            }).catch(err => {
                this.setState({
                    authFlag : false,
                })
                console.log(22222);

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
        var id = this.state.id;
        var renamedFile = new File([orig], 'customer-' + id + '.png', {type: orig.type});
        console.log(renamedFile);
        this.setState({file:renamedFile});
    }

    render(){
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }

        var name = this.state.name;
        var email = this.state.email;
        var id = this.state.id;

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
            {redirectVar}
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
            <h3>Contact : {email}</h3>

            <a href={'/customers/' + id + '/edit'}><h3>Edit Profile</h3></a>

            </div>        

        </div> 
        )
    }      
    
}

//export Home Component
export default Setting;