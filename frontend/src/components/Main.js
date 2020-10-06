import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import Nav from './LandingPage/Navbar';
import Register from './Register/Register';
import Profile from './Profile/Profile';
import RegisterRestaurant from './RegisterRestaurant/RegisterRestaurant';
import RestaurantLogin from './RestaurantLogin/RestaurantLogin';
import Dish from './Dish/Dish';
import Restaurant from './Restaurant/Restaurant';
import Page from './Page/Page';
import Event from './Event/Event';
import Edit from './Edit/Edit';
import Events from './Events/Events';
import Customers from './Customers/Customers';
import Customer from './Customer/Customer';
import EditCustomer from './EditCustomer/EditCustomer';
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
                <Route path="/add-event" component={Event}/>
                <Route path="/events" component={Events}/>
                <Switch>
                <Route path="/restaurant/:id/review" component={Page}/>
                <Route path="/restaurant/:id/edit" component={Edit}/>
                <Route path="/restaurant/:id" component={Page}/>
                <Route path="/restaurant" component={Restaurant}/>
                </Switch>

                <Switch>
                <Route path="/customers/:id/edit" component={EditCustomer}/>
                <Route path="/customers/:id" component={Customer}/>
                <Route path="/customers" component={Customers}/>
                </Switch>
                
            </div>
        )
    }
}
//Export The Main Component
export default Main;