import sayHello from './es6module'

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('updateTextBtn').addEventListener('click', event => {
    document.getElementById('showText').innerText = sayHello()
    event.target.disabled = true

  })

})

if (module.hot) {
  module.hot.accept('./es6module', () => {
    const updateTextBtn = document.getElementById('updateTextBtn')
    updateTextBtn.innerText = 'Update Text'
    updateTextBtn.disabled = false

  })

}