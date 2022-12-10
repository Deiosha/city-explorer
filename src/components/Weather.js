import React from 'react';
import WeatherDay from './WeatherDay';

class Weather extends React.Component {
  
render() {
    return (
      <div>
      {this.props.weatherData.map((day, i) => {
        return (
          <WeatherDay day={day} key={i} />
        )
      })}
      </div>
      



    )
  }
}

export default Weather; 