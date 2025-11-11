import React, { useState, useEffect } from 'react';
import * as d3 from "d3";

function GetGain(input) {
    if (!input) return 0;

    let index = input.indexOf("gain:");
    if (index === -1) return 0; // if gain not found

    var stringArray = input.slice(index + 5).split(/(\s+)/)[0]; // get the first element after gain

    let val = Number(stringArray);

    if (val > 0) {
        val = Math.min(val / 2, 1);
    }
    else {
        val = 0;
    }

    return val;
}

// receives string of latest D3 input
function D3Graph({ input }) {

    const [inputArray, setInputArray] = useState([]);
    const maxItems = 35;
    const maxValue = 1;

    useEffect(() => {
        if (!input) return;

        // get the gain value
        let value = GetGain(input);

        setInputArray(prev => {
            const updated = [...prev, value]; // use normalized value
            if (updated.length > maxItems) updated.shift();
            return updated;
        })
    }, [input]);

    // d3 magic
    useEffect(() => {

        // select svg element
        const svg = d3.select("svg");
        svg.selectAll("*").remove();

        // set width and height
        let w = svg.node().getBoundingClientRect().width;
        w = w - 10;
        let h = svg.node().getBoundingClientRect().height;

        const barMargin = 5;
        const barWidth = w / inputArray.length;

        // create yScale
        let yScale = d3.scaleLinear()
            .domain([0, maxValue])
            .range([h, 0]);

        const chartGroup = svg.append("g")
            .classed("chartGroup", true)

        // draw rects
        chartGroup
            .selectAll("rect")
            .data(inputArray) // bind data
            .enter()
            .append("rect")
            .attr("height", 0)
            .attr("x", (d, i) => i * barWidth)
            .attr("y", d => yScale(d))
            .attr("width", barWidth - barMargin)
            .attr("height", d => { return h - yScale(d) })
            .style("fill", "#a980bd");

    }, [inputArray]);


    return (
        <span className="App container">
            <div className="row border border-dark rounded">
                <svg width="100%" height="300px" className="border border-light rounded p-2"></svg>
            </div>
        </span>
    )
}

export default D3Graph;