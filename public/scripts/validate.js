$().ready(function(){

    $("payment").validate({

       rules:{

            firstName:{
                required: true,
                minlength: 2,
                maxlength: 16,
            },

            lastName:{
                required: true,
                minlength: 2,
                maxlength: 16,
            },
       },

       messages:{

            login:{
                required: "Это поле обязательно для заполнения",
                minlength: "Логин должен быть минимум 4 символа",
                maxlength: "Максимальное число символо - 16",
            },

            pswd:{
                required: "Это поле обязательно для заполнения",
                minlength: "Пароль должен быть минимум 6 символа",
                maxlength: "Пароль должен быть максимум 16 символов",
            },

       }

    });

});
