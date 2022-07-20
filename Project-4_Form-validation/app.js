$(document).ready(function(){
    // we will not show error when the page loads
    // so we will hide the ids
    $('#usernamevalidation').hide();

    var Error = true;
    var email_error = true;
    var password_error = true;
    var confirm_password_error = true;

    $('#usernamevalidation').hide();
    $('#emailvalidation').hide();
    $('#passwordvalidation').hide();
    $('#confirmpasswordvalidation').hide();

    $('input').change(function(){
        if(Error == true && password_error == true && confirm_password_error == true && email_error == true){
            $('#submit').attr('disabled', false);
            $('#submit').css('background-color', '#0d6efd');
            
        }
            
        else{
            $('#submit').attr('disabled', true);
            $('#submit').css('background-color', 'grey');
        }
            
    })


    $('#username').keyup(function(){
        username_validation();
    })

    $('#email').keyup(function(){
        email_validation();
    })

    $('#password').keyup(function(){
        password_validation();
    })

    $('#confirmPassword').keyup(function(){
        confirm_password();
    })

    function username_validation(){
        var username_val = $('#username').val();
        if(username_val.length == ''){

            $('#usernamevalidation').show();
            $('#usernamevalidation').html('Username cannot be empty');
            $('#usernamevalidation').css('color', 'red');
            
            Error = false;
            return false;
        }
        else{
            Error = true;
            $('#usernamevalidation').hide();
        }
        if(username_val.length<4){
            $('#usernamevalidation').show();
            $('#usernamevalidation').html('Username cannot be less than 4');
            $('#usernamevalidation').css('color', 'red');
            
            Error = false;
            return false;
        }
        else{
            Error = true;
            $('#usernamevalidation').hide();
        }
    }

    function email_validation(){
        var email_val = $('#email').val();
        if(email_val.length == ''){
    
            $('#emailvalidation').show();
            $('#emailvalidation').html('Email cannot be empty');
            $('#emailvalidation').css('color', 'red');
            
            email_error = false;
            return false;
        }
        else{
            email_error = true;
            $('#emailvalidation').hide();
        }
        if(!email_val.match(/^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/)){
            $('#emailvalidation').show();
            $('#emailvalidation').html('Email must be in a valid format.');
            $('#emailvalidation').css('color', 'red');
            
            email_error = false;
            return false;
        }
        else{
            email_error = true;
            $('#emailvalidation').hide();
        }
    }



    function password_validation(){
        var password_val = $('#password').val();
        if(password_val.length == ''){
    
            $('#passwordvalidation').show();
            $('#passwordvalidation').html('Password cannot be empty');
            $('#passwordvalidation').css('color', 'red');
            
            password_error = false;
            return false;
        }
        else{
            password_error = true;
            $('#passwordvalidation').hide();
        }
        if(!password_val.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)){
            $('#passwordvalidation').show();
            $('#passwordvalidation').html('Password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters');
            $('#passwordvalidation').css('color', 'red');
            
            password_error = false;
            return false;
        }
        else{
            password_error = true;
            $('#passwordvalidation').hide();
        }
    }

    function confirm_password(){
        var confirm_password_val  = $('#confirmPassword').val();
        var password_val = $('#password').val();
        if(password_val != confirm_password_val){
            $('#confirmpasswordvalidation').show();
            $('#confirmpasswordvalidation').html('password did not match');
            $('#confirmpasswordvalidation').css('color', 'red');
            
            confirm_password_error = false;
            return false;
        }
        else{
            confirm_password_error = true;
            $('#confirmpasswordvalidation').hide();
        }
    }

    // we do not want the submit button to work if the form is invalid.
    $('#submitvalidation').keydown(function(){
        username_validation();
        password_validation();
        confirm_password();

        if(Error == true && password_error == true && confirm_password_error == true && email_error == true)
            $('#submit').attr('disabled', false);
        else
            $('#submit').attr('disabled', true);
    });
});

// HOMEWORK:
// ADD EMAIL OPTION WITH ITS REGEX TOO.
// var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
// var emailregex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;