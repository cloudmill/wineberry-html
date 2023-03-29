$(() => {
  formEvent();
});

function formEvent() {
  $(document).on('submit', '[data-ajax=request-ajax]', function (e) {
    e.preventDefault();

    console.log(e)

  });
}

