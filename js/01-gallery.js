import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainerRef = document.querySelector('.gallery');

function createGallery(items) {
  return items.map( ({ preview, original, description }) => {
    return `<div class="gallery__item"><a class="gallery__link" href="${original}">
<img class="gallery__image" src="${preview}" data-source="${original}"
alt="${description}" /></a></div>`
  }).join("");
};

galleryContainerRef.innerHTML = createGallery(galleryItems);
galleryContainerRef.addEventListener('click', onImgClick);

function onImgClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== "IMG") {
    return
  }

  const instance = basicLightbox.create(`<img src="${e.target.dataset.source}" width="800" height="600">`)

  instance.show()

  galleryContainerRef.addEventListener('keydown', onEscClose);

  function onEscClose(env) {
    if (env.code === "Escape") {
      instance.close()
      galleryContainerRef.removeEventListener('keydown', onEscClose);
    }
  }
}
