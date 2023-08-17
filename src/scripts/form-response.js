import {defaults} from './fancybox'

$(() => {
  const form = $('[data-form]');

  if (form.length) {

    form.each(function() {
      const ths = $(this)
      const id = ths.data('form')

      ths.on('submit', (e) => {
        e.preventDefault()
        openModel();
      })
    })
  }
});

export function openModel (e) {
  const form = $(e),
      id = form.data('id'),
    options = {...defaults};

  $.fancybox.defaults = {...$.fancybox.defaults, ...options}
  $.fancybox.open($(`[data-response=${id}]`))
  //старая логика
  //form[0].reset();
  $(form).trigger("reset");
  form.find('[data-input]').parent().removeClass('filled')

}