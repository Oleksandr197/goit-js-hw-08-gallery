import images from "./gallery-items.js";


const galleryContainer = document.querySelector(".js-gallery");
const modal = document.querySelector(".js-lightbox");
const modalLargeImg = document.querySelector(".lightbox__image");
const overlay = document.querySelector(".lightbox__overlay")
const modalBtnClose = document.querySelector(".lightbox__button");


// Створення і рендер розмітки по масиву даних і наданим шаблоном.

galleryContainer.insertAdjacentHTML("beforeend", galleryCardMarkup(images));
   
function galleryCardMarkup(photos) {
    return photos.map(({ preview, original, description }) => {
        return `<li class="gallery__item">
                    <a class="gallery__link"
                     href=${original}>
                         <img class="gallery__image"
                          src=${preview}
                          data-source=${original}
                          alt=${description} />
                    </a>
                    </li>`
    }).join("");
};

//  Реалізація делегування на галереї `ul.js-gallery` і отримання `url` великого   зображення.

 galleryContainer.addEventListener('click', openLargeImg);

function openLargeImg(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG')  return;
  
  // - Відкриття модального вікна при натисканні на елементі галереї.
  modal.classList.add('is-open');
  overlay.addEventListener('click', closeModalOverlay);
  document.addEventListener('keydown', closeModalEscape);
  // - Підміна значення атрибута `src` елемента `img.lightbox__image`.
  modalLargeImg.src = event.target.dataset.source;
}

// - Закриття модального вікна при натисканні на кнопку   `button[data-action=""close-lightbox"]`.
modalBtnClose.addEventListener('click', closeLargeImg);

function closeLargeImg(event) {
   event.preventDefault();
  modal.classList.remove('is-open');
  overlay.removeEventListener('click', closeModalOverlay);
  document.removeEventListener('keydown', closeModalEscape);
  // - Очищення значення атрибута `src` елемента `img.lightbox__image`. Це необхідно
//     для того, щоб при наступному відкритті модального вікна, поки вантажиться
//     зображення, ми не бачили попереднє.
  modalLargeImg.src = '';
};
// - Закриття модального вікна при натисканні на `div.lightbox__overlay`.

function closeModalOverlay(event) {
    if (event.currentTarget === event.target) 
        closeLargeImg(event)      
    };

// - Закриття модального вікна після натискання клавіші `ESC`.

function closeModalEscape(event) {
  if (event.code === 'Escape') 
    closeLargeImg(event);
};

