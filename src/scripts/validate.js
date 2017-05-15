$().ready(function() {

  $('#checkout').validate({

    success: function(label) {
      input.addClass("valid")
    },
    success: function() {
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
