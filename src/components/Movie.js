import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

class Movie extends React.Component {
  render() {
    console.log(this.props.movie)
    return (
      <div class="movie">
        <Card style={{ width: '18rem' }}>
        <ListGroup variant='flush'>
        <ListGroup.Item><h3>Movie: {this.props.movie.title}</h3></ListGroup.Item>
          <h3>Overview: {this.props.movie.overview}</h3>
          <h3>Average votes {this.props.average_votes}</h3>
          <h3>Total votes {this.props.total_votes}</h3>
          <h3>Image {this.props.image_url}</h3>
          <h3>Popularity {this.props.popularity}</h3>
          <h3>Released on = {this.props.released_on}</h3>
          </ListGroup>
        </Card>

      </div>
    )
  }
}
export default Movie;