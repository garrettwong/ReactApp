import React, { Component } from 'react';
import * as d3 from 'd3';
// import { interpolateYlGnBu } from 'd3-scale-chromatic';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import { contours } from 'd3-contour';
import { select } from 'd3-selection';

class ContourPlot extends Component {
    constructor() {
        super();

        console.log('node', this.node);

        console.log(d3ScaleChromatic, contours, d3.contours);

        this.d3 = d3;
        Object.assign(d3, d3ScaleChromatic);
        this.contours = contours;

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

        console.log(this, node, d3);

        // Populate a grid of n×m values where -2 ≤ x ≤ 2 and -2 ≤ y ≤ 1.
        var n = 240, m = 125, values = new Array(n * m);
        for (var j = 0.5, k = 0; j < m; ++j) {
            for (var i = 0.5; i < n; ++i, ++k) {
                values[k] = goldsteinPrice(i / n * 4 - 2, 1 - j / m * 3);
            }
        }

        let svg = select(node),
            width = +svg.attr("width");


        let thresholds = d3.range(1, 21)
            .map(function (p) { return Math.pow(2, p); });

        let contours = this.contours()
            .size([n, m])
            .thresholds(thresholds);

        let color = d3.scaleLog()
            .domain(d3.extent(thresholds))
            .interpolate(function () { return d3.interpolateYlGnBu; });

        svg.selectAll("path")
            .data(contours(values))
            .enter().append("path")
            .attr("d", d3.geoPath(d3.geoIdentity().scale(width / n)))
            .attr("fill", function (d) { return color(d.value); });

        // See https://en.wikipedia.org/wiki/Test_functions_for_optimization
        function goldsteinPrice(x, y) {
            return (1 + Math.pow(x + y + 1, 2) * (19 - 14 * x + 3 * x * x - 14 * y + 6 * x * x + 3 * y * y))
                * (30 + Math.pow(2 * x - 3 * y, 2) * (18 - 32 * x + 12 * x * x + 48 * y - 36 * x * y + 27 * y * y));
        }

    }

    render() {


        return (
            <div>
                <h3>Contour Plot II</h3>
                <svg ref={node => this.node = node}
                    width={960} height={500} stroke="#fff" strokeWidth="0.5"></svg>
            </div>
        );
    }
}

export default ContourPlot;
