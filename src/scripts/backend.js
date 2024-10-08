import {defaults} from "./fancybox";
import {openModel} from "./form-response";

$(() => {
  init();
  filters();
  forms();
  pagination();
  basket();
  //paginManufactur();
  paginSearch();
  subscribeNews();
  oparatorEventLegal();
  oparatorEventOrder();
  initFilters()
});

function init() {
  const path = $("[data-type=templ-path]");

  window.config = {
    path: path.length ? path.val() : "/local/templates/main",
  };
}

window.filters = {
  data: {
    filters: {},
    ajax: "filter",
  },
  getData: {
    one: (field, val) => {
      if (!val || window.filters.data.filters[field]) {
        delete window.filters.data.filters[field];
      }

      window.filters.data.filters[field] = val;
    },
    many: (field, val) => {
      if (!window.filters.data.filters[field]) {
        window.filters.data.filters[field] = {};
      }

      if (window.filters.data.filters[field][val]) {
        delete window.filters.data.filters[field][val];

        if (!Object.keys(window.filters.data.filters[field]).length) {
          delete window.filters.data.filters[field];
        }
      } else {
        window.filters.data.filters[field][val] = val;
      }
    },
  },
};

window.objFormErrors = {
  modalOpen: (form, r) => {
    alert(r.message);
  },
  modalError: (form, r) => {
    alert(r.message);
  },
  eventLegalResponse: (res, name, typeModal) => {
    const options = {...defaults};

    let modal = $(`[data-response=${typeModal}]`);

    modal.find(".response-modal__title").text(res.message);
    $.fancybox.defaults = {...$.fancybox.defaults, ...options};
    $.fancybox.open($(`[data-response=${typeModal}]`));
  },
  eventOrderResponse: (text, name, typeModal) => {
    const options = {...defaults};

    let modal = $(`[data-response=${typeModal}]`);
    modal.find(".response-modal__title").text(text + ' ' + name);
    $.fancybox.defaults = {...$.fancybox.defaults, ...options};
    $.fancybox.open($(`[data-response=${typeModal}]`));
  }
};
window.objFormSuccess = {
  success_checkout: (form, r) => {
    if (r.success) {
      window.location.replace("/");
    }
  },
  success_checkout_private: (form, r) => {
    if (r.success) {
      window.location.replace("/" + "profile-" + r.role + "-data/");
    }
  },
  modal: (form, r) => {
    const options = {...defaults};
    $.fancybox.defaults = {...$.fancybox.defaults, ...options};
    $.fancybox.open($("[data-response]"));
    form[0].reset();
    form.find("[data-input]").parent().removeClass("filled");
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
  },
  eventLegalResponse: (res, name, typeModal) => {
    const options = {...defaults};
    console.log(name);
    console.log(res);
    let modal = $(`[data-response=${typeModal}]`),
      text = "";

    switch (res.typeEvent) {
      case "chooseManager":
        text = "Отправлено на согласование менеджеру " + name;
        break;
      case "nonManager":
        text = "Выберите менеджера";
        typeModal = "chooseManagerNoSvg";
        modal = $(`[data-response=${typeModal}]`);
        break;
      case 'denyLegalManager':
      case "denyLegal":
        text = "Вы отказали " + name;
        break;
      case 'successByTheManager':
        text = "Вы активировали " + name;
        break;
      case 'newManager':
        text = "Вы изменили менеджера";
        break;
    }

    modal.find(".response-modal__title").text(text);
    $.fancybox.defaults = {...$.fancybox.defaults, ...options};
    $.fancybox.open($(`[data-response=${typeModal}]`));
  },
  eventOrderResponse: (text, name, typeModal) => {
    const options = {...defaults};
    let modal = $(`[data-response=${typeModal}]`);
    modal.find(".response-modal__title").text(text + ' ' + name);
    $.fancybox.defaults = {...$.fancybox.defaults, ...options};
    $.fancybox.open($(`[data-response=${typeModal}]`));
  }
};

// действия оператора для заказа
function oparatorEventOrder() {
  let obj = $('[data-event-order-operator]');

  obj.find("[data-event-btn]").on("click", function () {
    let data = {
        orderId: obj.data("id-order"),
        managerId: obj.find(".active[data-id-manager]").data("id-manager")
      },

      entityName = obj.find('[data-select-text]').text(),
      typeModal = $(this).data("fancy-modal");

    console.log(typeModal);

    if (!data.managerId) {
      window.objFormErrors.eventOrderResponse('Выберите менеджера', 'chooseManagerNoSvg');
    }

    $.ajax({
      type: "POST",
      url: "/local/templates/main/include/ajax/profiles/eventOperatorOrder.php",
      data: data,
      dataType: "json",
      success: function (res) {
        if (res.success) {
          window.objFormSuccess.eventOrderResponse(res.message, entityName, typeModal);
        } else {
          window.objFormErrors.eventOrderResponse(res.message, entityName, typeModal);
        }
      },
    });


  });

}

