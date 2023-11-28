/* global data */

const $navBar = document.querySelector('.navbar');
const $allCategoryBtn = document.querySelector('.all-category');
const $savedBtn = document.querySelector('.saved');
const $barsBtn = document.querySelector('.fa-bars');
const $xBtn = document.querySelector('.fa-x');

$navBar.addEventListener('click', function (event) {
  if (
    event.target.tagName === 'I' &&
    event.target.className === 'fa-solid fa-bars'
  ) {
    $allCategoryBtn.classList.remove('hidden');
    $savedBtn.classList.remove('hidden');
    $xBtn.classList.remove('hidden');
    $barsBtn.classList.add('hidden');
  } else if (
    event.target.tagName === 'I' &&
    event.target.className === 'fa-solid fa-x'
  ) {
    $allCategoryBtn.classList.add('hidden');
    $savedBtn.classList.add('hidden');
    $xBtn.classList.add('hidden');
    $barsBtn.classList.remove('hidden');
  }
});

let text = '';

const $categoryContainer = document.querySelector('.h-category');

$categoryContainer.addEventListener('click', function (event) {
  event.preventDefault();
  if ((event.target.tagName = 'BUTTON')) {
    text = event.target.textContent;
  }
  if (text === 'random') {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.chucknorris.io/jokes/random');
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      const generatedJoke = {};
      generatedJoke.categories = xhr.response.categories;
      generatedJoke.value = xhr.response.value;
      generatedJoke.entryId = data.nextEntryId;
      data.joke.unshift(generatedJoke);
      data.nextEntryId++;
    });
    xhr.send();
  } else {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.chucknorris.io/jokes/random?category=' + text);
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      const generatedJoke = {};
      generatedJoke.categories = xhr.response.categories;
      generatedJoke.value = xhr.response.value;
      generatedJoke.entryId = data.nextEntryId;
      data.joke.unshift(generatedJoke);
      data.nextEntryId++;
    });
    xhr.send();
  }
});

const $requestedHeader = document.querySelector('.requested-header');
const $savedHeader = document.querySelector('.saved-header');
const $dailyHeader = document.querySelector('.daily-header');

function viewSwap(view) {
  if (view === 'landing') {
    $dailyHeader.classList.remove('hidden');
    $savedHeader.classList.add('hidden');
    $requestedHeader.classList.add('hidden');
  } else if (view === 'joke') {
    $dailyHeader.classList.add('hidden');
    $savedHeader.classList.add('hidden');
    $requestedHeader.classList.remove('hidden');
  } else if (view === 'saved') {
    $dailyHeader.classList.add('hidden');
    $savedHeader.classList.remove('hidden');
    $requestedHeader.classList.add('hidden');
  }
}
