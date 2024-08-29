import { gsap, ScrollTrigger, ScrollToPlugin } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const runNavigationScrolling = (targetElement, offset = 0) => {
  gsap.to(window, {
    duration: 1,
    scrollTo: {
      y: targetElement.offsetTop - offset,
      autoKill: false
    },
    ease: "power2.out"
  });
};

const activateMenuOnScroll = (section, index, setActiveMenuItem, removeActiveMenuItem) => {
  ScrollTrigger.create({
    trigger: section,
    start: 'top center',
    end: 'bottom center',
    onEnter: () => setActiveMenuItem(index),
    onEnterBack: () => setActiveMenuItem(index),
    onLeave: () => removeActiveMenuItem(index),
    onLeaveBack: () => removeActiveMenuItem(index),
  });
};

const runProgressBar = () => {
  gsap.to('progress', {
    value: 100,
    ease: 'none',
    scrollTrigger: { scrub: 0.3 }
  });
};

let sideBarScrollAnimation;
let scrollTriggerInstance;

const runSideBarScroll = () => {
  sideBarScrollAnimation = gsap.to(".sidebar", {
    scrollTrigger: {
      trigger: ".sidebar",
      start: '0 top',
      end: "bottom top",
      scrub: 0,
      toggleActions: 'play pause resume reverse',
      onUpdate: self => {
        scrollTriggerInstance = self;
      },
    },
    paused: true,
    y: "100%",
    ease: "none"
  });
};

export {
  runNavigationScrolling,
  activateMenuOnScroll,
  runProgressBar,
  runSideBarScroll,
};
