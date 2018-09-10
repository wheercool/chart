import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../../styles/line-chart.css'
import {log} from '../../utils'
import R from 'ramda'
import {scaleLinear} from 'd3-scale'

class HorizontalLineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: null
        }

    }
    render() {

      const {data, width, height, min, max} = this.props;
      const getY = R.last
      const getYSeries = R.map(getY)
      const getYData = getYSeries//R.pipe(R.map(getXSeries), R.flatten)
      const maximum = R.reduce(R.max, -Infinity)
      const minimum = R.reduce(R.min, Infinity)
      const maxY = R.pipe(getYData, maximum)
      const minY = R.pipe(getYData, minimum)
      const extentX = d => [minY(d), maxY(d)]
        if (this.state.chart) {
            this.state.chart.resize(width, height);
            this.state.chart.updateOptions({
                  'file':  data,
                  dateWindow: [min, max]
                  //'valueRange': extentX(data)
                })
        }
        return (
            <div className="chart">
            </div>
        )
    }
    componentDidMount() {
        let element = ReactDOM.findDOMNode(this);
        const {data, width, height, labels, ranges, colors, min, max} = this.props;

        const indexBySeries = R.indexBy(R.prop('name'));

        const addPlotter = (minMax, channel) => ({
          /*
            Каждая series иммет свой range значений.
          */
          'color': colors[channel],
          'plotter': function(e) {
                var scale = scaleLinear().domain(minMax).range([e.plotArea.h, 0]);

                e.points.forEach(function(p) {
                    p.canvasy = scale(p.yval);
                });
                Dygraph.Plotters.linePlotter(e);
            }
        });

        const  makeSeries = R.mapObjIndexed(addPlotter)
        this.state.chart = new Dygraph(element, data, {
                labels: labels,
                width: width,
                height: height,
                dateWindow: [min, max], //x-axis range
                axes: {
                        y: {
                            drawAxis: false, //y шкала будт отображать не корректные данные
                            //Она отображает смерженные данные
                            drawGrid: true,
                            pixelsPerLabel: 60,
                            // valueRange: [1, 111]
                        },
                        x: {
                            connectSeparatedPoints: true,
                            pixelsPerLabel: 30,
                            drawAxis: true,
                            drawGrid: true,
                            // axisLabelFormatter: () => ""

                        }
            },
            series: makeSeries(ranges)
        })

    }
}

HorizontalLineChart.propTypes = {
    labels: React.PropTypes.arrayOf(React.PropTypes.string), //Список названий каналов
    ranges: React.PropTypes.object, //описание диапазона значений поканально
    color: React.PropTypes.object, //поканальные цвета
    data: React.PropTypes.arrayOf(
      React.PropTypes.arrayOf(React.PropTypes.oneOfType([
        React.PropTypes.instanceOf(Date),
        React.PropTypes.number
      ])) // row. Описывает точку
    ) //данные
}

export default HorizontalLineChart
