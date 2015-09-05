$(document).ready(function(){

  $('#refreshBtn').on('click', function(){
    $.ajax({
      method: 'GET',
      url: '/users/refresh'
    }).done(function(data){
      console.log(data);
    })
  })

})
