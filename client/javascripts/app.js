$(document).ready(function(){
  //pertains to users page controls
  function requestUsers(){
    $.ajax({
      method: 'GET',
      url: '/users/refresh'
    }).done(function(data){
      console.log(data);
    }).fail(function(err){
      console.log(err)
    }).always(function(){})
  };
  //refresh the users display
  $('#refreshBtn').on('click', function(){
    requestUsers();
  });
  //logout and display main login page
  $('#logOut').on('click', function(){
    $.ajax({
      method: 'GET',
      url: '/users/logout'
    }).done(function(data){
      var loginSwitch = document.open('text/html', 'replace');
      loginSwitch.write(data);
      loginSwitch.close();
    })
  });

  //pertains to register/login page control
  //this listens for register button click and adds new user to database
  //the server will send back if the user already exists and that will flash on screen
  $('#register').submit(function(e){
    e.preventDefault();
    if($('#password').val() === $('#password_confirmation').val()){
      $(this).ajaxSubmit({
        type: 'POST',
        url: '/register',
        clearForm: true,
        success: function(data){
          console.log(data);
          if(data == 'Already exists') {
            var $userInput = $('.usernameInput');
            if($userInput.children('p').length > 0){
              $('.existsAlready').show()
            } else {
              $userExistsDiv = $('<div>').addClass('alert alert-error existsAlready');
              $userExistsA = $('<a>').attr({class: 'close', href: '#', 'data-dismiss': 'alert'}).text('x');
              $userExistsP = $('<p>').text('Username already exists');
              $userInput.append($userExistsDiv.append($userExistsA).append($userExistsP));
            }
          } else {
            $('#Register').modal('hide');
            $('#userInput').val(data);
            $('#LoginForm').prepend('<p>Registration Successful!');
          }
        }
      });
    } else {
      $('.matchPassword').removeClass('hidden');
    }
  });
});
