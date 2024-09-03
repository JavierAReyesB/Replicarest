import './body.css' // Importa el CSS correspondiente

// utils.js
import { fetchRandomCatImages } from './api.js'
import { renderImages } from './render.js'

export function resetToInitial(gallery, displayedImages) {
  gallery.innerHTML = '' // Limpiar la galería
  displayedImages.clear() // Limpiar el conjunto de imágenes mostradas
  fetchRandomCatImages()
    .then((data) => renderImages(data, gallery, displayedImages))
    .catch((error) => {
      console.error('Error al buscar imágenes aleatorias de gatos:', error)
      gallery.innerHTML = `<p>Error al cargar las imágenes. Inténtalo de nuevo más tarde.</p>`
    })
}
