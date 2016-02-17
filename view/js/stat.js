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
      var date_from = $('#datepicker-to').val();
      $('.amcharts-end-date-input').val(date_from);
      $('.amcharts-end-date-input').blur();
      loadData();
  });


var loader = {
  start : function()
  {
    $('body').append('<div id="loader" \
      style="position: fixed; top: 0; left: 0; \
      width: 100%; height: 100%; background: rgba(0,0,0,.3); \
      z-index: 9999999999999"><img src="/view/img/loader.gif" \
      width="80" height="80" style="position: absolute; \
      top: 50%; left: 50%; margin: -40px 0 0 -40px"></div>');
    loader.take_scroll();
  },
  stop: function()
  {
    $('#loader').remove();
    $('html').removeAttr('style');
  },
  take_scroll: function()
  {
      var div = document.createElement('div');
            
      div.style.overflowY = 'scroll';
      div.style.width =  '50px';
      div.style.height = '50px';

      div.style.visibility = 'hidden';

      document.body.appendChild(div);
      var scrollWidth = div.offsetWidth - div.clientWidth;
      document.body.removeChild(div);

      $('html').attr('style','overflow: hidden; padding-right: '+scrollWidth+'px');
  }
}
  function loadData() {
	  var period = {
		 date_from: $('#datepicker-from').val(),
		 date_to: $('#datepicker-to').val()
	  };
    loader.start();
	  $.ajax({
	    type: "GET",
	    url: "/ajax/stat",
	    dataType: "json",
	    data: period,
	    success: function(data)
      {
        console.log(data);
	      drawAll(data);
	    },
      complete: function(xhr, status)
      {
          loader.stop();
      },
	  });
  }

  var colors = 
  [
    '#F47672',
    '#A6EAF6',
    '#B8DF7B',
    '#FDD86A',
    '#D2C9F1',
    '#A2EED3',
    '#95B0FF',
    '#FFD5B9',
    '#72CDF4',
    '#DDFAAE',
    '#FFC369',
    '#E6DFFF',
    '#80DF98',
    '#8B9AFF'
  ]

  
  //  диаграмма http://www.amcharts.com/
  function DrawPieDiagram(dataProvider, diagramClass){
      var chart = AmCharts.makeChart(diagramClass, {
          "type": "pie",
          "theme": "light",
          "pullOutRadius": "0%",
          "dataProvider": dataProvider,

          "titleField": "category",
          "valueField": "value",
           "labelsEnabled": true,

           "pullOutEffect": "easeOutSine",
           "pullOutDuration": 0.2,

           "balloonText": false,

           "labelText": "[[title]]: [[percents]]%",
           "startDuration": 0,
           "radius": "45%",
           "innerRadius": "45%",
           "backgroundColor": "#fff",
           "colors" : colors,
           "fontSize": 12,
           "fontFamily": "Arial",
           "color": "#404040"

      });
      
      $('#'+diagramClass).data('chart', chart);
  }

  // Список
  function DrawLegend(dataProvider, listClass, color){

      $.each(dataProvider, function(index, value){
          $(listClass).append('<li class="item-icon-legend"><div class="category-icon" style="background: url(/view/img/'+ value.image +') no-repeat center center;"></div>\
            <div class="category-name">' + value.category + '</div>\
            <div class="category-value color-'+color+'"><span class="number">' + value.value + ' </span>\
            <span class="text-xs color-grey"> '+ value.in_day +' '+ lang_js_data.per_day +'</span></div>\
            </li>');
      });
   }

  // отделени тысячи пробелом
  function Separate(){
    var $numbers = $('.number');

    $numbers.each(function(){
        var newNumber = $(this).text().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
         $(this).text(newNumber);
    });
  }

  // Крупные траты
  function BigSpending(dataProvider){
    $.each(dataProvider, function(index, value){
        $('.big-spending .row').append('<div class="col-lg-2 col-md-4 col-sm-4 col-xs-6 text-center big-spending-item">\
          <div class="cat-icon" style="background: url(/view/img/'+ value.image +') no-repeat center center;"></div>\
          <div class="number color-red item-sum">'+ value.value +'</div>\
          <div>'+ value.category +'</div>\
          <div class="item-data">'+ value.date +'</div>\
      </div>');
    });
  }

  // Краткая информация
  function ShortInfo(dataProvider){
    $.each(dataProvider, function(index, value){
        $('.short-info-wrapper').append('<div class="data-item col-sm-4 col-md-4 col-xs-12">\
          <div class="center768">\
            <div class="text-lg"><span class="color-'+ value.color +' number">'+ value.value +'</span></div>\
            <div class="text-med text-sm margin14">'+ value.name +'</div>\
            <div><span class="number">'+ value.value_month +' '+ lang_js_data.per_month +'</div>\
            <div><span class="number">'+ value.value_day +' </span>'+ lang_js_data.per_day +'</div>\
          </div>\
        </div>\
          ');
    });
  }
