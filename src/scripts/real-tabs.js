$(() => {
  const tabs = $('[data-real-tabs]')

  if (tabs.length) {
    tabs.each(function() {
      const items = $(this).find("[data-tabs-item]")
      const container = $(this).closest('[data-tabs-parent]')
      const blocks = container.find('[data-tabs-block]')

      items.on('click', function() {
        items.removeClass('active')
        blocks.removeClass('active')
        $(this).addClass('active')
        blocks.eq($(this).index()).addClass('active')
      })
    })
  }
})