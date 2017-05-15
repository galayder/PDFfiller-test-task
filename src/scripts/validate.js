$("#checkout").validate({

  success: function(label) {
    label.addClass("valid").text("Ok!")
  },
  submitHandler: function() {
    alert("Submitted!")
  },

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
      maxlength: 16
    },
    month: {
      required: true
    },
    year: {
      required: true
    },
    cvv: {
      required: true,
      minlength: 3
    },
    zipcode: {
      required: true,
      maxlength: 5
    }
  },

  messages: {
    firstname: {
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
      length: "Must be 16 digits"
    },
    month: {
      required: "Please, select"
    },
    year: {
      required: "Please, select"
    },
    cvv: {
      required: "Enter CVV",
      minlength: "At least 3 chars"
    },
    zipcode: {
      required: "Must be 5 chars"
    }
  },

});