var diagram1 = false;
var diagram2 = false;
  $(window).resize(function()
    {
      var width = $(window).width();
      var flag = false;
      if(width < 768)
      {
        $('.text-center-chart').css({'display':'block','width':'100%'});
        flag = true;
      }
      else
      {
        flag = false;
        $('.text-center-chart').css({'display':'inline-block','width':'49%'});
      }
      if(diagram1)
      {
        if(flag) $('.chart-costs').css({'display':'block', 'width':'100%'});
        else $('.chart-costs').css({'display':'inline-block', 'width':'49%'});
      }
      else
      {
        $('.chart-costs').hide();
        $('.chart-costs-header').hide();
      }

      if(diagram2)
      {
        if(flag) $('.chart-income').css({'display':'block', 'width':'100%'});
        else $('.chart-income').css({'display':'inline-block', 'width':'49%'});
        $('.chart-income-header').css({'display':'block'});
      }
      else
      {
        $('.chart-income-header').hide();
        $('.chart-income').hide();
      }
    });

  function drawAll(data)
  {
    var width = $(window).width();
    var flag = false;
    if(width < 768)
    {
      $('.text-center-chart').css({'display':'block','width':'100%'});
      flag = true;
    }
    else
    {
      flag = false;
      $('.text-center-chart').css({'display':'inline-block','width':'49%'});
    }
    if(data.diagram1)
    {
      diagram1 = true;
      if(flag) $('.chart-costs').css({'display':'block', 'width':'100%'});
      else $('.chart-costs').css({'display':'inline-block', 'width':'49%'});
      $('.chart-costs-header').css({'display':'block'});
    }
    else
    {
      $('.chart-costs').hide();
      $('.chart-costs-header').hide();
    }

    if(data.diagram2)
    {
      diagram2 = true;
      if(flag) $('.chart-income').css({'display':'block', 'width':'100%'});
      else $('.chart-income').css({'display':'inline-block', 'width':'49%'});
      $('.chart-income-header').css({'display':'block'});
    }
    else
    {
      $('.chart-income-header').hide();
      $('.chart-income').hide();
    }

    if(data.bigSpending)
    {
      $('.big-spending').show();
    }
    else
    {
      $('.big-spending').hide();
    }


	  if($('#chart-costs').data('chart')) $('#chart-costs').data('chart').clear();


	  $('.chart-costs-list').html('');
	  
	   DrawPieDiagram(data.diagram1, "chart-costs");	  
      DrawLegend(data.diagram1, ".chart-costs-list","red");
      
    if($('#chart-income').data('chart')) $('#chart-income').data('chart').clear();

	  $('.chart-income-list').html('');
	  
      DrawPieDiagram(data.diagram2, "chart-income");
      DrawLegend(data.diagram2, ".chart-income-list","green");

      
      $('.big-spending .row .big-spending-item').remove();
      BigSpending(data.bigSpending);
	  
      $('.short-info-wrapper .data-item').remove();
      ShortInfo(data.shortInfo);

      Separate();
  }
  
  loadData();
});