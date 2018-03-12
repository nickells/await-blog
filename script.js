const waitForTransition = (elem, propertyName) => new Promise((resolve, reject) => {
  const transitionEndListener = (evt) => {
    if (evt.propertyName === propertyName) {
      elem.removeEventListener('transitionend', transitionEndListener)
      resolve()
    }
  }
  elem.addEventListener('transitionend', transitionEndListener)
})

const delay = (time) => new Promise((resolve) => setTimeout(resolve, (time)))

const $bricks = [...document.getElementsByClassName('brick')]

async function activateBrick($brick) {
  $brick.classList.add('active')
  await waitForTransition($brick, 'transform')
}

const forEachSuccessive = async (vals, func) => {
  for (let val of vals) {
    await func(val)
  }
  return vals
}

async function go(){
  await delay(500)
  forEachSuccessive($bricks, activateBrick)
}

go()