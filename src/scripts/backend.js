import {defaults} from "./fancybox";
import {openModel} from "./form-response";

$(() => {
  init();
  filters();
  forms();
  pagination();
  // formEvent();
  // logIn();
});

function init() {
  const path = $('[data-type=templ-path]');

  window.config = {
    path: path.length ? path.val() : '/local/templates/main',
  };
}

window.filters = {
  data: {
    filters: {},
    ajax: 'filter',
  },
  getData: {
    one: (field, val) => {
      if (!val || window.filters.data.filters[field]) {
        delete window.filters.data.filters[field]
      }

      window.filters.data.filters[field] = val
    },
    many: (field, val) => {
      if (!window.filters.data.filters[field]) {
        window.filters.data.filters[field] = {}
      }

      if (window.filters.data.filters[field][val]) {
        delete window.filters.data.filters[field][val]

        if (!Object.keys(window.filters.data.filters[field]).length) {
          delete window.filters.data.filters[field]
        }
      } else {
        window.filters.data.filters[field][val] = val
      }
    },
  },
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
function forms() {
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
}


function filters() {
  window.addEventListener('range_slider_change', (event) => {
    const thisObj = $('[data-type=filter-range]');
    window.filters.getData[thisObj.data('get-type')](
      thisObj.data('field'),
      event.detail.data
    )
    // console.log(event.detail);
    // console.log('filters data')
    // console.log(Object.values(window.filters.data.filters))
    $.ajax({
      type: 'GET',
      url: window.location.href,
      dataType: 'html',
      data: window.filters.data,
      success: function (r) {
        replace(r);
      },
    })
  })

  $(document).on('click', '[data-type=filter-click]', function () {
    const thisObj = $(this)
    window.filters.getData[thisObj.data('get-type')](
      thisObj.data('field'),
      thisObj.data('val')
    )
    console.log('filters data')
    console.log(Object.values(window.filters.data.filters))
    $.ajax({
      type: 'GET',
      url: window.location.href,
      dataType: 'html',
      data: window.filters.data,
      success: function (r) {
        replace(r);
      },
    })
  })
  $(document).on('click', '[data-type=filter-click-reset]', function () {
    window.filters.data.filters = {}
    $.ajax({
      type: 'GET',
      data: window.filters.data,
      href: '',
      dataType: 'html',
      success: function (r) {
        replace(r);
      },
    })
  })
}

function replace(r) {
  $('[data-replace]').each((i, item) => {
    const jqObj = $(item),
      link = jqObj.data('replace')

    let linkElem = $(r).filter(`[data-replace=${link}]`)

    if (!linkElem.length) {
      linkElem = $(r).find(`[data-replace=${link}]`)
    }

    jqObj.empty()
    jqObj.append(linkElem.html())
  })
}

function pagination() {
  window.addEventListener('paginationTrigger', () => {
    const thisObj = $('[data-type=lazy-load]'),
      btnContainer = thisObj.closest('[data-type=lazy-load-container]'),
      targetSelector = btnContainer.data('lazy-load-content'),
      itemsContainer = $(document).find(`[data-type=lazy-load-list][data-lazy-load-content=${targetSelector}]`), //  Контейнер, в котором хранятся новости
      url = thisObj.attr('data-url');    //  URL, из которого будем брать элементы

    thisObj.attr('data-type', '');

    if (url !== undefined) {
      $.ajax({
        type: 'GET',
        url: url,
        data: {
          pagination: true
        },
        dataType: 'html',
        success: function (p) {
          const responseDataContainer = $(p).find(`[data-type=lazy-load-list][data-lazy-load-content=${targetSelector}]`),
            elements = responseDataContainer.find(`[data-type=lazy-load-item]`),  //  Ищем элементы

            responseBtnContainer = $(p).find(`[data-type=lazy-load-container][data-lazy-load-content=${targetSelector}]`);
          //pagination = responseBtnContainer.find(`[data-type=lazy-load]`);//  Ищем навигацию

          btnContainer.remove();
          itemsContainer.append(elements);   //  Добавляем посты в конец контейнера
          itemsContainer.append(responseBtnContainer); //  добавляем навигацию следом

        }
      })
    }
  })
}