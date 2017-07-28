import React from 'react';
import Axios from 'axios';
import CharClassDetail from '../components/charClassDetail.component'

class CharCreater extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      characterClass: [],
      proficiencies: [],
      saveThrows: [],
      subClasses: [],
      proficiencyChoices: [],
      chosenProficiencies: [],
      startingEquipment: [],
      value: 'barbarian'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleProfChange = this.handleProfChange.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
    console.log('e' + e.target.value);
    Axios.get('http://dnd5eapi.co/api/classes/' + e.target.value.toLowerCase())
    .then(response => {
      console.log(response);
      //Retrieve Starting Equipment from separate API endpoint
      Axios.get(response.data.starting_equipment.url)
      .then(response => {
        console.log(response);
        this.setState({
          startingEquipment: response.data.starting_equipment
        });
      })
      .catch(error => {
        console.log(error);
      });
      this.setState({
        characterClass: response.data,
        proficiencies: response.data.proficiencies,
        saveThrows: response.data.saving_throws,
        subClasses: response.data.subclasses,
        proficiencyChoices: response.data.proficiency_choices[0].from,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleProfChange(e) {
    var choices = e.target.options;
    var values = [];
    for (var i=0; i < choices.length; i++) {
      if (choices[i].selected) {
        values.push(choices[i].value);
      }
    }
    this.setState({ chosenProficiencies: values });
    console.log(values);
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
    Axios.get('http://dnd5eapi.co/api/classes/' + this.state.value)
    .then(response => {
      console.log(response);
      //Retrieve Starting Equipment from separate API endpoint
      Axios.get(response.data.starting_equipment.url)
      .then(response => {
        console.log(response);
        this.setState({
          startingEquipment: response.data.starting_equipment
        });
      })
      .catch(error => {
        console.log(error);
      });
      this.setState({
        characterClass: response.data,
        proficiencies: response.data.proficiencies,
        saveThrows: response.data.saving_throws,
        subClasses: response.data.subclasses,
        proficiencyChoices: response.data.proficiency_choices[0].from
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  componentDidUpdate() {
    console.log(this.state.chosenProficiencies);
  }

  render() {
    let choicesDisplay = null;
    if(this.state.chosenProficiencies != undefined) {
      choicesDisplay = "choices";
    } else {
      choicesDisplay = "no choices";
    }
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
          <label>Proficiency Choices:
            <select multiple value={this.state.chosenProficiencies} onChange={this.handleProfChange}>
              {this.state.proficiencyChoices.map(function(profChoice,i) {
                return <option value={profChoice.name} key={i}>{profChoice.name}</option>;
              })}
            </select>
          </label>
          {choicesDisplay}
          <br />
          <label>Proficiency Choices:
            <select multiple value={this.state.chosenProficiencies} onChange={this.handleProfChange}>
              {this.state.proficiencyChoices.map(function(profChoice,i) {
                return <option value={profChoice.name} key={i}>{profChoice.name}</option>;
              })}
            </select>
          </label>
        <CharClassDetail
          data={this.state.characterClass}
          proficiencies={this.state.proficiencies}
          saveThrows={this.state.saveThrows}
          subClasses={this.state.subClasses}
          startingEquipment={this.state.startingEquipment}/>
      </div>
    );
  }
}

export default CharCreater
