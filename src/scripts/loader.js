import { mediaQuery } from "./mediaQueries";
import AOS from "aos";

window.addEventListener("load", () => {
  document.body.classList.add("body--hidden");
  document.body.classList.remove("body--unvisible");
  const loader = document.querySelector(".loader");
  const disclaimer = document.querySelector("[data-disclaimer]");

  if (loader) {
    const text = loader.querySelector("[data-loader-count]");
    const progress = loader.querySelector("[data-loader-progress]");

    async function loop() {
      let delay = 15;
      function timer(ms) {
        return new Promise((res) => setTimeout(res, ms));
      }

      for (let i = 0; i < 101; i++) {
        if (i === 13 || i === 26 || i === 74) {
          await timer(400);
        }

        setTimeout(() => {
          text.textContent = `${i}%`;
          progress.style.height = `${i}%`;

          if (mediaQuery.matches) {
            if (i < 96 && i > 12) {
              text.style.height = `${i}%`;
              // text.style.bottom = 'auto'
              // text.style.top = '60px'
            }
          }
        }, delay * i);
      }
    }

    loop();
    setTimeout(() => {
      loader.classList.add("loader--hidden");
      let video;
      if (mediaQuery.matches) {
        video = document.querySelector("[data-video-desktop]");
      } else {
        video = document.querySelector("[data-video-mobile]");
      }
      window.scrollTo(0, 0);
      // document.body.classList.remove('body--hidden')

      if (!disclaimer?.classList.contains("--active"))
        document.body.classList.remove("body--hidden");

      video.setAttribute("autoplay", "");
      video.load();
      AOS.init({
        once: true,
        offset: 0,
        duration: 800,
      });
    }, 3000);
  } else {
    // document.body.classList.remove("body--hidden");

    if (!disclaimer?.classList.contains("--active"))
      document.body.classList.remove("body--hidden");

    AOS.init({
      once: true,
      offset: 0,
      duration: 800,
    });
  }
});