// действия оператора для юр лица
function oparatorEventLegal() {
  let obj = $("[data-event-client]");
  obj.find("[data-event-btn]").on("click", function () {
    let data = {
        typeEvent: $(this).data("event-type"),
        legalId: obj.data("id-legal"),
      },
      entityName = "",
      typeModal = "";

    switch (data.typeEvent) {
      case "chooseManager":
        data.managerId = obj.find(".active[data-id-manager]").data("id-manager");
        entityName = obj.find(".active[data-id-manager]").text();
        typeModal = $(this).data("fancy-modal");
        break;
      case 'denyLegalManager':
      case 'denyLegal':
      case 'successByTheManager':
        entityName = $(this).data("legal-name");
        typeModal = $(this).data("fancy-modal");
        break;
      default:
        alert('Не удалось выбрать событие');
    }

    if (data.typeEvent) {
      $.ajax({
        type: "POST",
        url: "/local/templates/main/include/ajax/profiles/eventOperatorLegal.php",
        data: data,
        dataType: "json",
        success: function (res) {
          if (res.success) {
            window.objFormSuccess.eventLegalResponse(res, entityName, typeModal);
          } else {
            window.objFormErrors.eventLegalResponse(res, entityName, typeModal);
          }
        },
      });
    }
  });
}

function subscribeNews() {
  $(document).on("submit", "[data-type=subscribeNews]", function (e) {
    e.preventDefault();
    const form = $(this),
      action = form.attr("action");
    let data = {};
    form.find("[data-type=get-field]").each(function (i, elem) {
      data[$(elem).attr("name")] = $(elem).val();
    });
    $.ajax({
      type: "POST",
      url: action,
      data: data,
      success: function (r) {
        if (r.success) {
          $(form).data("id", "follow");
        } else {
          $(form).data("id", "follow-error");
        }
        openModel(form);
      },
    });
  });
}

