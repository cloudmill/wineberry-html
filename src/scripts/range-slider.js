import noUiSlider from 'nouislider';
import wNumb from 'wnumb'

$(() => {
  const rangeParent = $('[data-range-block]')

  if (rangeParent.length) {

    rangeParent.each(function() {
      const rangeSlider = $(this).find('.range__range');
      const inputStart = $(this).find('[data-input-start]');
      const inputEnd = $(this).find('[data-input-end]');
      // const event = new CustomEvent(
      //     'range_slider_change', {
      //       detail: {
      //         container: $(this),
      //         data: {
      //           0: inputStart.val(),
      //           1: inputEnd.val(),
      //         },
      //       },
      //     }
      // );

      const inputStartValue = inputStart.attr('data-input-start');
      const inputEndValue = inputEnd.attr('data-input-end');

      // const rangeMin = Number(rangeSlider.attr('data-range-min'));
      // const rangeMax = Number(rangeSlider.attr('data-range-max'));

      noUiSlider.create(rangeSlider[0], {
        start: [inputStartValue, inputEndValue],
        step: 100,
        // range: {
        //   min: rangeMin,
        //   max: rangeMax
        // },
        range: {
          min: 1000,
          max: 10000
        },
        connect: true,
        format: wNumb({
          decimals: 0
        }),
      });

      rangeSlider[0].noUiSlider.on('update', function (values, handle) {

        const value = values[handle];

        if (handle) {
          inputEnd.val(value)
        } else {
          inputStart.val(value)
        }
      });

      // rangeSlider[0].noUiSlider.on('end', function (values) {
      //   window.dispatchEvent(new CustomEvent(
      //       'range_slider_change', {
      //         detail: {
      //             data: values,
      //         }
      //       }
      //   ));
      // });

      inputStart.on('change', function() {
        rangeSlider[0].noUiSlider.set([+this.value, null])
        // window.dispatchEvent(new CustomEvent(
        //     'range_slider_change_keyboard_min', {
        //       detail: {
        //         input: $(this),
        //         data: this.value,
        //       },
        //     }
        // ));
      })
      inputEnd.on('change', function() {
        rangeSlider[0].noUiSlider.set([null, +this.value])
        // window.dispatchEvent(event);
      })
    })
  }
})