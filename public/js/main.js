(function() {
  var autocomplete = require('autocomplete');
  var lastUpdatedLabel = document.getElementById('last-updated-label');
  var updateButton = document.getElementById('update-btn');
  var searchInput = document.getElementById('search-input');
  var resultsList = document.getElementById('results-list');

  autocomplete.init({
    url: '/db',
    limit: 10,
    onUpdateStart: function() {
      updateButton.innerHTML = 'Updating database...';
      updateButton.disabled = true;
    },
    onUpdate: function() {
      updateButton.disabled = false;
      updateButton.innerHTML = 'Update database';
      getLastUpdated();
    }
  });

  updateButton.onclick = autocomplete.update;

  searchInput.onkeyup = search;

  function search() {
    resultsList.innerHTML = '';
    results = autocomplete.search(searchInput.value);

    results.forEach(function(result) {
      resultsList.innerHTML += '<li>' + result + '</li>';
    });
  }

  function getLastUpdated() {
    lastUpdatedLabel.innerHTML = autocomplete.getLastUpdated();
  }

  getLastUpdated();

})();