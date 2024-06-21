import "./styles/app";

import "./scripts/backend";
import "./scripts/sliders";
import "./scripts/range-slider";
import "./scripts/accordion";
import "./scripts/header";
import "./scripts/fancybox";
import "./scripts/loader";
import "./scripts/tippy";
import "./scripts/parallax";
import "./scripts/main-about";
import "./scripts/forms";
import "./scripts/form-response";
import "./scripts/counter";
import "./scripts/real-tabs";
import "./scripts/catalog-filters";
import "./scripts/select";
import "./scripts/pagination-event";
import "./scripts/show-more";
import "./scripts/edit";
import "./scripts/disclaimer";

$(() => {
  const tickers = document.querySelectorAll("[data-ticker]");
  if (tickers.length) {
    tickers.forEach((item) => {
      const line = item.querySelector("[data-ticker-line]");

      if (line.clientWidth < window.innerWidth) {
        let items = line.querySelectorAll("[data-ticker-item]");
        // let i = 0;
        while (line.clientWidth < window.innerWidth) {
          items.forEach((item) => {
            line.append(item.cloneNode(true));
          });
        }

        for (let i = 0; i < 2; i++) {
          item.append(line.cloneNode(true));
        }
        // while (line.clientWidth < window.innerWidth) {
        //   line.append(items[i].cloneNode(true))
        //   i++
        // }
        // for (let k = 0; k < 2; k++) {
        //   const lines = item.querySelectorAll('[data-ticker-line]')
        //   const clone = lines[k].cloneNode(true)
        //   const cloneItems = clone.querySelectorAll('[data-ticker-item]')

        //   for (let j = 0; j < i; j++) {
        //     const cloneItem = cloneItems[j+i].cloneNode(true)
        //     cloneItems[j].remove()
        //     clone.append(cloneItem)
        //   }
        //   item.append(clone)
        // }
      } else {
        for (let i = 0; i < 2; i++) {
          item.append(line.cloneNode(true));
        }
      }

      item.classList.add("active");
    });
  }

  // window.addEventListener("paginationTrigger", () => {
  //   console.log(333)
  // })
  // window.addEventListener("paginationTriggerManufacturers", () => {
  //   console.log(123)
  // })
});
