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
    console.log('text:', text);
  }
  if (text === 'random') {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.chucknorris.io/jokes/random');
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      console.log(xhr.status);
      console.log(xhr.response);
    });
    xhr.send();
  } else {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.chucknorris.io/jokes/random?category=' + text);
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      console.log(xhr.status);
      console.log(xhr.response);
    });
    xhr.send();
  }
});
