import React from 'react';

class Movie extends React.Component {
  render() {
    console.log(this.props.movie)
    return (
      <div>
        <h3>Movie: {this.props.movie.title}</h3>
      </div>
    )
  }
}
export default Movie;