import React from 'react';
import Axios from 'axios';

class AppContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  getClasses() {
    Axios.get(`api call here`)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (

    );
  }

}

export default AppContainer
