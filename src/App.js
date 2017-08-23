import React, { Component } from 'react';
import './App.css';

import Header from './components/Header';

/*  
    Github: 
      https://github.com/facebookincubator/create-react-app 
    D3 with React:
      http://nicolashery.com/integrating-d3js-visualizations-in-a-react-app/
    
*/

class App extends Component {
  render() {

    const { main } = this.props.children ? this.props.children : '';
    
    return (
      <div className="App">
        <Header></Header>

        <div className="padding-top">
          {main}
        </div>
      </div>
    );
  }
}

export default App;
