import React from 'react';

class CharClassDetail extends React.Component {
  render() {
    let charData = this.props.data;
    let hitDie = this.props.data.hit_die;
    let proficiencies = this.props.proficiencies;

    return (
      <div>
        <h1>Import Works!</h1>
        <h5>Hit Die: {hitDie} </h5>
        <ul>
          Proficiencies: {this.props.proficiencies.map(function(pros,i) {
            console.log("i" + i);
            return <li key={i}>{pros.name}</li>;
          })}

        </ul>
      </div>
    );
  }
}

export default CharClassDetail
