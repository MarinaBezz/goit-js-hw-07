import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");
const galleryCardsSet = createGallery(galleryItems);
galleryContainer.insertAdjacentHTML("beforeend", galleryCardsSet);

console.log(createGallery(galleryItems));

function createGallery(galleryItems) {
  return galleryItems
    .map(({ original, preview, description }) => {
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
}

galleryContainer.addEventListener("click", secectImageOnClick);

function secectImageOnClick(evt) {
  evt.preventDefault();

  const itemImage = !evt.target.classList.contains("gallery-image");
  if (!itemImage) {
    return;
  }

  const currentImgUrl = evt.target.dataset.source;
  const instance = basicLightbox.create(
    `
  		<img src="${currentImgUrl}" width="1280" height="auto"/>
     `,
    {
      onShow: (instance) => {
        window.addEventListener("keydown", onEscKeyPress);
      },
      onClose: (instance) => {
        window.removeEventListener("keydown", onEscKeyPress);
      },
    }
  );

  instance.show();

  function onEscKeyPress(evt) {
    if (evt.code !== "Escape") return;
    instance.close();
  }
}
