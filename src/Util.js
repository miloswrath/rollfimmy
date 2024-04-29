// Util.js
export default Util = {
    addClass: function(el, className) {
      var classList = className.split(' ');
      el.classList.add(classList[0]);
      if (classList.length > 1) this.addClass(el, classList.slice(1).join(' '));
    },
  
    osHasReducedMotion: function() {
      if (!window.matchMedia) return false;
      var matchMediaObj = window.matchMedia('(prefers-reduced-motion: reduce)');
      return matchMediaObj ? matchMediaObj.matches : false;
    }
  };