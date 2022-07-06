
document.addEventListener('DOMContentLoaded', () => {
  const select = document.querySelector('[data-select')

  if (select) {
    window.addEventListener('click', event => {
      const target = event.target

      if (target.closest('[data-select-button]')) {

        target.closest('[data-select').classList.toggle('active')
      } 
      
      if (target.closest('[data-select-item]')) {
        const parent = target.closest('[data-select]')
        const item = target.closest('[data-select-item]')
        const text = parent.querySelector('[data-select-text]')

        parent.querySelectorAll('[data-select-item].active').forEach(item => item.classList.remove('active'))

        item.classList.add('active')
        text.textContent = item.textContent
        parent.classList.remove('active')
      }
      
      if (!target.closest('[data-select]')) {
        const selects = document.querySelectorAll('[data-select].active')

        selects.forEach(item => item.classList.remove('active'))
      }
    })
  }
})