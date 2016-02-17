var chartData1 = [];


generateChartData();

function generateChartData() {
  var firstDate = new Date();
  firstDate.setDate( firstDate.getDate() - 500 );
  firstDate.setHours( 0, 0, 0, 0 );

  for ( var i = 0; i < 500; i++ ) {
    var newDate = new Date( firstDate );
    newDate.setDate( newDate.getDate() + i );

    var a1 = Math.round( Math.random() * ( 40 + i ) ) + 100 + i;
    var b1 = Math.round( Math.random() * ( 1000 + i ) ) + 500 + i * 2;

    chartData1.push( {
      date: newDate,
      value: a1,
      volume: b1
    } );
  }
}

var chart = AmCharts.makeChart( "graphdiv", {
  type: "stock",
  "theme": "light",  

  dataSets: [ {
      title: "first data set",
      fieldMappings: [ {
        fromField: "value",
        toField: "value"
      }, {
        fromField: "volume",
        toField: "volume"
      } ],
      dataProvider: chartData1,
      categoryField: "date"
    }
  ],

  panels: [ {

      showCategoryAxis: false,
      title: "Value",
      percentHeight: 0,

      stockGraphs: [ {
        id: "g1",

        valueField: "value",
        comparable: true,
        compareField: "value",
        balloonText: "[[title]]:<b>[[value]]</b>",
        compareGraphBalloonText: "[[title]]:<b>[[value]]</b>"
      } ],

      stockLegend: {
        periodValueTextComparing: "[[percents.value.close]]%",
        periodValueTextRegular: "[[value.close]]"
      }
    },

    {
      title: "Volume",
      percentHeight: 100,
      stockGraphs: [ {
        id: "g2",
        valueField: "volume",
        type: "column",
        showBalloon: true,
        fillAlphas: 1
      } ],


      stockLegend: {
        periodValueTextRegular: "[[value.close]]"
      }
    }
  ],

  chartScrollbarSettings: {
    graph: "g2"
  },

  chartCursorSettings: {
    valueBalloonsEnabled: true,
    fullWidth: true,
    cursorAlpha: 0.1,
    valueLineBalloonEnabled: true,
    valueLineEnabled: true,
    valueLineAlpha: 0.5
  },

  periodSelector: {
    position: "left",
    periods: [ {
      period: "MM",
      selected: true,
      count: 1,
      label: "1 month"
    }, {
      period: "YYYY",
      count: 1,
      label: "1 year"
    }, {
      period: "YTD",
      label: "YTD"
    }, {
      period: "MAX",
      label: "MAX"
    } ]
  },

  dataSetSelector: {
    position: "left"
  },
  "export": {
    "enabled": true
  }
} );