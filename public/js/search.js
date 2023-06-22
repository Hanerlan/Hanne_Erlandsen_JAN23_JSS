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