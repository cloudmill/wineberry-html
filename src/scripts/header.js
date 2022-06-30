import { mediaQuery } from './mediaQueries'

// scroll
{
  $(() => {

    if (mediaQuery.matches) {

      const header = $('.header')

      if (!header.hasClass('header--small')) {
        const fps = 120
    
        let scrollTop = $(window).scrollTop()
    
        $(window).one('scroll', scroll)
    
        function scroll() {
          update()
    
          setTimeout(() => {
            update()
    
            $(window).one('scroll', scroll)
          }, 1000 / fps)
        }
    
        function update() {
          const newScrollTop = $(window).scrollTop()
    
          if (Math.abs(scrollTop - newScrollTop) >= 1) {
            if (newScrollTop > scrollTop) {
              header.addClass('header--up')
            } else {
              header.removeClass('header--up')
            }
          }
    
          if (scrollTop < 1) {
            header.removeClass('header--up')
          }
    
          if ($('[data-header-transparent]').length) {
            if (scrollTop < 1) {
              header.addClass('header--transparent')
            } else {
              header.removeClass('header--transparent')
            }
          }
    
          scrollTop = newScrollTop
        }
      }
  
    }
  });
}


document.addEventListener('DOMContentLoaded', () => {
  // mobile menu
  const header = document.querySelector('.header')
  const burger = header.querySelector('.header__burger')

  if (burger) {
    burger.onclick = function() {
      header.classList.toggle('menu')
    }
  
    // cart modal
    const modal = document.querySelector('[data-cart-modal]')
    const btn = document.querySelector('[data-cart-button]')
  
    window.addEventListener('click', event => {
      const target = event.target
  
      if (target.closest('[data-cart-button]')) {
        if (header.classList.contains('header--up')) {
          header.classList.remove('header--up')
        }
  
        document.body.classList.toggle('body--hidden')
        modal.classList.toggle('active')
        btn.classList.toggle('active')
      }
      if (target.closest('[data-cart-overlay]')) {
        modal.classList.remove('active')
        btn.classList.remove('active')
      }
      if (target.closest('[data-cart-close]')) {
        modal.classList.remove('active')
        btn.classList.remove('active')
      }
    })
  }
})

