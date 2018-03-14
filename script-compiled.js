let activateBrick = (() => {
  var _ref2 = _asyncToGenerator(function* ($brick) {
    $brick.classList.add('active');
    yield waitForTransition($brick, 'transform');
  });

  return function activateBrick(_x3) {
    return _ref2.apply(this, arguments);
  };
})();

let go = (() => {
  var _ref3 = _asyncToGenerator(function* () {
    yield delay(500);
    forEachSuccessive($bricks, activateBrick);
  });

  return function go() {
    return _ref3.apply(this, arguments);
  };
})();

// go()

/* Slideshow */


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const waitForTransition = (elem, propertyName) => new Promise((resolve, reject) => {
  const transitionEndListener = evt => {
    console.log('got', evt, 'from', evt.target);
    if (evt.propertyName === propertyName) {
      elem.removeEventListener('transitionend', transitionEndListener);
      resolve();
    }
  };
  elem.addEventListener('transitionend', transitionEndListener);
});

const waitForLoad = element => new Promise(resolve => element.addEventListener('load', resolve));

const delay = time => new Promise(resolve => setTimeout(resolve, time));

const forEachSuccessive = (() => {
  var _ref = _asyncToGenerator(function* (vals, func) {
    for (let val of vals) {
      yield func(val);
    }
    return vals;
  });

  return function forEachSuccessive(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

/* bricks */
const $bricks = [...document.getElementsByClassName('brick')];

const createSlideshow = (() => {
  var _ref4 = _asyncToGenerator(function* (container) {
    const images = [...container.children];
    yield Promise.all(images.map(waitForLoad));
    const playAndAdvance = (() => {
      var _ref5 = _asyncToGenerator(function* (img) {
        img.style.opacity = 1;
        img.style.transition = 'opacity 500ms ease-in-out';
        img.style.opacity = 0;
        yield waitForTransition(img, 'opacity');
        yield delay(500);
      });

      return function playAndAdvance(_x5) {
        return _ref5.apply(this, arguments);
      };
    })();
    forEachSuccessive(images.reverse(), playAndAdvance);
  });

  return function createSlideshow(_x4) {
    return _ref4.apply(this, arguments);
  };
})();
// createSlideshow(document.getElementById('gallery'))

/* Stagger animation */

const startStagger = (() => {
  var _ref6 = _asyncToGenerator(function* (container) {
    yield delay(50);
    const children = [...container.children];
    const waitAndActivate = (() => {
      var _ref7 = _asyncToGenerator(function* (child) {
        yield delay(500);
        child.classList.add('active');
      });

      return function waitAndActivate(_x7) {
        return _ref7.apply(this, arguments);
      };
    })();
    yield forEachSuccessive(children, waitAndActivate);
    yield delay(500);
    const deactivate = function (child) {
      return child.classList.remove('active');
    };
    children.forEach(deactivate);
  });

  return function startStagger(_x6) {
    return _ref6.apply(this, arguments);
  };
})();

startStagger(document.getElementById('headers'));
