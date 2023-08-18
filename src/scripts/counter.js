export class Counter {
  constructor(selector) {
    this.root = selector
    this.plus = this.root.querySelector('[data-counter-plus]')
    this.minus = this.root.querySelector('[data-counter-minus]')
    this.number = this.root.querySelector('[data-counter-count]')

    // this.init()
    // this.inputHandler()
  }

  init() {
    this.plus.onclick = () => {
      this.number.value = +this.number.value + 1
    }
    this.minus.onclick = () => {
      if (+this.number.value > 1) {
        this.number.value = +this.number.value - 1
      }
    }
  }

  inputHandler() {
    this.number.oninput = function() {
      if (+this.value <= 0) {
        this.value = 1
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter')

  if (counters.length) {
    counters.forEach(item => {
      new Counter(item)
    })
  }
})