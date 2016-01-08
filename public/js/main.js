(function() {
  var autocomplete = require('autocomplete');
  var lastUpdatedLabel = document.getElementById('last-updated-label');
  var updateButton = document.getElementById('update-btn');
  var searchInput = document.getElementById('search-input');
  var resultsList = document.getElementById('results-list');

  disable();
  updateButton.innerHTML = 'Loading database...';

  autocomplete.init({
    url: '/db',
    limit: 10,
    onUpdateStart: disable,
    onUpdate: enable
  }).then(enable);

  updateButton.onclick = autocomplete.update;

  searchInput.onkeyup = search;

  var searchFunction;

  function search() {
    if (typeof searchFunction === 'number') clearTimeout(searchFunction);

    searchFunction = setTimeout(function() {
      resultsList.innerHTML = '';
      results = autocomplete.search(searchInput.value);

      results.forEach(function(result) {
        resultsList.innerHTML += '<li>' + result + '</li>';
      }, 100);

    })
  }

  function getLastUpdated() {
    autocomplete.getLastUpdated()
      .then(function(result) {
        lastUpdatedLabel.innerHTML = result;
      });
  }

  function disable() {
    updateButton.innerHTML = 'Updating database...';
    updateButton.disabled = true;
    hide(searchInput);
  }

  function enable() {
    updateButton.disabled = false;
    updateButton.innerHTML = 'Update database';
    show(searchInput);
    getLastUpdated();
  }

  function hide(el) {
    (el.className.indexOf('hidden') === -1) && (el.className += ' hidden');
  }

  function show(el) {
    el.className = el.className.replace(/ hidden/g, '');
  }


  getLastUpdated();

})();