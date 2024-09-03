// header.js
import './header.css' // Importar el CSS correspondiente
import { searchImages } from '../body/api.js' // Importar la función searchImages
import { resetToInitial } from '../body/utils.js' // Importar la función resetToInitial

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input')
  const searchButton = document.getElementById('search-button')
  const hamburgerMenu = document.getElementById('hamburger-menu')
  const mobileMenu = document.getElementById('mobile-menu')
  const logo = document.querySelector('.logo') // Seleccionar el logo
  const gallery = document.getElementById('gallery')
  const displayedImages = new Set() // Conjunto para rastrear URLs de imágenes ya mostradas

  // Evento al hacer clic en el botón de búsqueda
  searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim()
    if (query) {
      searchImages(query, 1)
        .then((data) => {
          if (data.results && data.results.length > 0) {
            gallery.innerHTML = '' // Limpiar la galería para nuevas búsquedas
            data.results.forEach((image) => {
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
          } else {
            gallery.innerHTML =
              '<p>No se encontraron resultados para tu búsqueda.</p>'
          }
        })
        .catch((error) => {
          console.error('Error al buscar imágenes:', error)
          gallery.innerHTML = `<p>Error al cargar las imágenes. Inténtalo de nuevo más tarde.</p>`
        })
      searchInput.value = '' // Limpia el input después de la búsqueda
    }
  })

  // Evento al presionar Enter en el campo de entrada de búsqueda
  searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const query = searchInput.value.trim()
      if (query) {
        searchImages(query, 1)
          .then((data) => {
            if (data.results && data.results.length > 0) {
              gallery.innerHTML = '' // Limpiar la galería para nuevas búsquedas
              data.results.forEach((image) => {
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
            } else {
              gallery.innerHTML =
                '<p>No se encontraron resultados para tu búsqueda.</p>'
            }
          })
          .catch((error) => {
            console.error('Error al buscar imágenes:', error)
            gallery.innerHTML = `<p>Error al cargar las imágenes. Inténtalo de nuevo más tarde.</p>`
          })
        searchInput.value = '' // Limpia el input después de la búsqueda
      }
    }
  })

  // Evento para volver al estado inicial al hacer clic en el logo
  logo.addEventListener('click', (event) => {
    event.preventDefault() // Prevenir comportamiento predeterminado si es un enlace
    resetToInitial(gallery, displayedImages) // Llamar a la función para restablecer al estado inicial
  })

  hamburgerMenu.addEventListener('click', () => {
    mobileMenu.style.display =
      mobileMenu.style.display === 'flex' ? 'none' : 'flex'
  })
})
