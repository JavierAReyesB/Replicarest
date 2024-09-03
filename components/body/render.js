import './body.css' // Importa el CSS correspondiente

// render.js
export function renderImages(images, gallery, displayedImages) {
  images.forEach((image) => {
    if (!displayedImages.has(image.id)) {
      displayedImages.add(image.id)
      const card = document.createElement('div')
      card.className = 'card'
      card.innerHTML = `<img src="${image.urls.regular}" alt="${
        image.alt_description || 'Image'
      }">`
      gallery.appendChild(card)
    }
  })
}
