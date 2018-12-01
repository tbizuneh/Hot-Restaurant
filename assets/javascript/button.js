$(".submit").on("click", function(){
    // Here we grab the form elements
    var newReservation = {
        name: $('#reserve_name').val().trim(),
        phone: $('#reserve_phone').val().trim(),
        email: $('#reserve_email').val().trim(),
        id: $('#reserve_uniqueID').val().trim(),
      party: $('#reserve_party').val().trim()
    };
    console.log(newReservation);
    var currentURL = window.location.origin;
    $.post(currentURL + "/api/new", newReservation,
    function(data) {
        // If a table is available... tell user they are booked.
        if(data === true){
            alert("Yay! You are officially booked!")
        }
        // If a table is available... tell user they on the waiting list.
        if(data === false){
            alert("Sorry you are on the wait list")
        }
        // Clear the form when submitting
        $('#reserve_name').val("");
        $('#reserve_phone').val("");
        $('#reserve_email').val("");
        $('#reserve_uniqueID').val("");
      $('#reserve_party').val().trim()
    });
return false;
});

    $.ajax({
          url: '/api',
          method: 'GET'
        }).done(function(response) {
          console.log(response.reservations);
          if (response) {
            var tableSection = $('#tableSection');
            var waitlistSection = $('#waitlistSection');
            for (var i = 0; i < response.reservations.length; i++) {
              var tableDiv = $('<div>').addClass('well');
              var id = response.reservations[i].id;
              tableDiv.append($('<h2>').html("<span class='label label-primary'>1</span>|"));
              tableDiv.append($('<div>').append($('<h4>').text(id)));
              tableSection.append(tableDiv);
            }
            for (var i = 0; i < response.waitlist.length; i++) {
              var tableDiv = $('<div>').addClass('well');
              var id = response.waitlist[i].id;
              tableDiv.append($('<h2>').html("<span class='label label-primary'>1</span>|"));
              tableDiv.append($('<div>').append($('<h4>').text(id)));
              waitlistSection.append(tableDiv);
            }
          }
        });