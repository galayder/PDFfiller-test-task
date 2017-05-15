$().ready(function() {

  $('input').on("keypress", function(e) {
    /* ENTER PRESSED*/
    if (e.keyCode == 13) {
      /* FOCUS ELEMENT */
      var inputs = $(this).parents("form").eq(0).find(":input");
      var idx = inputs.index(this);

      if (idx == inputs.length - 1) {
        inputs[0].select()
      } else {
        inputs[idx + 1].focus(); //  handles submit buttons
        inputs[idx + 1].select();
      }
      return false;
    }
  });

  $('#checkout').validate({

    invalidHandler: function(event, validator) {
      // 'this' refers to the form
      form.submit();
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
      focusInvalid: false,
      cardnumber: {
        required: true,
        creditcard: true,
        minlength: 16
      },
      cvv: {
        required: true,
        minlength: 5
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
      },
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
