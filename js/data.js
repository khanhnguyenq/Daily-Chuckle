/* exported data */

let data = {
  view: 'landing',
  joke: [],
  editing: null,
  nextEntryId: 1,
};

const previousDataJSON = localStorage.getItem('data-object');

window.addEventListener('beforeunload', function (event) {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data-object', dataJSON);
});

if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
