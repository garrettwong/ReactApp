// src/components/Home/index.js
import React, { Component } from 'react';
import Graph from '../Graph';
import WorldMap from '../WorldMap';
import './style.css';

class Home extends Component {
    // static propTypes = {}
    // static defaultProps = {}
    // state = {}

    render() {
        return (
            <div>
                <h1>
                    Home
                </h1>
                

                <div className="padding-top">
                    <Graph data={[5,10,1,3]} size={[500,500]}></Graph>
                </div>

                <div className="padding-top">
                    <WorldMap></WorldMap>
                </div>
            </div>
        );
    }
}

export default Home;