import './body.css' // Importa el CSS correspondiente
import { searchImages, fetchRandomCatImages } from './api.js' // Importar funciones desde api.js
import { renderImages } from './render.js' // Importar la función de renderizado

// Variables y elementos DOM
const gallery = document.getElementById('gallery')
const loadMoreButton = document.getElementById('load-more')
const logo = document.querySelector('.logo')
let currentPage = 1
let currentQuery = ''
const displayedImages = new Set() // Conjunto para rastrear URLs de imágenes ya mostradas

// Función para volver al estado inicial
function resetToInitial() {
  currentPage = 1
  currentQuery = 'gatos' // Restablecer a la búsqueda inicial de gatos
  displayedImages.clear() // Limpiar el conjunto de imágenes mostradas
  console.log('Restableciendo al estado inicial') // Registro para depuración
  fetchRandomCatImages()
    .then((data) => renderImages(data, gallery, displayedImages))
    .catch((error) => {
      console.error('Error al buscar imágenes aleatorias de gatos:', error)
      gallery.innerHTML = `<p>Error al cargar las imágenes. Inténtalo de nuevo más tarde.</p>` // Corrección: uso de comillas invertidas
    })
}

// Evento para cargar más imágenes
loadMoreButton.addEventListener('click', () => {
  currentPage++
  console.log(`Cargando más imágenes, nueva página: ${currentPage}`) // Corrección: uso de comillas invertidas
  searchImages(currentQuery, currentPage)
    .then((data) => {
      if (data.results && data.results.length > 0) {
        const uniqueImages = data.results.filter(
          (image) => !displayedImages.has(image.id)
        )
        renderImages(uniqueImages, gallery, displayedImages)

        // Mostrar u ocultar el botón "Cargar más" basado en las páginas disponibles
        if (data.total_pages > currentPage) {
          loadMoreButton.style.display = 'block'
        } else {
          loadMoreButton.style.display = 'none'
        }
      } else {
        gallery.innerHTML += '<p>No se encontraron más resultados.</p>' // Corrección: uso de comillas simples
        loadMoreButton.style.display = 'none'
      }
    })
    .catch((error) => {
      console.error('Error al cargar más imágenes:', error)
      gallery.innerHTML += `<p>Error al cargar más imágenes. Inténtalo de nuevo más tarde.</p>` // Corrección: uso de comillas invertidas
    })
})

// Agrega un evento al logo para restablecer al estado inicial
logo.addEventListener('click', resetToInitial)

// Inicializa la página con la búsqueda predeterminada
resetToInitial()
