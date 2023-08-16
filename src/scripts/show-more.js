

$(() => {
  const button = $('[data-button-show]')

  if (button.length) {

    button.each(function() {
      let isShowed = false
      const text = $(this).find('.button-show__text')
  
      $(this).on('click', function() {
  
        if (isShowed) {
          $(this).removeClass('active')
          text.text('Показать все')
        } else {
          $(this).addClass('active')
          text.text('Скрыть')
        }
  
        isShowed = !isShowed
      })
    })
  }
})