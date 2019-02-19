import * as d3 from "d3";

export default (data, state, type) => {
  const scaleMap = new Map();
  const x = d3
    .scaleTime()
    .domain(d3.extent(data, d => new Date(d.w * 1000)))
    .range([0, state[type].width]);
  scaleMap.set("x", x);
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.c)])
    .range([state[type].height, 0]);
  scaleMap.set("y", y);
  return scaleMap;
};
