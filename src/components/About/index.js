// src/components/About/index.js
import React, { Component, PropTypes } from 'react';

import './style.css';

class About extends Component {
    // static propTypes = {}
    // static defaultProps = {}
    state = {}

    render() {
        this.state.data = [
            { author: 'Garrett', id: 1, text: 'Wong' },
            { author: 'Arthur', id: 2, text: 'Testing' },
            { author: 'Jim', id: 2, text: 'Goji Berries' },
        ];

        var commentNodes = this.state.data.map(function (comment) {
            return (
                <li author={comment.author} key={comment.id}>
                    {comment.text} {comment.author}
                </li>
            );
        });

        return (
            <section className="about centered width400">
                <h3>About</h3>

                <ul className="commentList">
                    {commentNodes}
                </ul>
            </section>
        );
        
    }
}

export default About;