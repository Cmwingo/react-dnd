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
        <CharCreater />
      </div>
    );
  }
}

//Character Creation Class

class CharCreater extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      value: 'barbarian'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  componentDidMount() {
    Axios.get('http://dnd5eapi.co/api/classes')
    .then(response => {
      console.log(response);
      this.setState({classes: response.data.results});
    })
    .catch(error => {
      console.log(error);
    });
  }
  render() {
    return (
      <div>
        <h1>Char Creater Component Works!</h1>
        <label>
          Select your <span>c</span>lass
          <select value={this.state.value} onChange={this.handleChange}>
            {this.state.classes.map(function(charClass,i) {
              return <option value={charClass.name} key={i}>{charClass.name}</option>;
            })}
          </select>
        </label>
        <p>You have selected {this.state.value}</p>
      </div>
    );
  }
}


export default AppContainer
