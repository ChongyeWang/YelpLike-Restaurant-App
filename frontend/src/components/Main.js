import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import Nav from './LandingPage/Navbar';
import Register from './Register/Register';
import Profile from './Profile/Profile';
import RegisterRestaurant from './RegisterRestaurant/RegisterRestaurant';
import RestaurantLogin from './RestaurantLogin/RestaurantLogin';
import Dish from './Dish/Dish';

//Create a Main Component
class Main extends Component {

    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Nav}/>
        
                <Route path="/login" component={Login}/>
                <Route path="/home" component={Home}/>
                <Route path="/register" component={Register}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/open-restaurant" component={RegisterRestaurant}/>
                <Route path="/restaurant-login" component={RestaurantLogin}/>
                <Route path="/add-dish" component={Dish}/>
                
            </div>
        )
    }
}
//Export The Main Component
export default Main;