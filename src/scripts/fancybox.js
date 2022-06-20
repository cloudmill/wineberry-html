import '@fancyapps/fancybox';

// fancybox
$(() => {
  $('[data-fancy-button]').on('click', function (event) {
    let defaults = {
      closeExisting: true,
      touch: false,
      hideScrollbar: false,
      baseTpl: (
        '<div class="fancybox-container" role="dialog" tabindex="-1">' +
        '<div class="fancybox-bg"></div>' +
        '<div class="fancybox-stage"></div>' +
        '</div>'
      ),
      animationEffect: 'zoom'
    }
    event.preventDefault();
    const id = $(this).data('fancy-button');
    const modal = $(`[data-fancy-modal="${id}"]`);
    
    switch (id) {
      case 'search': 
        defaults.animationEffect = 'top'
        break;
    }

    $.fancybox.defaults = {...$.fancybox.defaults, ...defaults}
    $.fancybox.open(modal);
  })
})