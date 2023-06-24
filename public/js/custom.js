// POST information to the memes route
$(document).ready(function() {
  $('.details-button').on('click', function() {
    var memeId = $(this).data('meme-id');

    $.ajax({
      method: 'POST',
      url: '/memeDetails',
      data: { memeId: memeId } 
    })
      .done(function(response) {
        $('#memeRow_' + memeId).addClass('viewed');
        window.location.href = '/memeDetails/' + memeId;
      });
  });


  $('#searchButton').on('click', function() {
    searchMemes();
  });
});

// Table search functionality
function searchMemes() {
  let searchInput = $('#searchInput').val().trim().toLowerCase();
  let rows = $('#table tr');

  rows.each(function() {
      let nameColumn = $(this).find('td:eq(1)');
      if (nameColumn.length) {
          let name = nameColumn.text().toLowerCase();
          if (name.indexOf(searchInput) > -1) {
              $(this).show();
          } else {
              $(this).hide();
          }
      }
  });
}