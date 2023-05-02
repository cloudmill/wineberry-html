import 'parsleyjs';
import mask from "inputmask";

// input focus animation
document.addEventListener('DOMContentLoaded', () => {
  const inputs = document.querySelectorAll('[data-input]')

  if (inputs.length) {
    inputs.forEach(item => {
      const parent = item.parentNode
      item.onfocus = function() {
        parent.classList.add('filled')
      }
      item.onblur = function() {
        if (!this.value) {
          parent.classList.remove('filled')
        }
      }
    })
  }
})

// validation
$(() => {
  $("form").parsley();

  Parsley.addMessages('ru', {
    defaultMessage: "Некорректное значение.",
    type: {
      email: "Формат email-адреса некорректный",
      url: "Введите URL адрес.",
      number: "Введите число.",
      integer: "Введите целое число.",
      digits: "Введите только цифры.",
      alphanum: "Введите буквенно-цифровое значение."
    },
    notblank: "Это поле должно быть заполнено.",
    required: "Поле не заполнено",
    pattern: "Не использовать символы или цифры",
    min: "Это значение должно быть не менее чем %s.",
    max: "Это значение должно быть не более чем %s.",
    range: "Это значение должно быть от %s до %s.",
    minlength: "Пароль меньше %s символов",
    maxlength: "Это значение должно содержать не более %s символов.",
    length: "Неверный формат",
    mincheck: "Выберите не менее %s значений.",
    maxcheck: "Выберите не более %s значений.",
    check: "Выберите от %s до %s значений.",
    equalto: "Пароли не совпадают"
  });

  Parsley.setLocale('ru');

  // маска на телефон
  Inputmask({ mask: "+7 (999) 999-99-99", showMaskOnHover: false }).mask(
    "[data-mask-phone]"
  )

  // валидация телефона
  window.Parsley
    .addValidator('phone', {
      requirementType: 'string',
      validateString: function(value) {
        const result = value.replaceAll(/\D/g, '')

        return result.length === 11
      },
      messages: {
        ru: 'Заполните поле'
      }
    })
});

// выделение активной радиокнопки

document.addEventListener('DOMContentLoaded', () => {

  const radioGroup = document.querySelectorAll('[data-radio-group]');

  if (radioGroup) {
    radioGroup.forEach(item => {
      item.addEventListener('click', event => {

        item.querySelectorAll('.radio').forEach(radio => {
          radio.classList.remove('active')
        })

        event.target.closest('.radio').classList.add('active');
      })
    })
  }
})