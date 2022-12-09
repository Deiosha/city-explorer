import axios from 'axios';
import React from 'react';
import map from '../components/images/map.png'
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Weather from './Weather';
import Movie from "./Movie";

// import Stack from 'react-bootstrap/Stack';

// import Weather from './Weather';
// src/components/images/map.png
const ACCESS_KEY = process.env.REACT_APP_LOCATION_API_KEY;


class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      location: null,
      locationSearch: '',
      error: null,
      weather: [],
      movie: []
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

      }, () => this.weatherData(response.data[0].lat, response.data[0].lon), this.movieData());
    } catch (err) {
      console.log('error happened');
      this.setState({ error: err.response.data })
    }
    // console.log(this.state);
    // this is a problem! State needs to be set before we make the request, and state is unfortunately not set yet;
    // this.weatherData(response.data[0].lat, this.state.longitude);
  }
  weatherData = async (lat, lon) => {
    try {
      // console.log(this.state);
      // console.log(weather);
      // let weather = await axios.get(`http://localhost:3001/weather?searchQuery=${this.state.location}&lat=${lat}&lon=${lon}`);
      let weather = await axios.get(`${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.location}&lat=${lat}&lon=${lon}`);
      console.log(weather);
      this.setState({
        weather: weather.data
      });

    } catch (err) {
      console.log('err', err);
    }
  }

  movieData = async () => {
    console.log(process.env.REACT_APP_LOCAL);
    let movieData = await axios.get(`${process.env.REACT_APP_LOCAL}/movie?searchQuery=${this.state.locationSearch}`);
    console.log(movieData);
    this.setState({
      movies: movieData.data
    })
  }
  

    // console.log(this.state);
    handleError = () => {
      this.setState({ error: null });
    }


    render() {
      console.log(this.state.movies);
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
          {this.state.weather ?
            <Weather weatherData={this.state.weather} />
            : null
          }

          <p>City = {this.state.location}</p>
          <p>Latitude = {this.state.latitude}</p>
          <p>Longitude = {this.state.longitude}</p>

          {this.state.locationSearch && this.state.locationData
            ? <div id="map"><img src={map} alt="location map" /></div>
            : null
          }
          
          {this.state.movies ? this.state.movies.length > 0 && this.state.movies.map(movie => <Movie movie={movie} />
          ) : <p>movie goes here</p>
          }
          {/* <Movie movie={this.state.movies}/> */}


        </div>



      )
    }
  }


export default Main;