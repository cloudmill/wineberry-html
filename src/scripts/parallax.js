import { mediaQuery } from "./mediaQueries"

const defaults = {
  delay: 0.5,
  transition: 'cubic-bezier(0.33, 1, 0.68, 1)',
  offset: 0,
  stopOffset: Infinity
}

class MyParallax {
  constructor(element, options) {
    this.element = element
    this.options = {...defaults, ...options}
    this.parent = this.options.parent ? this.options.parent : element.parentNode

    this.scrollHandler()
  }

  scrollHandler() {
    const offset = this.parent.offsetTop + this.options.offset
    console.log(this.parent.offsetTop);
    this.element.style.transition = `transform ${this.options.delay}s ${this.options.transition}`

    window.addEventListener('scroll', () => {
      const scrollPos = window.pageYOffset - offset
      if ((window.pageYOffset + window.innerHeight) < this.options.stopOffset) {
        console.log(this.options.stopOffset);
        if (scrollPos > 0) {
          this.element.style.transform = `translateY(${scrollPos}px)`
        }
      }
    })
  }
}

window.addEventListener('load', () => {
  const section = document.querySelector('.main-page__about')

  if (section && mediaQuery.matches) {
    const items = section.querySelectorAll('.main-page__about-item')
    
    items.forEach(item => {
      const offset = item.getAttribute('data-parallax-offset')

      new MyParallax(item, {
        delay: item.getAttribute('data-parallax-delay'),
        offset: offset ? +offset : 0,
        stopOffset: section.offsetTop + section.offsetHeight,
        parent: section
      })
    })
  }
})