// src/components/Header/index.js
import React, { Component } from 'react';
import './style.css';
import logo from './logo.svg';

class Header extends Component {
    // static propTypes = {}
    // static defaultProps = {}
    // state = {}
    constructor() {
        super();

        this.links = [
            { url: '/', title: 'Home' },
            { url: '/about', title: 'About' },
            { url: '/review', title: 'Review' }, 
            { url: '/scatter', title: 'Scatter' },
            { url: '/contourplot', title: 'Contour Plot' },       
            { url: '/directedgrapheditor', title: 'Directed Graph Edit' },
        ];
    }

    render() {
        return (
            <div>
                <div className="App-header clearFix">
                    <img src={logo} className="App-logo float-left" alt="logo" />

                    {this.renderLinks()}
                </div>
            </div>
        );
    }

    renderLinks() {
        return (
            <ul className="header-nav float-left" role="navigation">
                {this.links.map(function(link, index){
                    return <li className="header-nav-item" key={index}>
                        <a href={link.url} className="header-nav-link">
                            {link.title}
                        </a>
                    </li>;
                })}
            </ul>
        );
    }
}

export default Header;