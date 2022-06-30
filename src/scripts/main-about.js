import * as ScrollMagic from "scrollmagic";
import { TweenMax, TimelineMax } from "gsap";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import Linear from 'gsap'

import "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";
import { mediaQuery } from "./mediaQueries";

ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

window.addEventListener('load', () => {
  const section = document.getElementById('about')
  if (section && mediaQuery.matches) {
    const controller = new ScrollMagic.Controller({
      refreshInterval: 0,
    })

    const title = section.querySelector('.main-page__title')

    new ScrollMagic.Scene({
      triggerElement: title,
      duration: 500,
    })
      .setTween(TweenMax.to(title, 1, { scale: 0.19, ease: Linear.easeIn, autoRound: false}))
      .addTo(controller);

    const items = document.querySelectorAll('.about__item')
    
    items.forEach(item => {
      const content = item.querySelector('[data-about-content]')
      const wipe = new TimelineMax()

      wipe.add(TweenMax.fromTo(content, 0.5, {y: '50%', opacity: 0}, {y: '0', opacity: 1, ease: Linear.easeIn}))
      wipe.add(TweenMax.to(content, 1, {y: '-50%' ,opacity: 0, ease: Linear.easeIn}))

      const scene = new ScrollMagic.Scene({
        triggerElement: item,
        triggerHook: 0.5,
        duration: 600,
        offset: 200,
      })
        .setTween(wipe)
        .addTo(controller);
    })
  }
})
