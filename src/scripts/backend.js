import {defaults} from "./fancybox";
import {openModel} from "./form-response";

$(() => {
  init();
  // formEvent();
  // logIn();
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
  },
  reloadPage: () => {
    location.reload();
  },
  modalOpen: (form) => {
    openModel(form);
  },
  contactUs: (form, r) => {
    alert(r.message);
    form[0].reset();
  }
}

//обработка форм
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
