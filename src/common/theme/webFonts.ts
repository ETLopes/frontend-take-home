import { useFonts } from './fonts'

export function useWebFonts() {
  const [fontsLoaded] = useFonts()

  if (typeof window !== 'undefined') {
    // Add font preload links for web
    const fontLinks = [
      {
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap',
        rel: 'stylesheet',
      },
      {
        href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap',
        rel: 'stylesheet',
      },
    ]

    fontLinks.forEach((link) => {
      const linkElement = document.createElement('link')
      linkElement.href = link.href
      linkElement.rel = link.rel
      document.head.appendChild(linkElement)
    })
  }

  return fontsLoaded
} 