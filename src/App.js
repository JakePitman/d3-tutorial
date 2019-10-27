import React from 'react';
import * as d3 from "d3"
import './App.css';
import data from './data.csv'

class App extends React.Component {

  componentDidMount() {

    const svg = d3.select('svg')

    const width = +(svg.attr('width'))
    const height = +(svg.attr('height'))

    const render = (data) => {
      const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.population)])
        .range([0, width])

      const yScale = d3.scaleBand()
        .domain(data.map(d => d.country))
        .range([0, height])

      svg.selectAll('rect').data(data)
        .enter().append('rect')
          .attr('y', d => yScale(d.country))
          .attr('width', d => xScale(d.population))
          .attr('height', yScale.bandwidth())
    }

    d3.csv(data).then(function(data) {
      const parsedData = data.map(entry => {
        return { ...entry, population: +(entry.population) }
      })
      render(parsedData)
    });

  }

  render(){
    return(
      <div className="App">
        <h1>-- d3 --</h1>
        <svg height="500" width="1000"></svg>
      </div>
    )
  }
}

export default App;
