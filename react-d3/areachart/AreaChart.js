'use strict';

var React = require('react');
var d3 = require('d3');
var DataSeries = require('./DataSeries');
var $__0=      require('../common'),Chart=$__0.Chart,XAxis=$__0.XAxis,YAxis=$__0.YAxis;
var $__1=     require('../mixins'),CartesianChartPropsMixin=$__1.CartesianChartPropsMixin,ViewBoxMixin=$__1.ViewBoxMixin;
var LineDataSeries = require('../linechart/DataSeries');
var utils = require('../utils');
var VoronoiCircleContainer = require('../linechart/VoronoiCircleContainer');
module.exports = React.createClass({

  mixins: [ CartesianChartPropsMixin, ViewBoxMixin ],

  displayName: 'AreaChart',

  propTypes: {
    margins:           React.PropTypes.object,
    interpolate:       React.PropTypes.bool,
    interpolationType: React.PropTypes.string,
    hoverAnimation:    React.PropTypes.bool,
    width:             React.PropTypes.node,
    height:            React.PropTypes.node,
 },

  getDefaultProps:function() {
    return {
      circleRadius:    3,
      margins: {top: 10, right: 20, bottom: 40, left: 45},
      yAxisTickCount: 4,
      interpolate: true,
      interpolationType: null,
      className: 'rd3-areachart',
      hoverAnimation: true
    };
  },

  _calculateScales: utils.calculateScales,

  render:function() {

    var props = this.props;

    var data = props.data;

    var interpolationType = props.interpolationType || (props.interpolate ? 'cardinal' : 'linear');

    // Calculate inner chart dimensions
    var innerWidth, innerHeight;
    innerWidth = this.getOuterDimensions().width - props.margins.left - props.margins.right;
    innerHeight = this.getOuterDimensions().height - props.margins.top - props.margins.bottom;

    if (!Array.isArray(data)) {
      data = [data];
    }

    var yScale = d3.scale.linear()
      .range([innerHeight, 0]);

    var xValues = [];
    var yValues = [];
    var seriesNames = [];
    var yMaxValues = [];
    data.forEach( function(series)  {
      var upper = 0;
      seriesNames.push(series.name);
      series.values.forEach(function(val, idx)  {
        upper = Math.max(upper, props.yAccessor(val));
        xValues.push(props.xAccessor(val));
        yValues.push(props.yAccessor(val));
      });
      yMaxValues.push(upper);
    });

    var xScale;
    if (xValues.length > 0 && Object.prototype.toString.call(xValues[0]) === '[object Date]' && props.xAxisTickInterval) {
      xScale = d3.time.scale()
        .range([0, innerWidth]);
    } else {
      xScale = d3.scale.linear()
        .range([0, innerWidth]);
    }

    xScale.domain(d3.extent(xValues));
    yScale.domain([0, d3.sum(yMaxValues)]);

    props.colors.domain(seriesNames);

    var stack = d3.layout.stack()
      .x(props.xAccessor)
      .y(props.yAccessor)
      .values(function(d) { return d.values; });

    var layers = stack(data);

    var trans = ("translate(" +  props.margins.left + "," +  props.margins.top + ")");

    var dataSeries = layers.map( function(d, idx)  {

      return (
          React.createElement(DataSeries, {
            key: idx,
            seriesName: d.name,
            fill: props.colors(props.colorAccessor(d, idx)),
            index: idx,
            xScale: xScale,
            yScale: yScale,
            data: d.values,
            xAccessor: props.xAccessor,
            yAccessor: props.yAccessor,
            interpolationType: interpolationType,
            hoverAnimation: props.hoverAnimation}
          )
        );
      });
      var renderLine = null;
    if (this.props.lineData && this.props.lineData.length>0){
        var flattenedData = utils.flattenData(props.lineData, props.xAccessor, props.yAccessor);

        var allValues = flattenedData.allValues;

        renderLine =
        React.createElement(LineDataSeries, {
          xScale: xScale,
          yScale: yScale,
          xAccessor: props.xAccessor,
          yAccessor: props.yAccessor,
          hoverAnimation: props.hoverAnimation,
          circleRadius: props.circleRadius,
          data: props.lineData,
          value: allValues,
          interpolationType: props.interpolationType,
          width: innerWidth,
          height: innerHeight}
        )
    };

    // var flattenedData = utils.flattenData(props.data, props.xAccessor, props.yAccessor);
    // var allValues = flattenedData.allValues;
    //
    // var voronoi = d3.geom.voronoi()
    //   .x(function(d){ return xScale(d.coord.x); })
    //   .y(function(d){ return yScale(d.coord.y); })
    //   .clipExtent([[0, 0], [ innerWidth, innerHeight]]);
    //
    // var cx, cy, circleFill;
    // var regions = voronoi(allValues).map(function(vnode, idx) {
    //   var point = vnode.point.coord;
    //   if (Object.prototype.toString.call(props.xAccessor(point)) === '[object Date]') {
    //     cx = xScale(props.xAccessor(point).getTime());
    //   } else {
    //     cx = xScale(props.xAccessor(point));
    //   }
    //   if (Object.prototype.toString.call(props.yAccessor(point)) === '[object Date]') {
    //     cy = yScale(props.yAccessor(point).getTime());
    //   } else {
    //     cy = yScale(props.yAccessor(point));
    //   }
    //   circleFill = vnode.color;
    //
    //   return (
    //       React.createElement(VoronoiCircleContainer, {
    //           key: idx,
    //           circleFill: circleFill,
    //           vnode: vnode,
    //           cx: cx, cy: cy,
    //           circleRadius: props.circleRadius}
    //       )
    //   );
    // }.bind(this));


    return (
      React.createElement(Chart, {
        viewBox: this.getViewBox(),
        legend: props.legend,
        data: data,
        margins: props.margins,
        colors: props.colors,
        colorAccessor: props.colorAccessor,
        width: props.width,
        height: props.height,
        title: props.title
      },
        React.createElement("g", {transform: trans, className: props.className},
          React.createElement(XAxis, {
            xAxisClassName: "rd3-areachart-xaxis",
            xScale: xScale,
            xAxisTickValues: props.xAxisTickValues,
            xAxisTickInterval: props.xAxisTickInterval,
            xAxisTickCount: props.xAxisTickCount,
            xAxisLabel: props.xAxisLabel,
            xAxisLabelOffset: props.xAxisLabelOffset,
            tickFormatting: props.xAxisFormatter,
            xOrient: props.xOrient,
            yOrient: props.yOrient,
            margins: props.margins,
            width: innerWidth,
            height: innerHeight,
            gridVertical: props.gridVertical,
            gridVerticalStroke: props.gridVerticalStroke,
            gridVerticalStrokeWidth: props.gridVerticalStrokeWidth,
            gridVerticalStrokeDash: props.gridVerticalStrokeDash}
          ),
          React.createElement(YAxis, {
            yAxisClassName: "rd3-areachart-yaxis",
            yScale: yScale,
            yAxisTickValues: props.yAxisTickValues,
            yAxisTickInterval: props.yAxisTickInterval,
            yAxisTickCount: props.yAxisTickCount,
            yAxisLabel: props.yAxisLabel,
            yAxisLabelOffset: props.yAxisLabelOffset,
            tickFormatting: props.yAxisFormatter,
            xOrient: props.xOrient,
            yOrient: props.yOrient,
            margins: props.margins,
            width: innerWidth-10,
            height: innerHeight,
            gridHorizontal: props.gridHorizontal,
            gridHorizontalStroke: props.gridHorizontalStroke,
            gridHorizontalStrokeWidth: props.gridHorizontalStrokeWidth,
            gridHorizontalStrokeDash: props.gridHorizontalStrokeDash}
          ),
          dataSeries,
          renderLine
        )
      )
    );
  }

});
