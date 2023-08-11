import {defaults} from "./fancybox";

$(() => {
  init();
  formEvent();
  logIn();
});

function init() {
  const path = $('[data-type=templ-path]');

  window.config = {
    path: path.length ? path.val() : '/local/templates/main',
  };
}

window.objFormErrors = {};
window.objFormSuccess = {
  modal: (form, r) => {
    const options = {...defaults}
    $.fancybox.defaults = {...$.fancybox.defaults, ...options};
    $.fancybox.open($('[data-response]'));
    form.reset();
    form.find('[data-input]').parent().removeClass('filled');
  }
}

$(document).on('submit', '[data-type=form-ajax]', function(e) {
  e.preventDefault();

  const form = $(this),
    method = form.attr('method'),
    action = form.attr('action'),
    fileElem = form[0].querySelector('[data-file-input]'),
    file = fileElem ? fileElem.appFile.files : [],
    data = file.length ? new FormData() : {};

  form.find('[data-type=get-field], input:checked[data-type=get-field]').each(function () {
    const val = $(this).val();

    if (!val) {
      return;
    }

    const field = $(this).attr('name');

    file.length ? data.append(field, val) : data[field] = val;
  });

  $.each(file, (i, item) => {
    data.append(`files[]`, item);
  });

  $.ajax({
    type: method ? method : 'POST',
    url: action ? action : `${window.config.path}/include/ajax/forms/index.php`,
    data: data,
    contentType: file.length ? false : 'application/x-www-form-urlencoded; charset=UTF-8',
    processData: !file.length,
    success: function (r) {
      if (typeof r === 'object') {
        if (!r.success) {
          const errorFuncInit = form.data('func-error');

          errorFuncInit ? window.objFormErrors[errorFuncInit](form, r) : alert(r.message);
        }
      }

      const func = form.data('func');

      if (typeof func === 'object') {
        $.each(func, (i, item) => {
          window.objFormSuccess[item](form, r);
        });
      } else {
        window.objFormSuccess[func](form, r);
      }
    },
  });
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
