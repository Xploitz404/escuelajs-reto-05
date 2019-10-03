/**
 * Al recargar la página se elimina el local storage y se muestran por defecto los primeros
 * 20 personajes.
 */
window.onload = localStorage.clear();
const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';

const getData = api => {
  fetch(api)
  .then(response => response.json())
    .then(response => {
      localStorage.setItem('next_fetch', response.info.next);
      const characters = response.results;
      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.error(error));
};

const loadData = async () => {
  try {
    let nextFetch = localStorage.getItem('next_fetch');
    console.log(nextFetch);
    if (nextFetch === null) {
      return await getData(API);
    } else if (nextFetch === '') {
      alert('Ya no hay más personajes :c');
      intersectionObserver.unobserve($observe);
    } else {
      return await getData(nextFetch);
    }
  } catch (error) {
    console.error(error);
  }
};

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});
intersectionObserver.observe($observe);

