const carrossel = document.querySelector('.carrossel');
const arrowBtns = document.querySelectorAll('.banners button');
const primeiroCard = carrossel.querySelector('.card-item').offsetWidth;
const carrosselChildrens = [...carrossel.children];

let isDragging = false, startX, startScrollLeft;

// pegar a quantidade de cards
let cardPerView = Math.round(carrossel.offsetWidth / primeiroCard)

// inserir copier
carrosselChildrens.slice(-cardPerView).reverse().forEach(card => {
  carrossel.insertAdjacentHTML("afterbegin", card.outerHTML);
})

carrosselChildrens.slice(0, cardPerView).forEach(card => {
  carrossel.insertAdjacentHTML("beforeend", card.outerHTML);
})

// adicionar eventos nos arrows buttons para rolar o carrossel para a direita e esquerda
arrowBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    carrossel.scrollLeft += btn.id === 'arrow-left' ? -primeiroCard : primeiroCard;
  })
})

const dragStart = (event) => {
  isDragging = true;
  carrossel.classList.add('on');
  startX = event.pageX;
  startScrollLeft = carrossel.scrollLeft;
}

const dragging = (event) => {
  if(!isDragging) return;
  carrossel.scrollLeft = startScrollLeft - (event.pageX - startX);
}

const dragStop = () => {
  isDragging = false;
  carrossel.classList.remove('on');
}

const infiniteScroll = () => {
  if(carrossel.scrollLeft === 0){
    carrossel.classList.add('no-transition');
    carrossel.scrollLeft = carrossel.scrollWidth - (2 * carrossel.offsetWidth)
    carrossel.classList.remove('no-transition');
  } else if(Math.ceil(carrossel.scrollLeft) === carrossel.scrollWidth - carrossel.offsetWidth){
    carrossel.classList.add('no-transition');
    carrossel.scrollLeft = carrossel.offsetWidth;
    carrossel.classList.remove('no-transition');
  }
}

carrossel.addEventListener('mousedown', dragStart);
carrossel.addEventListener('mousemove', dragging);
document.addEventListener('mouseup', dragStop);
carrossel.addEventListener('scroll', infiniteScroll);