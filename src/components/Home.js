
import React from "react";


class Home extends React.Component{
  constructor(){
    super();
    this.state ={
      show:false
    }
  }

  toggleShow = () =>{
    this.setState({show: !this.state.show})
  }
  render(){
    return(
      <div>
        <p>Welcome</p>
        <button onClick={this.toggleShow}>Click here to see hidden message</button>
        {this.state.show ? <p>Hidden Message</p> : null }
      </div>
    )
  }
}

export default Home; 