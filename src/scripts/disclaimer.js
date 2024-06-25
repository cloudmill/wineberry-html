document.addEventListener("DOMContentLoaded", () => {
  body = document.querySelector("body.body");
  disclaimer = document.querySelector("[data-disclaimer]");
  closeDiscraimer = disclaimer.querySelector("[data-disclaimer-close]");

  //todo добавил проверку на существование data-disclaimer
  if (disclaimer) {
    const showDisclaimer = sessionStorage["disclaimerHide"];

    if (showDisclaimer && showDisclaimer == "true") {
      disclaimer.classList.remove("--active");
      body.classList.remove("body--hidden");
    }

    closeDiscraimer.onclick = () => {
      disclaimer.classList.remove("--active");
      body.classList.remove("body--hidden");
      sessionStorage["disclaimerHide"] = "true";
    };
  }

});
