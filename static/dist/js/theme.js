(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//
// aos.js
// Theme module
//
'use strict';

(function () {
  //
  // Functions
  //
  function init() {
    var options = {
      duration: 700,
      easing: 'ease-out-quad',
      once: true,
      startEvent: 'load'
    };
    AOS.init(options);
  } //
  // Events
  //


  if (typeof AOS !== 'undefined') {
    init();
  }
})();

},{}],2:[function(require,module,exports){
"use strict";

//
// countup.js
// Theme module
//
(function () {
  //
  // Variables
  //
  var toggle = document.querySelectorAll('[data-toggle="countup"]'); //
  // Functions
  //

  function init(elem) {
    var startVal = elem.dataset.from ? +elem.dataset.from : null;
    var endVal = elem.dataset.to ? +elem.dataset.to : null;
    var decimals = elem.dataset.decimals ? +elem.dataset.decimals : null;
    var duration = elem.dataset.duration ? +elem.dataset.duration : null;
    var options = elem.dataset.options ? JSON.parse(elem.dataset.options) : null;
    var countUp = new CountUp(elem, startVal, endVal, decimals, duration, options);

    if (!countUp.error) {
      countUp.start();
      elem.classList.add('counted');
    } else {
      console.error(countUp.error);
    }
  } //
  // Events
  //


  if (typeof CountUp !== 'undefined' && toggle) {
    [].forEach.call(toggle, function (el) {
      if (el.getAttribute('data-aos-id') !== 'countup:in') {
        init(el);
      }
    });
  }

  document.addEventListener('aos:in:countup:in', function (e) {
    if (e.detail instanceof Element) {
      init(e.detail);
    } else {
      var toCount = document.querySelectorAll('.aos-animate[data-aos-id="countup:in"]:not(.counted)');
      [].forEach.call(toCount, function (el) {
        init(el);
      });
    }
  });
})();

},{}],3:[function(require,module,exports){
//
// dropdown.js
//
'use strict';

(function () {
  var navbarDropdown = document.querySelectorAll('.navbar-nav .dropdown, .navbar-nav .dropright');
  [].forEach.call(navbarDropdown, function (dropdown) {
    "mouseenter mouseleave click".split(' ').forEach(function (event) {
      dropdown.addEventListener(event, function () {
        if (window.innerWidth > 991) {
          var toggle = dropdown.querySelector('[data-toggle="dropdown"]');

          if (event === 'mouseenter') {
            dropdown.classList.add('hovered');
            $(toggle).dropdown('show');
          } else {
            $(toggle).dropdown('hide');
            toggle.blur();
          }
        }
      });
    });
  });
})();

},{}],4:[function(require,module,exports){
"use strict";

//
// fancybox.js
// Theme module
//
(function () {
  //
  // Functions
  //
  function globalOptions() {
    $.fancybox.defaults.image.preload = false;
    $.fancybox.defaults.toolbar = false;
    $.fancybox.defaults.clickContent = false;
  } //
  // Events
  //


  if (jQuery().fancybox) {
    globalOptions();
  }
})();

},{}],5:[function(require,module,exports){
//
// Highlight.js ==================================
//
'use strict';

(function () {
  //
  // Variables
  //
  var toggle = document.querySelectorAll('.highlight'); //
  // Functions
  //

  function init(el) {
    hljs.highlightBlock(el);
  } //
  // Events
  //


  if (typeof hljs !== 'undefined' && toggle) {
    [].forEach.call(toggle, function (el) {
      init(el);
    });
  }
})();

},{}],6:[function(require,module,exports){
//
// isotope.js
//
'use strict';

(function () {
  var $isotope = $('[data-isotope]');
  var $filter = $('[data-filter]');
  $filter.on('click', function () {
    var $this = $(this);
    var filter = $this.data('filter');
    var target = $this.data('target');
    $(target).isotope({
      filter: filter
    });
  });
  $isotope.imagesLoaded().progress(function () {
    $isotope.isotope('layout');
  });
})();

},{}],7:[function(require,module,exports){
"use strict";

//
// map.js
// Theme module
//
(function () {
  //
  // Variables
  //
  var map = document.querySelectorAll('[data-toggle="map"]');
  var accessToken = 'pk.eyJ1IjoiZ29vZHRoZW1lcyIsImEiOiJjanU5eHR4N2cybDU5NGVwOHZwNGprb3E0In0.msdw9q16dh8v4azJXUdiXg'; //
  // Methods
  //

  function init(el) {
    var elementOptions = el.dataset.options;
    elementOptions = elementOptions ? JSON.parse(elementOptions) : {};
    var defaultOptions = {
      container: el,
      style: 'mapbox://styles/mapbox/light-v9',
      scrollZoom: false,
      interactive: false
    };
    var options = Object.assign(defaultOptions, elementOptions); // Get access token

    mapboxgl.accessToken = accessToken; // Init map

    new mapboxgl.Map(options);
  } //
  // Events
  //


  if (typeof mapboxgl !== 'undefined' && map) {
    [].forEach.call(map, function (el) {
      init(el);
    });
  }
})();

},{}],8:[function(require,module,exports){
//
// navbar.js
// Theme module
//
'use strict';

(function () {
  //
  // Variables
  //
  var navbar = document.querySelector('.navbar');
  var isLight = false;
  var isTogglable = navbar ? navbar.classList.contains('navbar-togglable') : false; //
  // Functions
  //

  function makeNavbarLight() {
    if (!isLight && isTogglable) {
      navbar.classList.remove('navbar-dark');
      navbar.classList.add('navbar-light');
      navbar.classList.add('bg-white');
      navbar.classList.add('border-bottom');
      isLight = true;
    }
  }

  function makeNavbarDark() {
    if (isLight && isTogglable) {
      navbar.classList.remove('navbar-light');
      navbar.classList.remove('bg-white');
      navbar.classList.remove('border-bottom');
      navbar.classList.add('navbar-dark');
      repaintNav();
      isLight = false;
    }
  } // Repaint hack for Safari overscroll bug


  function repaintNav() {
    navbar.style.display = 'none';
    navbar.offsetHeight;
    navbar.style.display = 'block';
  }

  function toggleNavbar(event) {
    var scrollTop = window.pageYOffset;

    if (scrollTop > 0 && !isLight) {
      makeNavbarLight();
    } else if (scrollTop == 0 || scrollTop < 0 && isLight) {
      makeNavbarDark();
    }
  } //
  // Events
  //


  if (navbar && isTogglable) {
    "load scroll".split(' ').forEach(function (e) {
      window.addEventListener(e, function (e) {
        var type = e.type;
        toggleNavbar(type);
      });
    });
  }
})();

},{}],9:[function(require,module,exports){
//
// polyfills.js
// Theme module
//
'use strict'; // SVG
// Polyfill to solve shortcomings of SVG scaling in IE. Inspired by http://nicolasgallagher.com/canvas-fix-svg-scaling-in-internet-explorer/.

(function () {
  //
  // Variables
  //
  var svg = document.querySelectorAll('.svg-shim > svg'); //
  // Methods
  //

  function init(elem) {
    // Get element's fill value
    var color = window.getComputedStyle(elem, null).getPropertyValue('color'); // Get SVG's outerHTML and prepare to use it in image

    var content = new XMLSerializer().serializeToString(elem);
    content = content.replace(/currentColor/g, color);
    content = content.replace(/\s\s+/g, ' ');
    content = content.replace(/</g, '%3C');
    content = content.replace(/>/g, '%3E');
    content = content.replace(/#/g, '%23');
    content = content.replace(/"/g, "'");
    content = 'data:image/svg+xml,' + content; // Create a replacer image

    var img = document.createElement('img');
    img.src = content;
    img.alt = '...'; // Replace SVG with image

    var parent = elem.parentNode;
    parent.appendChild(img);
    parent.removeChild(elem);
  } //
  // Events
  //
  // Only has affect in IE


  if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
    [].forEach.call(svg, function (elem) {
      init(elem);
    });
  }
})();

},{}],10:[function(require,module,exports){
//
// popovers.js
// Theme module
//
'use strict';

(function () {
  //
  // Variables
  //
  var toggle = document.querySelectorAll('[data-toggle="popover"]'); //
  // Functions
  //

  function init(toggle) {
    $(toggle).popover({
      template: '<div class="popover" role="tooltip"><div class="arrow"></div><h6 class="popover-header text-uppercase"></h6><div class="popover-body"></div></div>'
    });
  } //
  // Events
  //


  if (toggle) {
    init(toggle);
  }
})();

},{}],11:[function(require,module,exports){
"use strict";

//
// pricing.js
// Theme module
//
(function () {
  //
  // Variables
  //
  var toggle = document.querySelector('[data-toggle="price"]');
  var DURATION = 1; //
  // Functions
  //

  function update(e) {
    var input = e.target;
    var checked = input.checked;
    var target = input.dataset.target;
    var targets = document.querySelectorAll(target);
    [].forEach.call(targets, function (e) {
      var annual = e.dataset.annual;
      var monthly = e.dataset.monthly;
      var decimals = e.dataset.decimals ? e.dataset.decimals : null;
      var duration = e.dataset.duration ? e.dataset.duration : DURATION;
      var options = e.dataset.options ? JSON.parse(e.dataset.options) : null;
      var countUp = !checked ? new CountUp(e, monthly, annual, decimals, duration, options) : new CountUp(e, annual, monthly, decimals, duration, options);

      if (!countUp.error) {
        countUp.start();
      } else {
        console.error(countUp.error);
      }
    });
  } //
  // Events
  //


  if (typeof CountUp !== 'undefined' && toggle) {
    toggle.addEventListener('change', function (e) {
      update(e);
    });
  }
})();

},{}],12:[function(require,module,exports){
//
// smooth-scroll.js
// Theme module
//
'use strict';

(function () {
  //
  // Variables
  //
  var toggle = '[data-toggle="smooth-scroll"]'; //
  // Functions
  //

  function init(toggle) {
    var options = {
      header: '.navbar.fixed-top',
      offset: function offset(anchor, toggle) {
        return toggle.dataset.offset ? toggle.dataset.offset : 24;
      }
    }; // Init

    new SmoothScroll(toggle, options);
  } //
  // Events
  //


  if (typeof SmoothScroll !== 'undefined' && toggle) {
    init(toggle);
  }
})();

},{}],13:[function(require,module,exports){
"use strict";

//
// theme.js
// Theme JavaScript
//
var aos = require('./aos.js');

var countup = require('./countup.js');

var dropdown = require('./dropdown.js');

var fancybox = require('./fancybox.js');

var highlight = require('./highlight.js');

var isotope = require('./isotope.js');

var map = require('./map.js');

var navbar = require('./navbar.js');

var polyfills = require('./polyfills.js');

var popovers = require('./popovers.js');

var pricing = require('./pricing.js');

var smoothscroll = require('./smooth-scroll.js');

var tooltips = require('./tooltips.js');

var typed = require('./typed.js');

},{"./aos.js":1,"./countup.js":2,"./dropdown.js":3,"./fancybox.js":4,"./highlight.js":5,"./isotope.js":6,"./map.js":7,"./navbar.js":8,"./polyfills.js":9,"./popovers.js":10,"./pricing.js":11,"./smooth-scroll.js":12,"./tooltips.js":14,"./typed.js":15}],14:[function(require,module,exports){
//
// tooltip.js
// Theme module
//
'use strict';

(function () {
  //
  // Variables
  //
  var toggle = document.querySelectorAll('[data-toggle="tooltip"]'); //
  // Functions
  //

  function init(toggle) {
    $(toggle).tooltip();
  } //
  // Events
  //


  if (toggle) {
    init(toggle);
  }
})();

},{}],15:[function(require,module,exports){
"use strict";

//
// typed.js
// Theme module
//
(function () {
  //
  // Variables
  //
  var toggle = document.querySelectorAll('[data-toggle="typed"]'); //
  // Functions
  //

  function init(el) {
    var elementOptions = el.dataset.options;
    elementOptions = elementOptions ? JSON.parse(elementOptions) : {};
    var defaultOptions = {
      typeSpeed: 40,
      backSpeed: 40,
      backDelay: 1000,
      loop: true
    };
    var options = Object.assign(defaultOptions, elementOptions); // Init

    new Typed(el, options);
  } //
  // Events
  //


  if (typeof Typed !== 'undefined' && toggle) {
    [].forEach.call(toggle, function (el) {
      init(el);
    });
  }
})();

},{}]},{},[13])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYW9zLmpzIiwic3JjL2pzL2NvdW50dXAuanMiLCJzcmMvanMvZHJvcGRvd24uanMiLCJzcmMvanMvZmFuY3lib3guanMiLCJzcmMvanMvaGlnaGxpZ2h0LmpzIiwic3JjL2pzL2lzb3RvcGUuanMiLCJzcmMvanMvbWFwLmpzIiwic3JjL2pzL25hdmJhci5qcyIsInNyYy9qcy9wb2x5ZmlsbHMuanMiLCJzcmMvanMvcG9wb3ZlcnMuanMiLCJzcmMvanMvcHJpY2luZy5qcyIsInNyYy9qcy9zbW9vdGgtc2Nyb2xsLmpzIiwic3JjL2pzL3RoZW1lLmpzIiwic3JjL2pzL3Rvb2x0aXBzLmpzIiwic3JjL2pzL3R5cGVkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQSxDQUFDLFlBQVc7QUFFVjtBQUNBO0FBQ0E7QUFFQSxXQUFTLElBQVQsR0FBZ0I7QUFDZCxRQUFJLE9BQU8sR0FBRztBQUNaLE1BQUEsUUFBUSxFQUFFLEdBREU7QUFFWixNQUFBLE1BQU0sRUFBRSxlQUZJO0FBR1osTUFBQSxJQUFJLEVBQUUsSUFITTtBQUlaLE1BQUEsVUFBVSxFQUFFO0FBSkEsS0FBZDtBQU1BLElBQUEsR0FBRyxDQUFDLElBQUosQ0FBUyxPQUFUO0FBQ0QsR0FkUyxDQWlCVjtBQUNBO0FBQ0E7OztBQUVBLE1BQUksT0FBTyxHQUFQLEtBQWUsV0FBbkIsRUFBZ0M7QUFDOUIsSUFBQSxJQUFJO0FBQ0w7QUFFRixDQXpCRDs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLENBQUMsWUFBVztBQUVWO0FBQ0E7QUFDQTtBQUVBLE1BQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQix5QkFBMUIsQ0FBYixDQU5VLENBU1Y7QUFDQTtBQUNBOztBQUVBLFdBQVMsSUFBVCxDQUFjLElBQWQsRUFBb0I7QUFDbEIsUUFBSSxR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QSxDQUFDLFlBQVc7QUFFVjtBQUNBO0FBQ0E7QUFFQSxNQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsdUJBQTFCLENBQWIsQ0FOVSxDQVNWO0FBQ0E7QUFDQTs7QUFFQSxXQUFTLElBQVQsQ0FBYyxFQUFkLEVBQWtCO0FBQ2hCLFFBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQyxPQUFILENBQVcsT0FBaEM7QUFDSSxJQUFBLGNBQWMsR0FBRyxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUwsQ0FBVyxjQUFYLENBQUgsR0FBZ0MsRUFBL0Q7QUFDSixRQUFJLGNBQWMsR0FBRztBQUNuQixNQUFBLFNBQVMsRUFBRSxFQURRO0FBRW5CLE1BQUEsU0FBUyxFQUFFLEVBRlE7QUFHbkIsTUFBQSxTQUFTLEVBQUUsSUFIUTtBQUluQixNQUFBLElBQUksRUFBRTtBQUphLEtBQXJCO0FBTUEsUUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQVAsQ0FBYyxjQUFkLEVBQThCLGNBQTlCLENBQWQsQ0FUZ0IsQ0FXaEI7O0FBQ0EsUUFBSSxLQUFKLENBQVUsRUFBVixFQUFjLE9BQWQ7QUFDRCxHQTFCUyxDQTZCVjtBQUNBO0FBQ0E7OztBQUVBLE1BQUksT0FBTyxLQUFQLEtBQWlCLFdBQWpCLElBQWdDLE1BQXBDLEVBQTRDO0FBQzFDLE9BQUcsT0FBSCxDQUFXLElBQVgsQ0FBZ0IsTUFBaEIsRUFBd0IsVUFBUyxFQUFULEVBQWE7QUFDbkMsTUFBQSxJQUFJLENBQUMsRUFBRCxDQUFKO0FBQ0QsS0FGRDtBQUdEO0FBRUYsQ0F2Q0QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvL1xyXG4vLyBhb3MuanNcclxuLy8gVGhlbWUgbW9kdWxlXHJcbi8vXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcblxyXG4gIC8vXHJcbiAgLy8gRnVuY3Rpb25zXHJcbiAgLy9cclxuXHJcbiAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIHZhciBvcHRpb25zID0ge1xyXG4gICAgICBkdXJhdGlvbjogNzAwLFxyXG4gICAgICBlYXNpbmc6ICdlYXNlLW91dC1xdWFkJyxcclxuICAgICAgb25jZTogdHJ1ZSxcclxuICAgICAgc3RhcnRFdmVudDogJ2xvYWQnXHJcbiAgICB9XHJcbiAgICBBT1MuaW5pdChvcHRpb25zKTtcclxuICB9XHJcblxyXG5cclxuICAvL1xyXG4gIC8vIEV2ZW50c1xyXG4gIC8vXHJcblxyXG4gIGlmICh0eXBlb2YgQU9TICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgaW5pdCgpO1xyXG4gIH1cclxuXHJcbn0pKCk7IiwiLy9cclxuLy8gY291bnR1cC5qc1xyXG4vLyBUaGVtZSBtb2R1bGVcclxuLy9cclxuXHJcbihmdW5jdGlvbigpIHtcclxuXHJcbiAgLy9cclxuICAvLyBWYXJpYWJsZXNcclxuICAvL1xyXG5cclxuICB2YXIgdG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdG9nZ2xlPVwiY291bnR1cFwiXScpO1xyXG5cclxuXHJcbiAgLy9cclxuICAvLyBGdW5jdGlvbnNcclxuICAvL1xyXG5cclxuICBmdW5jdGlvbiBpbml0KGVsZW0pIHtcclxuICAgIHZhciBzdGFydFZhbCA9IChlbGVtLmRhdGFzZXQuZnJvbSkgPyArZWxlbS5kYXRhc2V0LmZyb20gOiBudWxsO1xyXG4gICAgdmFyIGVuZFZhbCA9IChlbGVtLmRhdGFzZXQudG8pID8gK2VsZW0uZGF0YXNldC50byA6IG51bGw7XHJcbiAgICB2YXIgZGVjaW1hbHMgPSAoZWxlbS5kYXRhc2V0LmRlY2ltYWxzKSA/ICtlbGVtLmRhdGFzZXQuZGVjaW1hbHMgOiBudWxsO1xyXG4gICAgdmFyIGR1cmF0aW9uID0gKGVsZW0uZGF0YXNldC5kdXJhdGlvbikgPyArZWxlbS5kYXRhc2V0LmR1cmF0aW9uIDogbnVsbDtcclxuICAgIHZhciBvcHRpb25zID0gKGVsZW0uZGF0YXNldC5vcHRpb25zKSA/IEpTT04ucGFyc2UoZWxlbS5kYXRhc2V0Lm9wdGlvbnMpIDogbnVsbDtcclxuICAgIHZhciBjb3VudFVwID0gbmV3IENvdW50VXAoZWxlbSwgc3RhcnRWYWwsIGVuZFZhbCwgZGVjaW1hbHMsIGR1cmF0aW9uLCBvcHRpb25zKTtcclxuXHJcbiAgICBpZiAoIWNvdW50VXAuZXJyb3IpIHtcclxuICAgICAgY291bnRVcC5zdGFydCgpO1xyXG4gICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ2NvdW50ZWQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoY291bnRVcC5lcnJvcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLy9cclxuICAvLyBFdmVudHNcclxuICAvL1xyXG5cclxuICBpZiAodHlwZW9mIENvdW50VXAgIT09ICd1bmRlZmluZWQnICYmIHRvZ2dsZSkge1xyXG4gICAgW10uZm9yRWFjaC5jYWxsKHRvZ2dsZSwgZnVuY3Rpb24oZWwpIHtcclxuICAgICAgaWYgKGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1hb3MtaWQnKSAhPT0gJ2NvdW50dXA6aW4nKSB7XHJcbiAgICAgICAgaW5pdChlbCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYW9zOmluOmNvdW50dXA6aW4nLCBmdW5jdGlvbihlKSB7XHJcbiAgICBpZiAoZS5kZXRhaWwgaW5zdGFuY2VvZiBFbGVtZW50KSB7XHJcbiAgICAgIGluaXQoZS5kZXRhaWwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIHRvQ291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYW9zLWFuaW1hdGVbZGF0YS1hb3MtaWQ9XCJjb3VudHVwOmluXCJdOm5vdCguY291bnRlZCknKTtcclxuICAgICAgW10uZm9yRWFjaC5jYWxsKHRvQ291bnQsIGZ1bmN0aW9uKGVsKSB7XHJcbiAgICAgICAgaW5pdChlbCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIFxyXG59KSgpOyIsIi8vXHJcbi8vIGRyb3Bkb3duLmpzXHJcbi8vXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcbiAgdmFyIG5hdmJhckRyb3Bkb3duID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5hdmJhci1uYXYgLmRyb3Bkb3duLCAubmF2YmFyLW5hdiAuZHJvcHJpZ2h0Jyk7XHJcblxyXG4gIFtdLmZvckVhY2guY2FsbChuYXZiYXJEcm9wZG93biwgZnVuY3Rpb24oZHJvcGRvd24pIHtcclxuICAgIFwibW91c2VlbnRlciBtb3VzZWxlYXZlIGNsaWNrXCIuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIGRyb3Bkb3duLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDk5MSkge1xyXG4gICAgICAgICAgdmFyIHRvZ2dsZSA9IGRyb3Bkb3duLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCJdJyk7XHJcblxyXG4gICAgICAgICAgaWYgKGV2ZW50ID09PSAnbW91c2VlbnRlcicpIHtcclxuICAgICAgICAgICAgZHJvcGRvd24uY2xhc3NMaXN0LmFkZCgnaG92ZXJlZCcpO1xyXG5cclxuICAgICAgICAgICAgJCh0b2dnbGUpLmRyb3Bkb3duKCdzaG93Jyk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKHRvZ2dsZSkuZHJvcGRvd24oJ2hpZGUnKTtcclxuXHJcbiAgICAgICAgICAgIHRvZ2dsZS5ibHVyKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59KSgpO1xyXG4iLCIvL1xyXG4vLyBmYW5jeWJveC5qc1xyXG4vLyBUaGVtZSBtb2R1bGVcclxuLy9cclxuXHJcbihmdW5jdGlvbigpIHtcclxuICBcclxuICAvL1xyXG4gIC8vIEZ1bmN0aW9uc1xyXG4gIC8vXHJcblxyXG4gIGZ1bmN0aW9uIGdsb2JhbE9wdGlvbnMoKSB7XHJcbiAgICAkLmZhbmN5Ym94LmRlZmF1bHRzLmltYWdlLnByZWxvYWQgPSBmYWxzZTtcclxuICAgICQuZmFuY3lib3guZGVmYXVsdHMudG9vbGJhciA9IGZhbHNlO1xyXG4gICAgJC5mYW5jeWJveC5kZWZhdWx0cy5jbGlja0NvbnRlbnQgPSBmYWxzZTtcclxuICB9XHJcblxyXG5cclxuICAvL1xyXG4gIC8vIEV2ZW50c1xyXG4gIC8vXHJcblxyXG4gIGlmIChqUXVlcnkoKS5mYW5jeWJveCkge1xyXG4gICAgZ2xvYmFsT3B0aW9ucygpO1xyXG4gIH1cclxuXHJcbn0pKCk7IiwiLy9cclxuLy8gSGlnaGxpZ2h0LmpzID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy9cclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbihmdW5jdGlvbigpIHtcclxuXHJcbiAgLy9cclxuICAvLyBWYXJpYWJsZXNcclxuICAvL1xyXG5cclxuICB2YXIgdG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhpZ2hsaWdodCcpO1xyXG5cclxuXHJcbiAgLy9cclxuICAvLyBGdW5jdGlvbnNcclxuICAvL1xyXG5cclxuICBmdW5jdGlvbiBpbml0KGVsKSB7XHJcbiAgICBobGpzLmhpZ2hsaWdodEJsb2NrKGVsKTtcclxuICB9XHJcblxyXG5cclxuICAvL1xyXG4gIC8vIEV2ZW50c1xyXG4gIC8vXHJcblxyXG4gIGlmICh0eXBlb2YgaGxqcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdG9nZ2xlKSB7XHJcbiAgICBbXS5mb3JFYWNoLmNhbGwodG9nZ2xlLCBmdW5jdGlvbihlbCkge1xyXG4gICAgICBpbml0KGVsKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbn0pKCk7IiwiLy9cclxuLy8gaXNvdG9wZS5qc1xyXG4vL1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG4gIHZhciAkaXNvdG9wZSA9ICQoJ1tkYXRhLWlzb3RvcGVdJyk7XHJcbiAgdmFyICRmaWx0ZXIgPSAkKCdbZGF0YS1maWx0ZXJdJyk7XHJcblxyXG4gICRmaWx0ZXIub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgdmFyIGZpbHRlciA9ICR0aGlzLmRhdGEoJ2ZpbHRlcicpO1xyXG4gICAgdmFyIHRhcmdldCA9ICR0aGlzLmRhdGEoJ3RhcmdldCcpO1xyXG5cclxuICAgICQodGFyZ2V0KS5pc290b3BlKHtcclxuICAgICAgZmlsdGVyOiBmaWx0ZXJcclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICAkaXNvdG9wZS5pbWFnZXNMb2FkZWQoKS5wcm9ncmVzcyhmdW5jdGlvbigpIHtcclxuICAgICRpc290b3BlLmlzb3RvcGUoJ2xheW91dCcpO1xyXG4gIH0pO1xyXG59KSgpO1xyXG4iLCIvL1xyXG4vLyBtYXAuanNcclxuLy8gVGhlbWUgbW9kdWxlXHJcbi8vXHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcblxyXG4gIC8vXHJcbiAgLy8gVmFyaWFibGVzXHJcbiAgLy9cclxuXHJcbiAgdmFyIG1hcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRvZ2dsZT1cIm1hcFwiXScpO1xyXG4gIHZhciBhY2Nlc3NUb2tlbiA9ICdway5leUoxSWpvaVoyOXZaSFJvWlcxbGN5SXNJbUVpT2lKamFuVTVlSFI0TjJjeWJEVTVOR1Z3T0had05HcHJiM0UwSW4wLm1zZHc5cTE2ZGg4djRhekpYVWRpWGcnO1xyXG5cclxuXHJcbiAgLy9cclxuICAvLyBNZXRob2RzXHJcbiAgLy9cclxuXHJcbiAgZnVuY3Rpb24gaW5pdChlbCkge1xyXG4gICAgdmFyIGVsZW1lbnRPcHRpb25zID0gZWwuZGF0YXNldC5vcHRpb25zO1xyXG4gICAgICAgIGVsZW1lbnRPcHRpb25zID0gZWxlbWVudE9wdGlvbnMgPyBKU09OLnBhcnNlKGVsZW1lbnRPcHRpb25zKSA6IHt9O1xyXG4gICAgdmFyIGRlZmF1bHRPcHRpb25zID0ge1xyXG4gICAgICBjb250YWluZXI6IGVsLFxyXG4gICAgICBzdHlsZTogJ21hcGJveDovL3N0eWxlcy9tYXBib3gvbGlnaHQtdjknLFxyXG4gICAgICBzY3JvbGxab29tOiBmYWxzZSxcclxuICAgICAgaW50ZXJhY3RpdmU6IGZhbHNlXHJcbiAgICB9XHJcbiAgICB2YXIgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdE9wdGlvbnMsIGVsZW1lbnRPcHRpb25zKTtcclxuXHJcbiAgICAvLyBHZXQgYWNjZXNzIHRva2VuXHJcbiAgICBtYXBib3hnbC5hY2Nlc3NUb2tlbiA9IGFjY2Vzc1Rva2VuO1xyXG5cclxuICAgIC8vIEluaXQgbWFwXHJcbiAgICBuZXcgbWFwYm94Z2wuTWFwKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vXHJcbiAgLy8gRXZlbnRzXHJcbiAgLy9cclxuXHJcbiAgaWYgKHR5cGVvZiBtYXBib3hnbCAhPT0gJ3VuZGVmaW5lZCcgJiYgbWFwKSB7XHJcbiAgICBbXS5mb3JFYWNoLmNhbGwobWFwLCBmdW5jdGlvbihlbCkge1xyXG4gICAgICBpbml0KGVsKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbn0pKCk7IiwiLy9cclxuLy8gbmF2YmFyLmpzXHJcbi8vIFRoZW1lIG1vZHVsZVxyXG4vL1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG5cclxuICAvL1xyXG4gIC8vIFZhcmlhYmxlc1xyXG4gIC8vXHJcblxyXG4gIHZhciBuYXZiYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2YmFyJyk7XHJcbiAgdmFyIGlzTGlnaHQgPSBmYWxzZTtcclxuICB2YXIgaXNUb2dnbGFibGUgPSBuYXZiYXIgPyBuYXZiYXIuY2xhc3NMaXN0LmNvbnRhaW5zKCduYXZiYXItdG9nZ2xhYmxlJykgOiBmYWxzZTtcclxuXHJcbiAgLy9cclxuICAvLyBGdW5jdGlvbnNcclxuICAvL1xyXG5cclxuICBmdW5jdGlvbiBtYWtlTmF2YmFyTGlnaHQoKSB7XHJcbiAgICBpZiAoIWlzTGlnaHQgJiYgaXNUb2dnbGFibGUpIHtcclxuICAgICAgbmF2YmFyLmNsYXNzTGlzdC5yZW1vdmUoJ25hdmJhci1kYXJrJyk7XHJcbiAgICAgIG5hdmJhci5jbGFzc0xpc3QuYWRkKCduYXZiYXItbGlnaHQnKTtcclxuICAgICAgbmF2YmFyLmNsYXNzTGlzdC5hZGQoJ2JnLXdoaXRlJyk7XHJcbiAgICAgIG5hdmJhci5jbGFzc0xpc3QuYWRkKCdib3JkZXItYm90dG9tJyk7XHJcblxyXG4gICAgICBpc0xpZ2h0ID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIG1ha2VOYXZiYXJEYXJrKCkge1xyXG4gICAgaWYgKGlzTGlnaHQgJiYgaXNUb2dnbGFibGUpIHtcclxuICAgICAgbmF2YmFyLmNsYXNzTGlzdC5yZW1vdmUoJ25hdmJhci1saWdodCcpO1xyXG4gICAgICBuYXZiYXIuY2xhc3NMaXN0LnJlbW92ZSgnYmctd2hpdGUnKTtcclxuICAgICAgbmF2YmFyLmNsYXNzTGlzdC5yZW1vdmUoJ2JvcmRlci1ib3R0b20nKTtcclxuICAgICAgbmF2YmFyLmNsYXNzTGlzdC5hZGQoJ25hdmJhci1kYXJrJyk7XHJcblxyXG4gICAgICByZXBhaW50TmF2KCk7XHJcblxyXG4gICAgICBpc0xpZ2h0ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBSZXBhaW50IGhhY2sgZm9yIFNhZmFyaSBvdmVyc2Nyb2xsIGJ1Z1xyXG4gIGZ1bmN0aW9uIHJlcGFpbnROYXYoKSB7XHJcbiAgICBuYXZiYXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIG5hdmJhci5vZmZzZXRIZWlnaHQ7XHJcbiAgICBuYXZiYXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB0b2dnbGVOYXZiYXIoZXZlbnQpIHtcclxuICAgIHZhciBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcblxyXG4gICAgaWYgKHNjcm9sbFRvcCA+IDAgJiYgIWlzTGlnaHQpIHtcclxuICAgICAgbWFrZU5hdmJhckxpZ2h0KCk7XHJcbiAgICB9IGVsc2UgaWYgKHNjcm9sbFRvcCA9PSAwIHx8IHNjcm9sbFRvcCA8IDAgJiYgaXNMaWdodCkge1xyXG4gICAgICBtYWtlTmF2YmFyRGFyaygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy9cclxuICAvLyBFdmVudHNcclxuICAvL1xyXG5cclxuICBpZiAobmF2YmFyICYmIGlzVG9nZ2xhYmxlKSB7XHJcbiAgICBcImxvYWQgc2Nyb2xsXCIuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZSwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHZhciB0eXBlID0gZS50eXBlO1xyXG5cclxuICAgICAgICB0b2dnbGVOYXZiYXIodHlwZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxufSkoKTtcclxuIiwiLy9cclxuLy8gcG9seWZpbGxzLmpzXHJcbi8vIFRoZW1lIG1vZHVsZVxyXG4vL1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gU1ZHXHJcbi8vIFBvbHlmaWxsIHRvIHNvbHZlIHNob3J0Y29taW5ncyBvZiBTVkcgc2NhbGluZyBpbiBJRS4gSW5zcGlyZWQgYnkgaHR0cDovL25pY29sYXNnYWxsYWdoZXIuY29tL2NhbnZhcy1maXgtc3ZnLXNjYWxpbmctaW4taW50ZXJuZXQtZXhwbG9yZXIvLlxyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG4gIC8vXHJcbiAgLy8gVmFyaWFibGVzXHJcbiAgLy9cclxuXHJcbiAgdmFyIHN2ZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdmctc2hpbSA+IHN2ZycpO1xyXG5cclxuICAvL1xyXG4gIC8vIE1ldGhvZHNcclxuICAvL1xyXG5cclxuICBmdW5jdGlvbiBpbml0KGVsZW0pIHtcclxuICAgIC8vIEdldCBlbGVtZW50J3MgZmlsbCB2YWx1ZVxyXG4gICAgdmFyIGNvbG9yID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbSwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgnY29sb3InKTtcclxuXHJcbiAgICAvLyBHZXQgU1ZHJ3Mgb3V0ZXJIVE1MIGFuZCBwcmVwYXJlIHRvIHVzZSBpdCBpbiBpbWFnZVxyXG4gICAgdmFyIGNvbnRlbnQgPSBuZXcgWE1MU2VyaWFsaXplcigpLnNlcmlhbGl6ZVRvU3RyaW5nKGVsZW0pO1xyXG4gICAgY29udGVudCA9IGNvbnRlbnQucmVwbGFjZSgvY3VycmVudENvbG9yL2csIGNvbG9yKTtcclxuICAgIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoL1xcc1xccysvZywgJyAnKTtcclxuICAgIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoLzwvZywgJyUzQycpO1xyXG4gICAgY29udGVudCA9IGNvbnRlbnQucmVwbGFjZSgvPi9nLCAnJTNFJyk7XHJcbiAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKC8jL2csICclMjMnKTtcclxuICAgIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoL1wiL2csIFwiJ1wiKTtcclxuICAgIGNvbnRlbnQgPSAnZGF0YTppbWFnZS9zdmcreG1sLCcgKyBjb250ZW50O1xyXG5cclxuICAgIC8vIENyZWF0ZSBhIHJlcGxhY2VyIGltYWdlXHJcbiAgICB2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICBpbWcuc3JjID0gY29udGVudDtcclxuICAgIGltZy5hbHQgPSAnLi4uJztcclxuXHJcbiAgICAvLyBSZXBsYWNlIFNWRyB3aXRoIGltYWdlXHJcbiAgICB2YXIgcGFyZW50ID0gZWxlbS5wYXJlbnROb2RlO1xyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGltZyk7XHJcbiAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoZWxlbSk7XHJcbiAgfVxyXG5cclxuICAvL1xyXG4gIC8vIEV2ZW50c1xyXG4gIC8vXHJcblxyXG4gIC8vIE9ubHkgaGFzIGFmZmVjdCBpbiBJRVxyXG4gIGlmICgvTVNJRSBcXGR8VHJpZGVudC4qcnY6Ly50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XHJcbiAgICBbXS5mb3JFYWNoLmNhbGwoc3ZnLCBmdW5jdGlvbihlbGVtKSB7XHJcbiAgICAgIGluaXQoZWxlbSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn0pKCk7XHJcbiIsIi8vXHJcbi8vIHBvcG92ZXJzLmpzXHJcbi8vIFRoZW1lIG1vZHVsZVxyXG4vL1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG5cclxuICAvL1xyXG4gIC8vIFZhcmlhYmxlc1xyXG4gIC8vXHJcblxyXG4gIHZhciB0b2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10b2dnbGU9XCJwb3BvdmVyXCJdJyk7XHJcblxyXG5cclxuICAvL1xyXG4gIC8vIEZ1bmN0aW9uc1xyXG4gIC8vXHJcblxyXG4gIGZ1bmN0aW9uIGluaXQodG9nZ2xlKSB7XHJcbiAgICAkKHRvZ2dsZSkucG9wb3Zlcih7XHJcbiAgICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cInBvcG92ZXJcIiByb2xlPVwidG9vbHRpcFwiPjxkaXYgY2xhc3M9XCJhcnJvd1wiPjwvZGl2PjxoNiBjbGFzcz1cInBvcG92ZXItaGVhZGVyIHRleHQtdXBwZXJjYXNlXCI+PC9oNj48ZGl2IGNsYXNzPVwicG9wb3Zlci1ib2R5XCI+PC9kaXY+PC9kaXY+J1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy9cclxuICAvLyBFdmVudHNcclxuICAvL1xyXG5cclxuICBpZiAodG9nZ2xlKSB7XHJcbiAgICBpbml0KHRvZ2dsZSk7XHJcbiAgfVxyXG4gIFxyXG59KSgpOyIsIi8vXHJcbi8vIHByaWNpbmcuanNcclxuLy8gVGhlbWUgbW9kdWxlXHJcbi8vXHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcbiAgXHJcbiAgLy9cclxuICAvLyBWYXJpYWJsZXNcclxuICAvL1xyXG5cclxuICB2YXIgdG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdG9nZ2xlPVwicHJpY2VcIl0nKTtcclxuICB2YXIgRFVSQVRJT04gPSAxO1xyXG5cclxuXHJcbiAgLy9cclxuICAvLyBGdW5jdGlvbnNcclxuICAvL1xyXG5cclxuICBmdW5jdGlvbiB1cGRhdGUoZSkge1xyXG4gICAgdmFyIGlucHV0ID0gZS50YXJnZXQ7XHJcbiAgICB2YXIgY2hlY2tlZCA9IGlucHV0LmNoZWNrZWQ7XHJcblxyXG4gICAgdmFyIHRhcmdldCA9IGlucHV0LmRhdGFzZXQudGFyZ2V0O1xyXG4gICAgdmFyIHRhcmdldHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRhcmdldCk7XHJcblxyXG4gICAgW10uZm9yRWFjaC5jYWxsKHRhcmdldHMsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgdmFyIGFubnVhbCA9IGUuZGF0YXNldC5hbm51YWw7XHJcbiAgICAgIHZhciBtb250aGx5ID0gZS5kYXRhc2V0Lm1vbnRobHk7XHJcbiAgICAgIHZhciBkZWNpbWFscyA9IGUuZGF0YXNldC5kZWNpbWFscyA/IGUuZGF0YXNldC5kZWNpbWFscyA6IG51bGw7XHJcbiAgICAgIHZhciBkdXJhdGlvbiA9IGUuZGF0YXNldC5kdXJhdGlvbiA/IGUuZGF0YXNldC5kdXJhdGlvbiA6IERVUkFUSU9OO1xyXG4gICAgICB2YXIgb3B0aW9ucyA9IGUuZGF0YXNldC5vcHRpb25zID8gSlNPTi5wYXJzZShlLmRhdGFzZXQub3B0aW9ucykgOiBudWxsO1xyXG5cclxuICAgICAgdmFyIGNvdW50VXAgPSAoIWNoZWNrZWQpID8gbmV3IENvdW50VXAoZSwgbW9udGhseSwgYW5udWFsLCBkZWNpbWFscywgZHVyYXRpb24sIG9wdGlvbnMpIDogbmV3IENvdW50VXAoZSwgYW5udWFsLCBtb250aGx5LCBkZWNpbWFscywgZHVyYXRpb24sIG9wdGlvbnMpO1xyXG4gICAgICBcclxuICAgICAgaWYgKCFjb3VudFVwLmVycm9yKSB7XHJcbiAgICAgICAgY291bnRVcC5zdGFydCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoY291bnRVcC5lcnJvcik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy9cclxuICAvLyBFdmVudHNcclxuICAvL1xyXG5cclxuICBpZiAodHlwZW9mIENvdW50VXAgIT09ICd1bmRlZmluZWQnICYmIHRvZ2dsZSkge1xyXG4gICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgdXBkYXRlKGUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxufSkoKTsiLCIvL1xyXG4vLyBzbW9vdGgtc2Nyb2xsLmpzXHJcbi8vIFRoZW1lIG1vZHVsZVxyXG4vL1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG5cclxuICAvL1xyXG4gIC8vIFZhcmlhYmxlc1xyXG4gIC8vXHJcblxyXG4gIHZhciB0b2dnbGUgPSAnW2RhdGEtdG9nZ2xlPVwic21vb3RoLXNjcm9sbFwiXSc7XHJcblxyXG4gIC8vXHJcbiAgLy8gRnVuY3Rpb25zXHJcbiAgLy9cclxuXHJcbiAgZnVuY3Rpb24gaW5pdCh0b2dnbGUpIHtcclxuICAgIHZhciBvcHRpb25zID0ge1xyXG4gICAgICBoZWFkZXI6ICcubmF2YmFyLmZpeGVkLXRvcCcsXHJcbiAgICAgIG9mZnNldDogZnVuY3Rpb24oYW5jaG9yLCB0b2dnbGUpIHtcclxuICAgICAgICByZXR1cm4gdG9nZ2xlLmRhdGFzZXQub2Zmc2V0ID8gdG9nZ2xlLmRhdGFzZXQub2Zmc2V0IDogMjQ7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gSW5pdFxyXG4gICAgbmV3IFNtb290aFNjcm9sbCh0b2dnbGUsIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgLy9cclxuICAvLyBFdmVudHNcclxuICAvL1xyXG5cclxuICBpZiAodHlwZW9mIFNtb290aFNjcm9sbCAhPT0gJ3VuZGVmaW5lZCcgJiYgdG9nZ2xlKSB7XHJcbiAgICBpbml0KHRvZ2dsZSk7XHJcbiAgfVxyXG5cclxufSkoKTtcclxuIiwiLy9cclxuLy8gdGhlbWUuanNcclxuLy8gVGhlbWUgSmF2YVNjcmlwdFxyXG4vL1xyXG5jb25zdCBhb3MgPSByZXF1aXJlKCcuL2Fvcy5qcycpO1xyXG5jb25zdCBjb3VudHVwID0gcmVxdWlyZSgnLi9jb3VudHVwLmpzJyk7XHJcbmNvbnN0IGRyb3Bkb3duID0gcmVxdWlyZSgnLi9kcm9wZG93bi5qcycpO1xyXG5jb25zdCBmYW5jeWJveCA9IHJlcXVpcmUoJy4vZmFuY3lib3guanMnKTtcclxuY29uc3QgaGlnaGxpZ2h0ID0gcmVxdWlyZSgnLi9oaWdobGlnaHQuanMnKTtcclxuY29uc3QgaXNvdG9wZSA9IHJlcXVpcmUoJy4vaXNvdG9wZS5qcycpO1xyXG5jb25zdCBtYXAgPSByZXF1aXJlKCcuL21hcC5qcycpO1xyXG5jb25zdCBuYXZiYXIgPSByZXF1aXJlKCcuL25hdmJhci5qcycpO1xyXG5jb25zdCBwb2x5ZmlsbHMgPSByZXF1aXJlKCcuL3BvbHlmaWxscy5qcycpO1xyXG5jb25zdCBwb3BvdmVycyA9IHJlcXVpcmUoJy4vcG9wb3ZlcnMuanMnKTtcclxuY29uc3QgcHJpY2luZyA9IHJlcXVpcmUoJy4vcHJpY2luZy5qcycpO1xyXG5jb25zdCBzbW9vdGhzY3JvbGwgPSByZXF1aXJlKCcuL3Ntb290aC1zY3JvbGwuanMnKTtcclxuY29uc3QgdG9vbHRpcHMgPSByZXF1aXJlKCcuL3Rvb2x0aXBzLmpzJyk7XHJcbmNvbnN0IHR5cGVkID0gcmVxdWlyZSgnLi90eXBlZC5qcycpO1xyXG4iLCIvL1xyXG4vLyB0b29sdGlwLmpzXHJcbi8vIFRoZW1lIG1vZHVsZVxyXG4vL1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG5cclxuICAvL1xyXG4gIC8vIFZhcmlhYmxlc1xyXG4gIC8vXHJcblxyXG4gIHZhciB0b2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJyk7XHJcblxyXG5cclxuICAvL1xyXG4gIC8vIEZ1bmN0aW9uc1xyXG4gIC8vXHJcblxyXG4gIGZ1bmN0aW9uIGluaXQodG9nZ2xlKSB7XHJcbiAgICAkKHRvZ2dsZSkudG9vbHRpcCgpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vXHJcbiAgLy8gRXZlbnRzXHJcbiAgLy9cclxuXHJcbiAgaWYgKHRvZ2dsZSkge1xyXG4gICAgaW5pdCh0b2dnbGUpO1xyXG4gIH1cclxuICBcclxufSkoKTsiLCIvL1xyXG4vLyB0eXBlZC5qc1xyXG4vLyBUaGVtZSBtb2R1bGVcclxuLy9cclxuXHJcbihmdW5jdGlvbigpIHtcclxuICBcclxuICAvL1xyXG4gIC8vIFZhcmlhYmxlc1xyXG4gIC8vXHJcblxyXG4gIHZhciB0b2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10b2dnbGU9XCJ0eXBlZFwiXScpO1xyXG5cclxuXHJcbiAgLy9cclxuICAvLyBGdW5jdGlvbnNcclxuICAvL1xyXG5cclxuICBmdW5jdGlvbiBpbml0KGVsKSB7XHJcbiAgICB2YXIgZWxlbWVudE9wdGlvbnMgPSBlbC5kYXRhc2V0Lm9wdGlvbnM7XHJcbiAgICAgICAgZWxlbWVudE9wdGlvbnMgPSBlbGVtZW50T3B0aW9ucyA/IEpTT04ucGFyc2UoZWxlbWVudE9wdGlvbnMpIDoge307XHJcbiAgICB2YXIgZGVmYXVsdE9wdGlvbnMgPSB7XHJcbiAgICAgIHR5cGVTcGVlZDogNDAsXHJcbiAgICAgIGJhY2tTcGVlZDogNDAsXHJcbiAgICAgIGJhY2tEZWxheTogMTAwMCxcclxuICAgICAgbG9vcDogdHJ1ZVxyXG4gICAgfVxyXG4gICAgdmFyIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRPcHRpb25zLCBlbGVtZW50T3B0aW9ucyk7XHJcblxyXG4gICAgLy8gSW5pdFxyXG4gICAgbmV3IFR5cGVkKGVsLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG5cclxuICAvL1xyXG4gIC8vIEV2ZW50c1xyXG4gIC8vXHJcblxyXG4gIGlmICh0eXBlb2YgVHlwZWQgIT09ICd1bmRlZmluZWQnICYmIHRvZ2dsZSkge1xyXG4gICAgW10uZm9yRWFjaC5jYWxsKHRvZ2dsZSwgZnVuY3Rpb24oZWwpIHtcclxuICAgICAgaW5pdChlbCk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgXHJcbn0pKCk7Il19
