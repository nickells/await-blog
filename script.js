const waitForTransition = (elem, propertyName) => new Promise((resolve, reject) => {
  const transitionEndListener = (evt) => {
    console.log('got', evt, 'from', evt.target)
    if (evt.propertyName === propertyName) {
      elem.removeEventListener('transitionend', transitionEndListener)
      resolve()
    }
  }
  elem.addEventListener('transitionend', transitionEndListener)
})

const waitForLoad = (element) => new Promise((resolve) => element.addEventListener('load', resolve))

const delay = (time) => new Promise((resolve) => setTimeout(resolve, (time)))

const forEachSuccessive = async (vals, func) => {
  for (let val of vals) {
    await func(val)
  }
  return vals
}


/* bricks */
const $bricks = [...document.getElementsByClassName('brick')]

async function activateBrick($brick) {
  $brick.classList.add('active')
  await waitForTransition($brick, 'transform')
}

async function go(){
  await delay(500)
  forEachSuccessive($bricks, activateBrick)
}

// go()

/* Slideshow */
const createSlideshow = async (container) => {
  const images = [ ...container.children ]
  await Promise.all(images.map(waitForLoad))
  const playAndAdvance = async (img) => {
    img.style.opacity = 1;
    img.style.transition = 'opacity 500ms ease-in-out'
    img.style.opacity = 0;
    await waitForTransition(img, 'opacity')
    await delay(500)
  }
  forEachSuccessive(images.reverse(), playAndAdvance)
}
// createSlideshow(document.getElementById('gallery'))

/* Stagger animation */

const startStagger = async (container) => {
  await delay(50)
  const children = [...container.children]
  const waitAndActivate = async (child) => {
    await delay(500)
    child.classList.add('active')
  }
  await forEachSuccessive(children, waitAndActivate)
  await delay(500)
  const deactivate = (child) => child.classList.remove('active')
  children.forEach(deactivate)
}

startStagger(document.getElementById('headers'))
