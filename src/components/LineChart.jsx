import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const LineChart = ({ data, width = 600, height = 450 }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };

    svg.attr("width", width).attr("height", height);

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = (g) =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(
          d3
            .axisBottom(x)
            .ticks(width / 80)
            .tickSizeOuter(0)
        )
        .append("text")
        .attr("x", width / 2)
        .attr("y", 40)
        .attr("fill", "currentColor")
        .attr("text-anchor", "middle")
        .text("Date");

    const yAxis = (g) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call((g) => g.select(".domain").remove())
        .call((g) =>
          g
            .append("text")
            .attr("x", -margin.left)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("Value")
        );

    svg.selectAll("*").remove(); // Clear previous content

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

    svg
      .append("g")
      .attr("stroke", "currentColor")
      .attr("stroke-opacity", 0.1)
      .call((g) =>
        g
          .append("g")
          .selectAll("line")
          .data(x.ticks())
          .join("line")
          .attr("x1", (d) => 0.5 + x(d))
          .attr("x2", (d) => 0.5 + x(d))
          .attr("y1", margin.top)
          .attr("y2", height - margin.bottom)
      )
      .call((g) =>
        g
          .append("g")
          .selectAll("line")
          .data(y.ticks())
          .join("line")
          .attr("y1", (d) => 0.5 + y(d))
          .attr("y2", (d) => 0.5 + y(d))
          .attr("x1", margin.left)
          .attr("x2", width - margin.right)
      );

    const line = d3
      .line()
      .defined((d) => !isNaN(d.value))
      .x((d) => x(d.date))
      .y((d) => y(d.value))
      .curve(d3.curveCatmullRom.alpha(0.5)); // Smoother curve

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#f910f9") // Neon pink color
      .attr("stroke-width", 2)
      .attr("d", line);

    // Tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background", "#fff")
      .style("border", "1px solid #ccc")
      .style("padding", "5px")
      .style("display", "none")
      .style("pointer-events", "none")
      .style("box-shadow", "0px 0px 6px 0px rgba(0, 0, 0, 0.15)");

    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y(d.value))
      .attr("r", 4)
      .attr("fill", "#f910f9") // Neon pink color
      .on("mouseover", (event, d) => {
        tooltip
          .style("display", "block")
          .html(
            `Date: ${d3.timeFormat("%b %d, %Y")(d.date)}<br>Value: ${d.value}`
          )
          .style("left", event.pageX + 5 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", () => tooltip.style("display", "none"));
  }, [data, width, height]);

  return (
    <div className='relative'>
      <svg ref={svgRef}></svg>
      <style jsx>{`
        .tooltip {
          position: absolute;
          text-align: center;
          width: auto;
          height: auto;
          padding: 8px;
          font: 12px sans-serif;
          background: white;
          border: 0px;
          border-radius: 8px;
          pointer-events: none;
          box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
};

export default LineChart;
