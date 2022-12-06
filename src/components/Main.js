import axios from 'axios';
import React from 'react';
import map from '../components/images/map.png'
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
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
    console.log(this.state.locationSearch);

  }

  cityData = async (event) => {
    event.preventDefault();
    const url = `https://us1.locationiq.com/v1/search.php?key=${ACCESS_KEY}&q=${this.state.locationSearch}&format=json`;

    try {
      let response = await axios.get(url);
      console.log(response.data[0].lat);

      this.setState({
        location: response.data[0].display_name,
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
  }
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
      </div>



    )
  }
}


export default Main;