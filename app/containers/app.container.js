import React from 'react';
import Axios from 'axios';

class AppContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      classes: []
    };
    this.getClasses = this.getClasses.bind(this);
  }

  getClasses() {
    var classes;
    console.log("getting classes");
    Axios.get(`http://dnd5eapi.co/api/classes`)
      .then(response => {
        console.log(response);
        this.setState({classes: response.data.results});
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidUpdate() {
    console.log('Classes: ' + this.state.classes);
    this.refs.response.append = 'updated';
  }

  render() {
    return (
      <div id="char-sheet">
        <div id="response" ref='response'>
          <ul>
            {this.state.classes.map(function(charClass,i) {
              console.log("i" + i);
              return <li key={i}>{charClass.name}</li>;
            })}
          </ul>
        </div>
        <button onClick={this.getClasses}>Get Classes</button>
      </div>
    );
  }
}

export default AppContainer
