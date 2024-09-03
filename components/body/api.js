// api.js
const UNSPLASH_ACCESS_KEY = '90T9_u1O7XF_2bqcXhwC2PnGYzUbcA5kCCeBwOfmEYo'

// Solicitar imágenes aleatorias de gatos
export async function fetchRandomCatImages() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=gatos&client_id=${UNSPLASH_ACCESS_KEY}&count=30`
    )
    if (!response.ok) {
      throw new Error('Error en la solicitud a la API')
    }
    return await response.json()
  } catch (error) {
    console.error('Error al buscar imágenes aleatorias de gatos:', error)
    throw error // Lanza el error para manejarlo adecuadamente en las llamadas
  }
}

// Buscar imágenes con una query específica
export async function searchImages(query, page) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=30&page=${page}`
    )
    if (!response.ok) {
      throw new Error('Error en la solicitud a la API')
    }
    return await response.json()
  } catch (error) {
    console.error('Error al buscar imágenes:', error)
    throw error // Lanza el error para manejarlo adecuadamente en las llamadas
  }
}
