// src/components/Scatter/index.js
import React, { Component } from 'react';

import * as d3 from 'd3';

import './style.css';

class Scatter extends Component {
    // static propTypes = {}
    // static defaultProps = {}
    // state = {}
    constructor() {
        super();

        console.log('node', this.node);

        this.jsonData = [
            { "id": 1, "created_at": "Sun May 05 2013", "amount": 97 },
            { "id": 2, "created_at": "Mon May 13 2013", "amount": 15 },
            { "id": 3, "created_at": "Thu Jun 06 2013", "amount": 80 },
            { "id": 4, "created_at": "Thu May 09 2013", "amount": 24 },
            { "id": 5, "created_at": "Mon Jul 01 2013", "amount": 26 },
            { "id": 6, "created_at": "Mon Jul 01 2013", "amount": 12 },
            { "id": 7, "created_at": "Mon Aug 01 2013", "amount": 22 },
            { "id": 8, "created_at": "Mon Aug 01 2013", "amount": 12 },
        ];

        this.createChart = this.createChart.bind(this);
    }

    componentDidMount() {
        this.createChart();
    }

    componentDidUpdate() {
        this.createChart();
    }

    createChart() {
        const node = this.node;
        const canvasNode = this.canvasNode;
        
        let random = d3.randomNormal(0, 0.2),
            sqrt3 = Math.sqrt(3),
            points0 = d3.range(300).map(function () { return [random() + sqrt3, random() + 1]; }),
            points1 = d3.range(300).map(function () { return [random() - sqrt3, random() + 1]; }),
            points2 = d3.range(300).map(function () { return [random(), random() - 1]; }),
            pointsets = [points0, points1, points2],
            points = d3.merge([points0, points1, points2]),
            index = -1;

        let context = d3.select(canvasNode).node().getContext("2d"),
            svg = d3.select(node),
            width = +svg.attr("width"),
            height = +svg.attr("height");

        let k = height / width,
            x = d3.scaleLinear().domain([-4.5, 4.5]).range([0, width]),
            y = d3.scaleLinear().domain([-4.5 * k, 4.5 * k]).range([height, 0]);

        let xAxis = d3.axisTop(x).ticks(12),
            yAxis = d3.axisRight(y).ticks(12 * height / width);

        let zoom = d3.zoom()
            .on("zoom", zoomed);

        let gx = svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + (height - 10) + ")")
            .call(xAxis);

        let gy = svg.append("g")
            .attr("class", "axis axis--y")
            .attr("transform", "translate(10,0)")
            .call(yAxis);

        svg.selectAll(".domain")
            .style("display", "none");

        svg.call(zoom.transform, d3.zoomIdentity);

        d3.interval(function () {
            var pointset = pointsets[index = (index + 1) % (pointsets.length + 1)] || points,
                x0 = x(d3.min(pointset, function (d) { return d[0]; })),
                x1 = x(d3.max(pointset, function (d) { return d[0]; })),
                y0 = y(d3.max(pointset, function (d) { return d[1]; })),
                y1 = y(d3.min(pointset, function (d) { return d[1]; })),
                k = 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height),
                tx = (width - k * (x0 + x1)) / 2,
                ty = (height - k * (y0 + y1)) / 2;

            svg.transition()
                .duration(1500)
                .call(zoom.transform, d3.zoomIdentity
                    .translate(tx, ty)
                    .scale(k));
        }, 2500);

        function zoomed() {
            let transform = d3.event.transform,
                zx = transform.rescaleX(x),
                zy = transform.rescaleY(y);

            gx.call(xAxis.scale(zx));
            gy.call(yAxis.scale(zy));

            context.clearRect(0, 0, width, height);
            for (let j = 0, m = pointsets.length; j < m; ++j) {
                context.beginPath();
                context.fillStyle = d3.schemeCategory10[j];
                for (let points = pointsets[j], i = 0, n = points.length, p, px, py; i < n; ++i) {
                    p = points[i]; 
                    px = zx(p[0]); 
                    py = zy(p[1]);
                    context.moveTo(px + 2.5, py);
                    context.arc(px, py, 2.5, 0, 2 * Math.PI);
                }
                context.fill();
            }
        }

    }

    render() {
        return (
            <div className="scatter">

                <svg ref={node => this.node = node} 
                    className="absolute"
                    width={960} height={600}>
                </svg>
                <canvas ref={canvasNode => this.canvasNode = canvasNode}
                    className="absolute"
                    width="960" height="600"></canvas>
            </div>
        );
    }
}

export default Scatter;