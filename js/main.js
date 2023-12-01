/* global data */

const $navBar = document.querySelector('.landing-navbar');
const $allCategoryBtn = document.querySelector('.all-category');
const $savedBtn = document.querySelector('.saved-btn');
const $barsBtn = document.querySelector('.fa-bars');
const $xBtn = document.querySelector('.fa-x');
const $homeBtn = document.querySelector('.home');
const $favBtn = document.querySelector('.favorite-btn');

$savedBtn.addEventListener('click', function () {
  viewSwap('saved');
});

$favBtn.addEventListener('click', function () {
  viewSwap('favorited');
});

$navBar.addEventListener('click', function (event) {
  if (
    event.target.tagName === 'I' &&
    event.target.className === 'position fa-solid fa-bars'
  ) {
    $allCategoryBtn.classList.remove('hidden');
    $favBtn.classList.remove('hidden');
    $savedBtn.classList.remove('hidden');
    $xBtn.classList.remove('hidden');
    $barsBtn.classList.add('hidden');
  } else if (
    event.target.tagName === 'I' &&
    event.target.className === 'position fa-solid fa-x'
  ) {
    $allCategoryBtn.classList.add('hidden');
    $favBtn.classList.add('hidden');
    $savedBtn.classList.add('hidden');
    $xBtn.classList.add('hidden');
    $barsBtn.classList.remove('hidden');
  }
});

let text = '';

const $categoryContainer = document.querySelector('.h-category');

$categoryContainer.addEventListener('click', function (event) {
  event.preventDefault();
  if (event.target.tagName === 'BUTTON') {
    text = event.target.textContent;
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
        $jokeArea.appendChild(renderOneJoke(data.joke[0]));
      });
      xhr.send();
    } else {
      const xhr = new XMLHttpRequest();
      xhr.open(
        'GET',
        'https://api.chucknorris.io/jokes/random?category=' + text,
      );
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        const generatedJoke = {};
        generatedJoke.categories = xhr.response.categories;
        generatedJoke.value = xhr.response.value;
        generatedJoke.entryId = data.nextEntryId;
        data.joke.unshift(generatedJoke);
        data.nextEntryId++;
        $jokeArea.appendChild(renderOneJoke(data.joke[0]));
      });
      xhr.send();
    }
    viewSwap('joke');
  }
});

const $jokeHeader = document.querySelector('.joke-header');
const $jokeNav = document.querySelector('.joke-navbar');
const $jokePage = document.querySelector('.joke');

const $savedHeader = document.querySelector('.saved-header');
const $savedPage = document.querySelector('.saved');

const $favoritedHeader = document.querySelector('.favorited-header');
const $favoritedPage = document.querySelector('.favorited');

const $landingHeader = document.querySelector('.landing-header');
const $landingNav = document.querySelector('.landing-navbar');
const $landingPage = document.querySelector('.landing');

function viewSwap(view) {
  if (view === 'landing') {
    $landingHeader.classList.remove('hidden');
    $landingNav.classList.remove('hidden');
    $landingPage.classList.remove('hidden');

    $savedHeader.classList.add('hidden');
    $savedPage.classList.add('hidden');

    $jokeHeader.classList.add('hidden');
    $jokeNav.classList.add('hidden');
    $jokePage.classList.add('hidden');

    $favoritedHeader.classList.add('hidden');
    $favoritedPage.classList.add('hidden');

    data.view = 'landing';
  } else if (view === 'joke') {
    $landingHeader.classList.add('hidden');
    $landingNav.classList.add('hidden');
    $landingPage.classList.add('hidden');

    $savedHeader.classList.add('hidden');
    $savedPage.classList.add('hidden');

    $jokeHeader.classList.remove('hidden');
    $jokeNav.classList.remove('hidden');
    $jokePage.classList.remove('hidden');

    $favoritedHeader.classList.add('hidden');
    $favoritedPage.classList.add('hidden');

    data.view = 'joke';
  } else if (view === 'saved') {
    $landingHeader.classList.add('hidden');
    $landingNav.classList.add('hidden');
    $landingPage.classList.add('hidden');

    $savedHeader.classList.remove('hidden');
    $jokeNav.classList.remove('hidden');
    $savedPage.classList.remove('hidden');

    $jokeHeader.classList.add('hidden');
    $jokePage.classList.add('hidden');

    $favoritedHeader.classList.add('hidden');
    $favoritedPage.classList.add('hidden');

    data.view = 'saved';
  } else if ((view = 'favorited')) {
    $landingHeader.classList.add('hidden');
    $landingNav.classList.add('hidden');
    $landingPage.classList.add('hidden');

    $savedHeader.classList.add('hidden');
    $jokeNav.classList.add('hidden');
    $savedPage.classList.add('hidden');

    $jokeHeader.classList.add('hidden');
    $jokePage.classList.add('hidden');

    $favoritedHeader.classList.remove('hidden');
    $jokeNav.classList.remove('hidden');
    $favoritedPage.classList.remove('hidden');

    data.view = 'favorited';
  }
}

