import React from 'react';

class CharClassDetail extends React.Component {
  render() {
    let charData = this.props.data;
    let hitDie = this.props.data.hit_die;
    let proficiencies = [];
    if(typeof charData != 'undefined') {
      console.log(typeof charData);
      proficiencies = charData.proficiencies.map(pros => {
        return pros.name
      })
    }
    return (
      <div>
        <h1>Import Works!</h1>
        <h5>Hit Die: {hitDie} </h5>
        <h5>
          Proficiencies: {this.proficiencies}

        </h5>
      </div>
    );
  }
}

export default CharClassDetail
