// src/components/About/index.js
import React, { Component } from 'react';

import * as d3 from 'd3';

import './style.css';


import miserables from './miserables.json';

class DirectedGraphEditor extends Component {

    // static propTypes = {}
    // static defaultProps = {}
    // state = {}
    constructor() {
        super();

        this.createChart = this.createChart.bind(this);
    }

    componentDidMount() {
        this.createChart();
    }

    componentDidUpdate() {
        this.createChart();
    }

    /* https://bl.ocks.org/mbostock/ad70335eeef6d167bc36fd3c04378048 */
    createChart() {
        const node = this.node;

        // init canvas
        let canvas = d3.select(node).node(),
            context = canvas.getContext("2d"),
            width = canvas.width,
            height = canvas.height;

        // simulation
        let simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function (d) { return d.id; }))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2));

        // load data
        console.log('mis', miserables, simulation);

        let graph = miserables;

        simulation
            .nodes(graph.nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(graph.links);

        console.log(node, d3.drag, dragsubject, dragstarted, dragged, dragended);


        d3.select(canvas)
            .call(
                d3.drag()
                    .container(canvas)
                    .subject(dragsubject)
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended)
            );

        function ticked() {
            context.clearRect(0, 0, width, height);

            context.beginPath();
            graph.links.forEach(drawLink);
            context.strokeStyle = "#aaa";
            context.stroke();

            context.beginPath();
            graph.nodes.forEach(drawNode);
            context.fill();
            context.strokeStyle = "#fff";
            context.stroke();
        }

        function dragsubject() {
            return simulation.find(d3.event.x, d3.event.y);
        }

        function dragstarted() {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d3.event.subject.fx = d3.event.subject.x;
            d3.event.subject.fy = d3.event.subject.y;
        }

        function dragged() {
            d3.event.subject.fx = d3.event.x;
            d3.event.subject.fy = d3.event.y;
        }

        function dragended() {
            if (!d3.event.active) simulation.alphaTarget(0);
            d3.event.subject.fx = null;
            d3.event.subject.fy = null;
        }

        function drawLink(d) {
            context.moveTo(d.source.x, d.source.y);
            context.lineTo(d.target.x, d.target.y);
        }

        function drawNode(d) {
            context.moveTo(d.x + 3, d.y);
            context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
        }
    }

    render() {
        return (
            <div>
                <canvas ref={node => this.node = node}
                    width={960} height={600}>
                </canvas>

            </div>
        );

    }


}


export default DirectedGraphEditor;