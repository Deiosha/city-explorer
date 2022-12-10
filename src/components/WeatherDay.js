import React from 'react';
import Stack from 'react-bootstrap/Stack';

class WeatherDay extends React.Component {
  render() {
    return (
      <div >
        <Stack direction='horizontal' gap={3}>
          <p>Date: {this.props.day.date}</p>
          <p>Description: {this.props.day.description}</p>
        </Stack>
      </div>
    )
  }
}

export default WeatherDay;