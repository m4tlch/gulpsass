$(document).ready(function(){
  // Сверка паролей
  $('.modal button[action="save"]').click(function() {
    var error = 0;
    $('.modal .form-horizontal').find('input').each(function() {
      if($(this).val().length <= 0){
          $(this).addClass('error-inp');
          error=1;
      }
      else{
          $(this).removeClass('error-inp');
      }
    });
    if (error == 1) {
      $('.modal .modal-errorr').show(200);
      $('.modal .modal-errorr span').html( lang_js_data.set_form );
      return false;
    } else {
      if ($('#newPass').val() == $('#newPass2').val()) {
		$.ajax({
			type: "POST",
		    url: "/aut/change",
		    dataType: "json",
		    data: {
		    	old_pass : $('#oldPass').val(),
		    	new_pass : $('#newPass2').val()
		    },
		    success: function(data) {
		    	if(typeof(data) != 'object' || data.error) {
		    		$('#oldPass').addClass('error-inp');
		            $('.modal .modal-errorr').show(200);
		            $('.modal .modal-errorr span').html( data.message );
				} else {
					$('.modal .form-horizontal').hide();
			        $('.modal .modal-ok').show();
			        $('.modal button[action="save"]').hide();
			        $('.modal button[action="close"]').show();
				}
		    }
		});

        return false;
      } else {
        $('#newPass').addClass('error-inp');
        $('#newPass2').addClass('error-inp');
        $('.modal .modal-errorr').show(200);
        $('.modal .modal-errorr span').html( lang_js_data.pass_no_match );
        return false;
      };
    };
  });

  $('.modal .form-horizontal input').keyup(function()
  {
    var val = $(this).val();
    if(val.length <= 0)
    {
      $(this).addClass('error-inp');
    }
    else
    {
            $('.modal .modal-errorr').hide(200);
      $(this).removeClass('error-inp');
    }
  });
  
}); /* end ready*/
