import {defaults} from "./fancybox";

$(() => {
  formEvent();
  logIn();
});

function formEvent() {
  $(document).on('submit', '[data-ajax=request-ajax]', function (e) {
    e.preventDefault();
    const thisObj = $(this),
      thisObjJs = this,
      data = {};

    thisObj.find('[data-get-type]').each(function () {
      data[this.name] = $(this).val();
    });
    console.log(data)

    $.ajax({
      url: '/local/templates/main/include/ajax/forms/forms_handler.php',
      method: 'post',
      dataType: 'json',
      data: data,
      success: (data) => {
        console.log(data.success)
        if (data.success) {
          const options = {...defaults}
          $.fancybox.defaults = {...$.fancybox.defaults, ...options};
          $.fancybox.open($('[data-response]'));
          thisObjJs.reset();
          thisObj.find('[data-input]').parent().removeClass('filled');
        } else {
          alert(data.message);
        }
      },
      error: (jqXHR, exception) => {
        if (jqXHR.status === 0) {
          alert('Not connect. Verify Network.');
        } else if (jqXHR.status == 404) {
          alert('Requested page not found (404).');
        } else if (jqXHR.status == 500) {
          alert('Internal Server Error (500).');
        } else if (exception === 'parsererror') {
          alert('Requested JSON parse failed.');
        } else if (exception === 'timeout') {
          alert('Time out error.');
        } else if (exception === 'abort') {
          alert('Ajax request aborted.');
        } else {
          alert('Uncaught Error. ' + jqXHR.responseText);
        }
      },
    });
  });
}

//функция авторизации
function logIn () {
  $('[data-action=logIn]').on('submit', function (e) {
    e.preventDefault();
    const thisObj = $(this),
        data = {};
    thisObj.find('[data-field]').each(function () {
      data[this.name] = $(this).val().trim();
    });

    $.ajax({
      type: 'POST',
      url: '/local/templates/main/include/ajax/forms/logIn.php',
      dataType: 'json',
      data: data,
      success: function (r) {
        if (r.success) {
          location.reload();
        } else {
          alert(r.message)
        }
      },
    });
  })
}
