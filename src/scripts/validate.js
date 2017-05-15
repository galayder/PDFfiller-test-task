$("#checkout").validate({

  submitHandler: function(form) {
    // do other things for a valid form
    form.submit();
  },

  rules: {
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
    cardnumber: {
      required: true,
      creditcard: true,
      minlength: 16
    },
    month: {
      required: true
    },
    year: {
      required: true
    },
    cvv: {
      required: true,
      length: 4
    },
    zipcode: {
      required: true,
      length: 5
    }
  },

  messages: {
    lasname: {
      required: "Please, fill in",
      minlength: "Too short",
      maxlength: "Wow, how do you spell it?)"
    },
    lastname: {
      required: "Please, fill in",
      minlength: "Too short",
      maxlength: "Wow, how do you spell it?)"
    },
    cardnumber: {
      required: "Provide creditcard number",
      creditcard: "It's a creditcard",
      length: "Must be 16 digits"
    },
    month: {
      required: "Error"
    },
    year: {
      required: "Error"
    },
    cvv: {
      required: "Error",
      minlength: "Error"
    },
    zipcode: {
      required: "Error"
    }
  },

});
