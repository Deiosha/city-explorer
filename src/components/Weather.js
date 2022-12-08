import React from 'react';
import Stack from 'react-bootstrap/Stack';

class Weather extends React.Component {
  
render() {
    return (
      <div>
      {this.props.weatherData.map((day, i) => {
        return (
          <div key={i}>
          <Stack direction='horizontal' gap={3}>
          <p>Date: {day.date}</p>
          <p>Description: {day.description}</p>
          </Stack>
          </div>
        )
      })}
      </div>
      



    )
  }
}

export default Weather; 