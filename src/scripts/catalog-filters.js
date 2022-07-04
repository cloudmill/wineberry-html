document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.catalog-menu')

  if (menu) {
    const filtersCount = document.querySelector('[data-filters-count]')
    const filtersNum = document.querySelector('[data-filters-num]')
    let count = 0

    window.addEventListener('click', event => {
      const target = event.target

      if (target.closest('[data-filters-button]')) {
        menu.classList.add('active')
        document.body.classList.add('body--hidden')
      }
      if (target.closest('[data-filters-close]')) {
        menu.classList.remove('active')
        document.body.classList.remove('body--hidden')
      }
      if (target.closest('[data-filters-reset]')) {
        const inputs = target.closest('.filters').querySelectorAll('.checkbox__input')

        inputs.forEach(item => {
          item.checked = false
        })

        filtersCount.classList.add('hidden')
        count = 0
      }
      if (target.closest('[data-filters-accept]')) {
        if (count) {
          filtersCount.classList.remove('hidden')
          filtersNum.textContent = count
        } else {
          filtersCount.classList.add('hidden')
          filtersNum.textContent = count
        }

        menu.classList.remove('active')
        document.body.classList.remove('body--hidden')
      }
    })

    const items = menu.querySelectorAll('[data-filters-input]')

    items.forEach(item => {
      item.onchange = function() {
        if (this.checked) {
          count++
        } else {
          count--
        }
      }
    })
  }
})