import axios from 'axios';
import React from 'react';
import map from '../components/images/map.png'
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Weather from './Weather';
// src/components/images/map.png
const ACCESS_KEY = process.env.REACT_APP_LOCATION_API_KEY;


class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      locationSearch: '',
      error: null,
    }
  }

  handleLocationSearch = (event) => {
    event.preventDefault();
    this.setState({
      locationSearch: event.target.value

    });
    console.log(this.state);

  }

  cityData = async (event) => {
    event.preventDefault();
    const url = `https://us1.locationiq.com/v1/search.php?key=${ACCESS_KEY}&q=${this.state.locationSearch}&format=json`;

    try {
      let response = await axios.get(url);
      console.log(response.data[0].display_name);
      let city = response.data[0].display_name.split(',')
      console.log(city);

      this.setState({
        location: city[0],
        latitude: response.data[0].lat,
        longitude: response.data[0].lon,
        locationData: response.data[0],
        // displayMap: true,
        // displayError: false
      });
    } catch (err) {
      console.log('error happened');
      this.setState({error: err.response.data})
    }
    this.weatherData(this.state.latitude, this.state.longitude);
  }
  weatherData = async (lat, lon) => {
    try{
      let weather = await axios.get(`http://localhost:3001/weather?searchQuery=${this.state.locationData}`);
      console.log(weather);
      this.setState({
        weather: weather.data
      })
      
      
      
    } catch(err){
      console.log('err', err);
    }
  }
  // console.log(this.state);
handleError = () => {
  this.setState({error: null});
}

  render() {
    return (
      <div id="city-search">
        <form onSubmit={this.cityData}>
          <label>City</label>
          <input onChange={this.handleLocationSearch} type="text" name="search" placeholder="Enter City here" />
          <button type="submit">Explore</button>
        </form>
        {this.state.error
          ? <Alert>
          {JSON.stringify(this.state.error)}<Button onClick={this.handleError}>Thank you!</Button></Alert>
          : null
        }

        city= {this.state.location}
        lat= {this.state.latitude}
        lon= {this.state.longitude}
        {this.state.locationSearch && this.state.locationData
          ? <div id="map"><img src={map} alt="location map" /></div>
          : null
        }
        <Weather />
      </div>



    )
  }
}


export default Main;