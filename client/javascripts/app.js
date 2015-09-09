$(document).ready(function(){
  $allUsers = $('.allusers');
  //pertains to users page controls
  function requestUsers(){
    $.ajax({
      method: 'GET',
      url: '/users/refresh'
    }).done(function(data){
      $users = $allUsers;
      $users.empty();
      data.forEach(function(user, userInd) {
        $userDiv = $('<div>').addClass('user');
        $userUl = $('<ul>').addClass('list-group');
        $userLiUser = $('<li>').addClass('list-group-item');
        $userLiName = $('<li>').addClass('list-group-item');
        $userLiEmail = $('<li>').addClass('list-group-item');
        $userAEmail = $('<a>');
        $userLiUser.text('Username: ' + user.username);
        $userLiName.text('Name: ' + user.firstname + ' ' + user.lastname);
        $userAEmail.attr({href: 'mailto:' + user.email}).text('Email ' + user.firstname);
        $userDiv.append($userUl.append($userLiName).append($userLiUser).append($userLiEmail.append($userAEmail)));
        $users.append($userDiv);
      });
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
  $allUsers.on('click', '#subBrews', function(e){
    e.preventDefault();
    var data = {
      username: $('.brewnoteform').data('id'),
      brew: $('#brew').val(),
      brewnotes: $('#brewnotes').val()
    };
    $('#brew').val('');
    $('#brewnotes').val('');
    $.ajax({
      method: 'POST',
      url: '/users/post',
      data: data
    }).done(function(data){
      var source = $("#NewBeerPost").html();
      var template = Handlebars.compile(source);
      $('.allposts').append(template(data));
      console.log(data);
    })
  });
  $allUsers.on('click', '#delPost', function(e){
      var $post = $(this);
      e.preventDefault();
      var data = {
        id: $($post).parent().parent().data('id'),
      }
      $.ajax({
        method: 'DELETE',
        url: '/users/deletepost',
        data: data
      }).done(function(err, data){
        console.log(data);
        $post.parent().parent().remove();
      })
  });
  $allUsers.on('click', '#editPost', function(e){
      e.preventDefault();
      var $post = $(this).parent().parent();
      var $beer = $('.beerpost');
      var $notes = $('.brewnotespost');
      var beer = $beer.data('brew');
      var note = $notes.text();
      var $beerLi = $('<li>');
      var $editBeer = $('<input type="text" id="editedBrew">').val(beer);
      var $postLi = $('<li>');
      var $editPost = $('<textarea rows="3" cols="20" id="editedBrewNotes">').val(note);
      $beer.remove();
      $notes.remove();
      $post.prepend($('<button id="subEdit" class="btn btn-primary">Submit Edit</button>')).prepend($postLi.append($editPost)).prepend($beerLi.append($editBeer));
  });
  $allUsers.on('click', '#subEdit', function(e) {
    e.preventDefault();
    $post = $(this).parent();
    $brew = $('#editedBrew');
    var data = {
      id: $post.data('id'),
      brew: $('#editedBrew').val(),
      brewnotes: $('#editedBrewNotes').val(),
    };
    $.ajax({
      method: 'PUT',
      url: '/users/editpost',
      data: data
    }).done(function(data){
      console.log(data);
      $post.remove();
      var source = $("#NewBeerPost").html();
      var template = Handlebars.compile(source);
      $('.allposts').append(template(data));
    })
  })
});
