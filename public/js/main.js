(function() {
  var autocomplete = require('autocomplete');
  var lastUpdatedLabel = document.getElementById('last-updated-label');
  var updateButton = document.getElementById('update-btn');

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
      lastUpdatedLabel.innerHTML = autocomplete.getLastUpdated();
    }
  });


})();