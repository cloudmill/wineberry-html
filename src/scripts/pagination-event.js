
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector('[data-listing-section]')

  if (section) {

    const sectionName = section.getAttribute('data-listing-section')

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + window.innerHeight
      const paginationPoint = section.offsetHeight + section.offsetTop
      
      if (scrollPos >= paginationPoint) {
        window.dispatchEvent(new CustomEvent('paginationTrigger' + sectionName))
      }
    })
  }
})