//обработка форм
function forms() {
  $(document).on("submit", "[data-type=form-ajax]", function (e) {
    e.preventDefault();

    const form = $(this),
      method = form.attr("method"),
      action = form.attr("action"),
      fileElem = form[0].querySelector("[data-file-input]"),
      file = fileElem ? fileElem.appFile.files : [],
      data = file.length ? new FormData() : {};

    form.find("[data-type=get-field], input:checked[data-type=get-field], input[type=hidden]").each(function () {
      const val = $(this).val();

      if (!val) {
        return;
      }

      const field = $(this).attr("name");
      file.length ? data.append(field, val) : (data[field] = val);
    });

    $.each(file, (i, item) => {
      data.append(`files[]`, item);
    });

    $.ajax({
      type: method ? method : "POST",
      url: action ? action : `${window.config.path}/include/ajax/forms/index.php`,
      data: data,
      contentType: file.length ? false : "application/x-www-form-urlencoded; charset=UTF-8",
      dataType: "json",
      processData: !file.length,
      success: function (r) {
        console.log(typeof r);
        if (typeof r === "object") {
          if (!r.success) {
            console.log(typeof r);
            const errorFuncInit = form.data("func-error");
            errorFuncInit ? window.objFormErrors[errorFuncInit](form, r) : alert(r.message);
            return;
          }
        }

        const func = form.data("func");

        if (typeof func === "object") {
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
  //todo для price filter
  window.addEventListener("range_slider_change", (event) => {
    const thisObj = $("[data-type=filter-range]");
    window.filters.getData[thisObj.data("get-type")](
      thisObj.data("field"),
      event.detail.data
    );
    $.ajax({
      type: "GET",
      url: window.location.href,
      dataType: "html",
      data: window.filters.data,
      success: function (r) {
        replace(r, "filter-replace");

        // update url
        let filtersParam = ''
        if (Object.keys(window.filters.data.filters).length !== 0) {
          filtersParam = '?filters=' + JSON.stringify(window.filters.data.filters)
        }
        history.pushState(null, '', window.location.origin + window.location.pathname + filtersParam)
      },
    });
  });

  //todo для inputs filter
  $(document).on("click", "[data-type=filter-click]", function () {
    const thisObj = $(this);
    window.filters.getData[thisObj.data("get-type")](
      thisObj.data("field"),
      thisObj.data("val")
    );
    $.ajax({
      type: "GET",
      url: window.location.href,
      dataType: "html",
      data: window.filters.data,
      success: function (r) {
        replace(r, "filter-replace");

        // update url
        window.scrollTo({
          top: 0,
        })
        let filtersParam = ''
        if (Object.keys(window.filters.data.filters).length !== 0) {
          filtersParam = '?filters=' + JSON.stringify(window.filters.data.filters)
        }
        history.pushState(null, '', window.location.origin + window.location.pathname + filtersParam)
      },
    });
  });

  //todo для reset filter
  $(document).on("click", "[data-type=filter-click-reset]", function () {
    window.filters.data.filters = {};
    $.ajax({
      type: "GET",
      data: window.filters.data,
      href: "",
      dataType: "html",
      success: function (r) {
        replace(r, "filter-replace");
        history.pushState(null, '', window.location.origin + window.location.pathname)
      },
    });
  });
}

function pagination() {
  window.addEventListener("paginationTrigger", () => {
    const thisObj = $("[data-type=lazy-load]"),
      btnContainer = thisObj.closest("[data-type=lazy-load-container]"),
      targetSelector = btnContainer.data("lazy-load-content"),
      itemsContainer = $(document).find(
        `[data-type=lazy-load-list][data-lazy-load-content=${targetSelector}]`
      ), //  Контейнер, в котором хранятся новости
      url = thisObj.attr("data-url"); //  URL, из которого будем брать элементы

    thisObj.attr("data-type", "");

    if (url !== undefined) {
      $.ajax({
        type: "GET",
        url: url,
        data: {
          pagination: true,
        },
        dataType: "html",
        success: function (p) {
          const responseDataContainer = $(p).find(
              `[data-type=lazy-load-list][data-lazy-load-content=${targetSelector}]`
            ),
            elements = responseDataContainer.find(`[data-type=lazy-load-item]`), //  Ищем элементы
            responseBtnContainer = $(p).find(
              `[data-type=lazy-load-container][data-lazy-load-content=${targetSelector}]`
            );

          btnContainer.remove();
          itemsContainer.append(elements); //  Добавляем посты в конец контейнера
          itemsContainer.append(responseBtnContainer); //  добавляем навигацию следом
        },
      });
    }
  });
}

let check = true;
function paginSearch() {
  window.addEventListener("paginationTriggerSearch", (e) => {
    let thisObj = $('[data-listing-section="Search"]'),
      curPage = thisObj.data("cur-page"),
      maxPage = thisObj.data("max-page");

    if (curPage != maxPage && check) {
      curPage++;
      check = false;
      $.ajax({
        type: "GET",
        url: window.location + "&PAGEN_1=" + curPage,
        dataType: "html",
        success: function (r) {
          $(thisObj).data("cur-page", curPage);
          let elems = $(r).find("[data-elem]");
          $(thisObj).append(elems);
          check = true;
        },
      });
    } else {
      $(".listing__wrapper").remove();
    }
  });
}

function paginManufactur() {
  window.addEventListener("paginationTriggerManufacturers", () => {
    const tabActiveId = $(".active[data-tabs-item]").attr("data-section-id");

    //        $.ajax({
    //            type: 'POST',
    //            href: window.location,
    //            dataType: 'text',
    //            data: {
    //                tabActiveId
    //            },
    //            success: function (r) {
    //                console.log(r);
    //            },
    //        })
  });
}

function basket() {
  $(document).on("click", "[data-type=basket-add]", function () {
    const thisObj = $(this),
      id = thisObj.data("id"),
      count = $(`[data-type=counter][data-id="${id}"]`).val(),
      modalId = thisObj.data("open-modal"),
      modal = $(`[data-fancy-modal="${modalId}"]`);
    if (count >= 1) {
      thisObj.css("pointer-events", "none");
      $.ajax({
        type: "post",
        href: window.location.pathname,
        dataType: "html",
        data: {
          action: "add",
          id: id,
          count: count,
        },
        success: function (r) {
          const options = {...defaults},
            counter = $("[data-type=basket-counter]");
          $.fancybox.defaults = {...$.fancybox.defaults, ...options};
          $.fancybox.open(modal);
          replace(r);
          thisObj.css("pointer-events", "auto");
        },
      });
    }
  });
  $(document).on("click", "[data-type=basket]", function () {
    const thisObj = $(this),
      id = thisObj.data("id"),
      action = thisObj.data("action"),
      update = thisObj.data("update");
    thisObj.css("pointer-events", "none");
    $.ajax({
      type: "post",
      href: window.location.pathname,
      dataType: "html",
      data: {
        action: action,
        update: update,
        id: id,
      },
      success: function (r) {
        replace(r);
        thisObj.css("pointer-events", "auto");
      },
      statusCode: {
        302: (xhr) => {
          window.location.pathname = xhr.getResponseHeader("Redirect-Location");
        },
      },
    });
  });
  $(document).on("change", "[data-type=basket-input]", function () {
    const thisObj = $(this),
      id = thisObj.data("id");
    thisObj.css("pointer-events", "none");
    $.ajax({
      type: "post",
      href: window.location.pathname,
      dataType: "html",
      data: {
        count: thisObj.val(),
        action: "update",
        update: "input",
        id: id,
      },
      success: function (r) {
        replace(r);
        thisObj.css("pointer-events", "auto");
      },
    });
  });
}

function replace(r, selector = "replace") {
  $(`[data-${selector}]`).each((i, item) => {
    const jqObj = $(item),
      link = jqObj.data(selector);
    let linkElem = $(r).filter(`[data-${selector}=${link}]`);

    console.log(link);
    console.log(selector);

    if (!linkElem.length) {
      linkElem = $(r).find(`[data-${selector}=${link}]`);
    }

    jqObj.empty();
    jqObj.append(linkElem.html());
  });
}

function getAppliedFilters() {
  const url = new URL(window.location.href)
  const urlParams = new URLSearchParams(url.search)
  for (const [key, val] of urlParams.entries()) {
    if(key === 'filters') return val
  }
  return false
}

function initFilters() {
  const filters = getAppliedFilters();
  if (!filters) return;
  window.filters.data.filters = JSON.parse(filters)
}
