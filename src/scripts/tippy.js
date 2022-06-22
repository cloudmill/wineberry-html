import tippy from 'tippy.js';


$(() => {
  if ($('.tooltip'.length)) {
    $('.tooltip').each(function() {
      const tooltipContent = $(this).find('.tooltip__container')[0];
      const tooltipMark = $(this).find('.tooltip__icon');
  
      tippy(tooltipMark[0],  {
        content: tooltipContent.innerHTML,
        allowHTML: true,
        // trigger: 'click',
        appendTo: $('.main')[0],
        offset: [0, 14],
        delay: 0,
        zIndex: 999999,
      });
    });
  }
});