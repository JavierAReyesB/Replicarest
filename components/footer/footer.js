// footer.js
import './footer.css' // Importa el CSS correspondiente

document.addEventListener('DOMContentLoaded', () => {
  // Ejemplo de función en footer.js, como animaciones o interacciones.
  const footerLinks = document.querySelectorAll('.footer-section ul li a')

  footerLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault()
      const targetId = link.getAttribute('href').slice(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        })
      }
    })
  })

  // Agrega más funciones según sea necesario para el footer.
})
