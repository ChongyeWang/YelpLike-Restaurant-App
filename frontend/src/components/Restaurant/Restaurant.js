import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


const mapStyles = {
  width: '80%',
  height: '100%',
};

//Define a Login Component
class Restaurant extends Component{


    constructor(){
        super();
        this.state = {
            res: [],
            keyword: "",
            res3: [],
            pos: [],
        }

    }  

    //get the data from backend  
    componentDidMount(){
        axios.get('http://localhost:3001/restaurant')
            .then((response) => {
            //update the state with the response data

            var pos = []
            for (var i = 0; i < response.data.length; i++) {
                var data = {};
                var ele = response.data[i];
                data['latitude'] = parseFloat(ele['lat']);
                data['longitude'] = parseFloat(ele['lon']);
                pos.push(data);
            }

            this.setState({
                res: response.data,
                pos: pos
            });

            console.log(this.state.pos);
            
        });
    }

    keyChangeHandler = (e) => {
        this.setState({
            keyword : e.target.value
        })

        const data = {
            keyword : e.target.value,
        }
       
        axios.post('http://localhost:3001/restaurant/search', data)
        .then(response => {
             this.setState({
                res3: response.data
            });
            
            console.log("Status Code : ",response.data);
        }) 
    }

    displayMarkers = () => {
      return this.state.pos.map((store, index) => {
        return <Marker key={index} id={index} position={{
         lat: store.latitude,
         lng: store.longitude
       }}
       onClick={() => console.log("You clicked me!")} />
      })
    }


    render(){ 
        var res = this.state.res;
        const listItems = res.map((d) => <div key={d.id} style={{marginLeft: '200px', marginTop: '10px'}}>
            <a href={'/restaurant/' + d.id}>{d.name}</a>
            <span style={{display:'inline-block', width: '50px'}}></span>{d.location}
            <span style={{display:'inline-block', width: '50px'}}></span>{d.email}
        </div>);


        var res3 = this.state.res3;
        const listItems3 = res3.map((d) => <div key={d.id} style={{marginLeft: '200px', marginTop: '10px'}}>
      
            {d.name}
            <span style={{display:'inline-block', width: '20px'}}></span>{d.email}
            <span style={{display:'inline-block', width: '20px'}}></span>{d.location}


        </div>);


        return(
          <div>
          
              <div class="" style={{marginLeft:'200px', marginTop:'30px', width:'300px'}}>
                  <div class="panel">
                  </div>
                  <div class="form-group">
                      <input onChange = {this.keyChangeHandler} type="text" class="form-control" name="key" placeholder="Search Restaurant"/>
                  </div>
                                  
              </div>

              <h4>{listItems3}</h4>



              <h2 style={{marginLeft: '200px', marginTop: '50px'}}>All Restaurants List: </h2>
              <h3 style={{marginLeft: '200px', marginTop: '50px'}}>
              Name  <span style={{display:'inline-block', width: '20px'}}></span>
              Location  <span style={{display:'inline-block', width: '20px'}}></span>
              Contact</h3>
              <h4>{listItems}</h4>

              <div style={{marginLeft:'200px'}}>

               <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176}}
        >
          {this.displayMarkers()}
        </Map>

              </div>
              
          </div>
   
        )
    }
}


//export Register Component
export default  GoogleApiWrapper({
  apiKey: 'AIzaSyCgPAURPD6hyNrsQf1qqa2VoRicjwqJjBk'
})(Restaurant);