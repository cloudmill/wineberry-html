import "./styles/app";

import "./scripts/sliders";
import "./scripts/range-slider";
import "./scripts/accordion";
import "./scripts/header";
import "./scripts/fancybox";
import "./scripts/loader";
import "./scripts/tippy";
import * as ScrollMagic from "scrollmagic";
import { TweenMax, TimelineMax } from "gsap";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import Linear from 'gsap'

import "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";

ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

$(() => {
  if ($('#about').length) {
    const controller = new ScrollMagic.Controller({
      refreshInterval: 0,
    })

    const items = document.querySelectorAll('.about__item')
    
    items.forEach(item => {
      const content = item.querySelector('[data-about-content]')
      const scene = new ScrollMagic.Scene({
        triggerElement: content,
        // triggerHook: 0.5,
        duration: 300,
        // offset: 100,
      })
        .setPin('#about')
        .setTween(TweenMax.to(content, 0.5, {y: '-50%' ,opacity: 0, ease: Linear.easeIn}))
        .addTo(controller);
    })

    console.log(controller.info());
  }
})