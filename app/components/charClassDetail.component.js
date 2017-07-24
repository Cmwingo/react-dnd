import React from 'react';

class CharClassDetail extends React.Component {
  render() {
    let charData = this.props.data;
    let hitDie = this.props.data.hit_die;
    let proficiencies = this.props.proficiencies;
    console.log(this.props.subClasses);

    return (
      <div>
        <h1>Import Works!</h1>
        <h5>Hit Die: {hitDie} </h5>
        <fieldset>
          <legend>Proficiencies: </legend>
            <ul>
              {this.props.proficiencies.map(function(pros,i) {
                return <li key={i}>{pros.name}</li>;
              })}
            </ul>
        </fieldset>
        <fieldset>
          <legend>Save Throws: </legend>
            <ul>
              {this.props.saveThrows.map(function(st,i) {
                return <li key={i}>{st.name}</li>;
              })}
            </ul>
        </fieldset>
        <fieldset>
          <legend>Subclasses: </legend>
          <ul>
            {this.props.subClasses.map(function(sc,i) {
              return <li key={i}>{sc.name}</li>;
            })}
          </ul>
        </fieldset>
      </div>
    );
  }
}

export default CharClassDetail
