// VTimeline.js
export default class VTimeline {
  constructor(element) {
    this.element = element;
    this.sections = this.element.getElementsByClassName('js-v-timeline__section');
    this.animate = this.element.getAttribute('data-animation') === 'on';
    this.animationClass = 'v-timeline__section--animate';
    this.animationDelta = '-150px';
    this.initVTimeline();
  }

  initVTimeline() {
    if (!this.animate) return;
    for (var i = 0; i < this.sections.length; i++) {
      var observer = new IntersectionObserver(this.vTimelineCallback.bind(this, i), {
        rootMargin: "0px 0px " + this.animationDelta + " 0px"
      });
      observer.observe(this.sections[i]);
    }
  }

  vTimelineCallback(index, entries, observer) {
    if (entries[0].isIntersecting) {
      Util.addClass(this.sections[index], this.animationClass);
      observer.unobserve(this.sections[index]);
    }
  }
}

// Initialize VTimeline instances if needed
export function initializeVTimelines() {
  const timelines = document.querySelectorAll('.js-v-timeline');
  const intersectionObserverSupported = 'IntersectionObserver' in window &&
                                        'IntersectionObserverEntry' in window &&
                                        'intersectionRatio' in window.IntersectionObserverEntry.prototype;
  const reducedMotion = Util.osHasReducedMotion();

  if (timelines.length > 0 && intersectionObserverSupported && !reducedMotion) {
    timelines.forEach(timeline => new VTimeline(timeline));
  } else {
    timelines.forEach(timeline => timeline.removeAttribute('data-animation'));
  }
}
