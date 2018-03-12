let activateBrick = (() => {
  var _ref = _asyncToGenerator(function* ($brick) {
    $brick.classList.add('active');
    yield waitForTransition($brick, 'transform');
  });

  return function activateBrick(_x) {
    return _ref.apply(this, arguments);
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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const waitForTransition = (elem, propertyName) => new Promise((resolve, reject) => {
  const transitionEndListener = evt => {
    if (evt.propertyName === propertyName) {
      elem.removeEventListener('transitionend', transitionEndListener);
      resolve();
    }
  };
  elem.addEventListener('transitionend', transitionEndListener);
});

const delay = time => new Promise(resolve => setTimeout(resolve, time));

const $bricks = [...document.getElementsByClassName('brick')];

const forEachSuccessive = (() => {
  var _ref2 = _asyncToGenerator(function* (vals, func) {
    for (let val of vals) {
      yield func(val);
    }
    return vals;
  });

  return function forEachSuccessive(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
})();

go();
