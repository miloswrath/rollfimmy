const Util = {
  addClass: function(el, className) {
    var classList = className.split(' ');
    el.classList.add(...classList);
  },

  osHasReducedMotion: function() {
    if (!window.matchMedia) return false;
    var matchMediaObj = window.matchMedia('(prefers-reduced-motion: reduce)');
    return matchMediaObj ? matchMediaObj.matches : false;
  }
};

export default Util;
