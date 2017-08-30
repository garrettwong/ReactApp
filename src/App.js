import React, { Component } from 'react';


import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import '../node_modules/ionicons/dist/css/ionicons.min.css';

import './all-skins.css';
import './App.css';
import './Logo-spinner.css';


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



      <section className="content">

        <div className="row">

          <div className="box">
            <div className="box-header with-border">
              <h3 className="box-title">Dashboard</h3>


              <Header></Header>
            </div>

            <div className="box-body">


              {main}

            </div>

            <div className="box-footer clearfix">
              <ul className="pagination pagination-sm no-margin pull-right">
                <li><a href="#">«</a></li>
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">»</a></li>
              </ul>
            </div>
          </div>

        </div>
      </section>
    );
  }
}

export default App;