const $jokeArea = document.querySelector('.joke-container');
const $jokeView = document.querySelector('[data-view="joke"]');
const $savedView = document.querySelector('[data-view="saved"]');
const $savedJokeArea = document.querySelector('.saved-ul');
const $favoritedJokeArea = document.querySelector('.favorited-ul');

function renderOneJoke(joke) {
  const $jokeDiv = document.createElement('div');
  const $jokeP = document.createElement('p');
  const $heart = document.createElement('i');

  $jokeDiv.setAttribute(
    'class',
    'margin-bottom-30 joke-p flex center-all text-center flex-column',
  );
  $jokeDiv.setAttribute('data-entry', `${joke.entryId}`);

  $jokeP.setAttribute('class', 'font-small');
  $jokeP.textContent = joke.value;

  $heart.setAttribute('class', 'fa-regular fa-heart');

  $jokeDiv.appendChild($jokeP);
  $jokeDiv.appendChild($heart);

  return $jokeDiv;
}

function renderFavJoke(joke) {
  const $jokeDiv = document.createElement('div');
  const $jokeP = document.createElement('p');
  const $heart = document.createElement('i');

  $jokeDiv.setAttribute(
    'class',
    'margin-bottom-30 joke-p flex center-all text-center flex-column',
  );
  $jokeDiv.setAttribute('data-entry', `${joke.entryId}`);

  $jokeP.setAttribute('class', 'font-small');
  $jokeP.textContent = joke.value;

  $heart.setAttribute('class', 'fa-solid fa-heart');

  $jokeDiv.appendChild($jokeP);
  $jokeDiv.appendChild($heart);

  return $jokeDiv;
}

document.addEventListener('DOMContentLoaded', function () {
  for (let i = 0; i < data.joke.length; i++) {
    $savedJokeArea.appendChild(renderOneJoke(data.joke[i]));
  }
  for (let i = 0; i < data.favorited.length; i++) {
    $favoritedJokeArea.appendChild(renderFavJoke(data.favorited[i]));
  }
  viewSwap(data.view);
});

$savedBtn.addEventListener('click', function () {
  viewSwap('saved');
});

$homeBtn.addEventListener('click', function () {
  const $jokeP = document.querySelector('.joke-p');
  $jokeP.remove();
  viewSwap('landing');
});

const $anotherBtn = document.querySelector('.another-btn');

$anotherBtn.addEventListener('click', function () {
  if (text === 'random') {
    const xhrAnother = new XMLHttpRequest();
    xhrAnother.open('GET', 'https://api.chucknorris.io/jokes/random');
    xhrAnother.responseType = 'json';
    xhrAnother.addEventListener('load', function () {
      const generatedJoke = {};
      generatedJoke.categories = xhrAnother.response.categories;
      generatedJoke.value = xhrAnother.response.value;
      generatedJoke.entryId = data.nextEntryId;
      data.joke.unshift(generatedJoke);
      data.nextEntryId++;
      const $displayedJoke = document.querySelector('.font-small');
      $displayedJoke.textContent = data.joke[0].value;
    });
    xhrAnother.send();
  } else {
    const xhrAnother = new XMLHttpRequest();
    xhrAnother.open(
      'GET',
      'https://api.chucknorris.io/jokes/random?category=' + text,
    );
    xhrAnother.responseType = 'json';
    xhrAnother.addEventListener('load', function () {
      const generatedJoke = {};
      generatedJoke.categories = xhrAnother.response.categories;
      generatedJoke.value = xhrAnother.response.value;
      generatedJoke.entryId = data.nextEntryId;
      data.joke.unshift(generatedJoke);
      data.nextEntryId++;
      const $displayedJoke = document.querySelector('.font-small');
      $displayedJoke.textContent = data.joke[0].value;
    });
    xhrAnother.send();
  }
});

let clickedId = '';

document.addEventListener('click', function (event) {
  const clickedItem = event.target;
  if (
    clickedItem.tagName === 'I' &&
    clickedItem.className === 'fa-regular fa-heart'
  ) {
    clickedId = parseInt(clickedItem.closest('div').getAttribute('data-entry'));
    clickedItem.className = 'fa-solid fa-heart';
    for (let i = 0; i < data.joke.length; i++) {
      if (data.joke[i].entryId === clickedId) {
        data.favorited.unshift(data.joke[i]);
      }
    }
  } else if (
    clickedItem.tagName === 'I' &&
    clickedItem.className === 'fa-solid fa-heart'
  ) {
    clickedItem.className = 'fa-regular fa-heart';
    clickedId = parseInt(clickedItem.closest('div').getAttribute('data-entry'));
    for (let i = 0; i < data.favorited.length; i++) {
      if (data.favorited[i].entryId === clickedId) {
        data.favorited.splice(i, 1);
      }
    }
  }
});
