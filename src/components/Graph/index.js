import React, { Component } from 'react';
import * as d3 from "d3";
import { select } from 'd3-selection'

import './Graph.css';

class Graph extends Component {
    constructor(props) {
        super(props);
        this.createBarChart = this.createBarChart.bind(this);
    }

    componentDidMount() {
        this.createBarChart()
    }
    
    componentDidUpdate() {
        this.createBarChart()
    }

    createBarChart() {
        const node = this.node
        const dataMax = d3.max(this.props.data)
        const yScale = d3.scaleLinear()
            .domain([0, dataMax])
            .range([0, this.props.size[1]])
        select(node)
            .selectAll('rect')
            .data(this.props.data)
            .enter()
            .append('rect')

        select(node)
            .selectAll('rect')
            .data(this.props.data)
            .exit()
            .remove()

        select(node)
            .selectAll('rect')
            .data(this.props.data)
            .style('fill', '#fe9922')
            .attr('x', (d, i) => i * 25)
            .attr('y', d => this.props.size[1] - yScale(d))
            .attr('height', d => yScale(d))
            .attr('width', 25)
    }
    render() {
        return <svg ref={node => this.node = node}
            width={500} height={500}>
        </svg>
    }
}

export default Graph;
