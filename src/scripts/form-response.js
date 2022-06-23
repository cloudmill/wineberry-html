import {defaults} from './fancybox'

$(() => {
  const form = $('[data-form]');

  if (form.length !== 0) {

    form.each(function() {
      const ths = $(this)
      const id = ths.data('form')

      ths.on('submit', (e) => {
        e.preventDefault()
        const options = {...defaults}
        
        $.fancybox.defaults = {...$.fancybox.defaults, ...options}
        $.fancybox.open($(`[data-response=${id}]`))
      })
    })
  }
});