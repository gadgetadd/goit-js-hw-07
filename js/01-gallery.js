import { galleryItems } from "./gallery-items.js";

const galleryEl = document.querySelector(".gallery");

const galleryMarkup = galleryItems
  .map(({ preview, original, description }) => {
    return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
  })
  .join("");

galleryEl.insertAdjacentHTML("beforeend", galleryMarkup);

galleryEl.addEventListener("click", onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();

  if (!event.target.classList.contains("gallery__image")) {
    return;
  }

  const instance = basicLightbox.create(
    `<img width="1280" src="${event.target.dataset.source}">`
  );
  instance.show();

  window.addEventListener("keydown", onEscPress);

  function onEscPress() {
    instance.close();
    window.removeEventListener("keydown", onEscPress);
  }
}
