
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[data-edit-btn]')

  buttons.forEach(btn => {
    const parent = btn.closest('[data-edit]')
    const input = parent.querySelector('[data-edit-input]')
    const text = btn.querySelector('[data-edit-text]')

    btn.onclick = function() {
      if (this.classList.contains('active')) {
        input.classList.add('locked')
        text.textContent = 'Изменить'
        btn.classList.remove('active')
      } else {
        input.classList.remove('locked')
        input.focus()
        const value = input.value
        input.value = ''
        input.value = value
        text.textContent = 'Сохранить'
        btn.classList.add('active')
      }
    }
  })
})