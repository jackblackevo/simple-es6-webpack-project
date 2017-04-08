import sayHello from './es6module'

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('showText').innerText = sayHello('World')

})