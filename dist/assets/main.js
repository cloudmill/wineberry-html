(()=>{var e,t={8746:(e,t,n)=>{"use strict";var r=n(2592),o=n(5638);function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}console.log(123),o(window).on("load",(function(){var e=o("[data-slider-id]");0!==e.length&&e.each((function(){var e=o(this),t=e.data("slider-id"),n=e.data("slider-prev"),a=e.data("slider-next"),s=o('[data-slider-button="'.concat(n,'"]')),d=o('[data-slider-button="'.concat(a,'"]')),l={slidesPerView:"auto",spaceBetween:20,speed:500};switch(t){case"main":l=i(i({},l),{},{centeredSlides:!1,loop:!0,spaceBetween:20,breakpoints:c({},1280,{spaceBetween:172,centeredSlides:!0})});break;case"news":l={slidesPerView:"auto",spaceBetween:12,breakpoints:c({},1280,{spaceBetween:0})};break;case"about":l={slidesPerView:"auto",spaceBetween:0,pagination:{el:".about-page__slider-pagination"}};break;case 10:l={slidesPerView:"auto",spaceBetween:0}}console.log(l);var u=new r.Z(e[0],l);s.on("click",(function(){u.slidePrev()})),d.on("click",(function(){u.slideNext()}))}))}));var s=n(9344),d=n.n(s),l=n(3655),u=n.n(l),f=n(5638);f((function(){var e=f("[data-range-block]");e.length&&e.each((function(){var e=f(this).find(".range__range"),t=f(this).find("[data-input-start]"),n=f(this).find("[data-input-end]"),r=t.attr("data-input-start"),o=n.attr("data-input-end");d().create(e[0],{start:[r,o],step:100,range:{min:1e3,max:1e4},connect:!0,format:u()({decimals:0})}),e[0].noUiSlider.on("update",(function(e,r){var o=e[r];r?n.val(o):t.val(o)})),t.on("change",(function(){e[0].noUiSlider.set([+this.value,null])})),n.on("change",(function(){e[0].noUiSlider.set([null,+this.value])}))}))}));n(3378);var p=1280,b=768,v=window.matchMedia("(min-width: ".concat(p,"px)")),h=(window.matchMedia("(min-width: ".concat(b,"px)")),n(5638));h((function(){if(v.matches){var e=function(){var e=h(window).scrollTop();Math.abs(r-e)>=1&&(e>r?t.addClass("header--up"):t.removeClass("header--up")),r<1&&t.removeClass("header--up"),h("[data-header-transparent]").length&&(r<1?t.addClass("header--transparent"):t.removeClass("header--transparent")),r=e},t=h(".header"),n=120,r=h(window).scrollTop();h(window).one("scroll",(function t(){e(),setTimeout((function(){e(),h(window).one("scroll",t)}),1e3/n)}))}}));n(8917);var w=n(5638);function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(Object(n),!0).forEach((function(t){g(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function g(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function O(e,t,n,r,o,a,i){try{var c=e[a](i),s=c.value}catch(e){return void n(e)}c.done?t(s):Promise.resolve(s).then(r,o)}w((function(){w("[data-fancy-button]").on("click",(function(e){var t={closeExisting:!0,touch:!1,hideScrollbar:!1,baseTpl:'<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-stage"></div></div>',animationEffect:"zoom"};e.preventDefault();var n=w(this).data("fancy-button"),r=w('[data-fancy-modal="'.concat(n,'"]'));if("search"===n)t.animationEffect="top";w.fancybox.defaults=m(m({},w.fancybox.defaults),t),w.fancybox.open(r)}))})),document.body.classList.add("body--hidden"),window.addEventListener("load",(function(){document.body.classList.remove("body--unvisible");var e=document.querySelector(".loader");if(e){var t=function(){var e,t=(e=regeneratorRuntime.mark((function e(){var t,o,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=function(e){return new Promise((function(t){return setTimeout(t,e)}))},o=regeneratorRuntime.mark((function e(o){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(13!==o&&26!==o&&74!==o){e.next=3;break}return e.next=3,t(400);case 3:setTimeout((function(){n.textContent="".concat(o,"%"),r.style.height="".concat(o,"%"),v.matches&&(n.style.bottom="".concat(o,"%"),o>90&&(n.style.bottom="auto",n.style.top="60px"))}),15*o);case 4:case"end":return e.stop()}}),e)})),a=0;case 4:if(!(a<101)){e.next=9;break}return e.delegateYield(o(a),"t0",6);case 6:a++,e.next=4;break;case 9:case"end":return e.stop()}}),e)})),function(){var t=this,n=arguments;return new Promise((function(r,o){var a=e.apply(t,n);function i(e){O(a,r,o,i,c,"next",e)}function c(e){O(a,r,o,i,c,"throw",e)}i(void 0)}))});return function(){return t.apply(this,arguments)}}(),n=e.querySelector("[data-loader-count]"),r=e.querySelector("[data-loader-progress]");t(),setTimeout((function(){var t;e.classList.add("loader--hidden"),t=v.matches?document.querySelector("[data-video-desktop]"):document.querySelector("[data-video-mobile]"),window.scrollTo(0,0),document.body.classList.remove("body--hidden"),t.setAttribute("autoplay",""),t.load()}),3e3)}else document.body.classList.remove("body--hidden")}))},3378:(e,t,n)=>{var r=n(5638);r((function(){r("[data-accordion]").length&&window.addEventListener("click",(function(e){!function(e,t){var n=r(t),o=r(e.target);o.closest("[data-accordion-button]").length&&(o.closest(n).toggleClass("active"),o.closest(n).find("[data-accordion-dropdown]").eq(0).slideToggle())}(e,"[data-accordion]")}))}))}},n={};function r(e){var o=n[e];if(void 0!==o)return o.exports;var a=n[e]={exports:{}};return t[e].call(a.exports,a,a.exports,r),a.exports}r.m=t,e=[],r.O=(t,n,o,a)=>{if(!n){var i=1/0;for(l=0;l<e.length;l++){for(var[n,o,a]=e[l],c=!0,s=0;s<n.length;s++)(!1&a||i>=a)&&Object.keys(r.O).every((e=>r.O[e](n[s])))?n.splice(s--,1):(c=!1,a<i&&(i=a));if(c){e.splice(l--,1);var d=o();void 0!==d&&(t=d)}}return t}a=a||0;for(var l=e.length;l>0&&e[l-1][2]>a;l--)e[l]=e[l-1];e[l]=[n,o,a]},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={179:0,532:0};r.O.j=t=>0===e[t];var t=(t,n)=>{var o,a,[i,c,s]=n,d=0;if(i.some((t=>0!==e[t]))){for(o in c)r.o(c,o)&&(r.m[o]=c[o]);if(s)var l=s(r)}for(t&&t(n);d<i.length;d++)a=i[d],r.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return r.O(l)},n=self.webpackChunk=self.webpackChunk||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})(),r.O(void 0,[97,532],(()=>r(6371)));var o=r.O(void 0,[97,532],(()=>r(8746)));o=r.O(o)})();