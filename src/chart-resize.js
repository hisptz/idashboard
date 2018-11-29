window.onbeforeprint = function () {
  $(Highcharts.charts).each(function (i, chart) {
    chart.oldhasUserSize = chart.hasUserSize;
    chart.resetParams = [chart.chartWidth, chart.chartHeight, false];
    var height = chart.renderTo.clientHeight;
    var width = chart.renderTo.clientWidth > 1000 ? 1000 : chart.renderTo.clientWidth;
    chart.setSize(width, height, false);
  });
};
window.onafterprint = function () {
  $(Highcharts.charts).each(function (i, chart) {
    chart.setSize.apply(chart, chart.resetParams);
    chart.hasUserSize = chart.oldhasUserSize;
  });
};
