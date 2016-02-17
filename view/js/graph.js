var cuurent_color = "#ff5858";

var c_l  = [cuurent_color, "#71d63b", "#00acff"];


function showGraph(chartData) {

	if($('#graphdiv').data('chart')) {

		$('#graphdiv').data('chart').clear();

		//$('#graphdiv').html('');

	}
	c_l  = [cuurent_color, "#71d63b", "#00acff"];

	var chart = AmCharts.makeChart("graphdiv", {

		  type: "stock",

		  "theme": "light",
		  colors: c_l,



		  dataSets: [ {

		      title: "first data set",

		      fieldMappings: [ {

		        fromField: "value",

		        toField: "value"

		      }, {

		        fromField: "volume",

		        toField: "volume"

		      } ],

		      dataProvider: chartData,

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

		});

	

	$('#graphdiv').data('chart', chart);

}



function generateChartData() {

  var firstDate = new Date(), chartData = [];

  firstDate.setDate( firstDate.getDate() - 500 );

  firstDate.setHours( 0, 0, 0, 0 );



  for ( var i = 0; i < 500; i++ ) {

    var newDate = new Date( firstDate );

    newDate.setDate( newDate.getDate() + i );



    var a1 = Math.round( Math.random() * ( 40 + i ) ) + 100 + i;

    var b1 = Math.round( Math.random() * ( 1000 + i ) ) + 500 + i * 2;



    chartData.push( {

      date: newDate,

      value: a1,

      volume: b1

    } );

  }

  

  return chartData;

}



function loadData() {

	 var period = {

	   date_from: $('#datepicker-from').val(),

	   date_to: $('#datepicker-to').val(),

	   typeid: $('#typeSwitcher').find('li.active').data('type-id'),

	   categoryid: $('#category-dropdown').data('category-id'),

     };

	

	 $.ajax({

	    type: "GET",

	    url: "/ajax/graph",

	    dataType: "json",

	    data: period,

	    success: function(data) {

	    	showGraph(data);

	    }

	 });

}



$(document).ready(function(){

	$.fn.datepicker.dates['ru'] = {
	    days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
	    daysShort: ["Вск", "Пон", "Втр", "Срд", "Чтв", "Птн", "Сбт"],
	    daysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
	    months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
	    monthsShort: ["Янв", "Фев", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сен", "Окт", "Ноя", "Дек"],
	    today: "Сегодня",
	    format: "dd-mm-yyyy",
	    weekStart: 1
	};

	$("#datepicker-from" ).datepicker({
	    language: 'ru'
	}).on('changeDate',function(data)
	{
		var date_from = $('#datepicker-from').val();
	      $('.amcharts-start-date-input').val(date_from);
	      $('.amcharts-start-date-input').blur();
	      loadData();
	});

	

	$("#datepicker-to" ).datepicker({
		language: 'ru'
	}).on('changeDate',function(data)
	{
		var date_to = $('#datepicker-to').val();
		$('.amcharts-end-date-input').val(date_to);
		$('.amcharts-end-date-input').blur();
		loadData();
	});


	

	$('#typeSwitcher').on('change', loadData);

	$('#typeSwitcher li a').on('click', function(){

		if($(this).parent().is('.active')) return;

		var container = $(this).closest('ul');

		container.find('li.active').removeClass('active');

		$(this).parent().addClass('active');

		container.trigger('change');

		cuurent_color = $(this).data('color');

	});



	$('#category-dropdown').on('change', loadData);

	$('#category-dropdown ul.dropdown-menu li a').on('click', function(){

		if($(this).parent().is('.active')) return;

		var container = $(this).closest('ul');

		container.find('li.active').removeClass('active');

		$(this).parent().addClass('active');

		container.closest('li.dropdown').find('a.dropdown-toggle').find('span.currentCategory').text($(this).text());

		$('#category-dropdown').data('category-id', $(this).data('id'));

		$('#category-dropdown').trigger('change');

	});

	

	//var data = generateChartData();

	//console.log(data);

	//showGraph(data);

	

	

	//

	loadData();

});





