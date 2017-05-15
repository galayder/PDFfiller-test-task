$().ready(function() {
  $('input').bind('keydown', function(e) {
    if (e.which === 9)
      $('#checkout').validate({

        submitHandler: function(form) {
          $(form).ajaxSubmit();

        invalidHandler: function(event, validator) {
          // 'this' refers to the form
          var errors = validator.numberOfInvalids();
          if (errors) {
            var message = errors == 1 ?
              'You missed 1 field. It has been highlighted' :
              'You missed ' + errors + ' fields. They have been highlighted';
            $("div.error span").html(message);
            $("div.error").show();
          } else {
            $("div.error").hide();
          }
        },

        rules: {
          focusInvalid: true,
          cardnumber: {
            required: true,
            creditcard: true,
            length: 16
          },
          firstname: {
            required: true,
            minlength: 2,
            maxlength: 20
          },
          lastname: {
            required: true,
            minlength: 2,
            maxlength: 20
          }
        },
        messages: {
          cardnumber: {
            required: 'Provide your card number'
          },
          firstname: {
            required: 'What is your First name?',
            minlength: 'Too short',
            maxlength: 'Wow, how do you spell it?)'
          },
          lastname: {
            required: 'What is your Last Name?',
            minlength: 'Too short',
            maxlength: 'Wow, how do you spell it?)'
          }
        }
      })
  })
})
