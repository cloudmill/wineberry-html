import {defaults} from './fancybox'

$(() => {
  const form = $('[data-form]');

  if (form.length) {

    form.each(function() {
      const ths = $(this)
      const id = ths.data('form')

      ths.on('submit', (e) => {
        e.preventDefault()
        const options = {...defaults}
        
        $.fancybox.defaults = {...$.fancybox.defaults, ...options}
        $.fancybox.open($(`[data-response=${id}]`))
        this.reset()
        $(this).find('[data-input]').parent().removeClass('filled')
      })
    })
  }
});