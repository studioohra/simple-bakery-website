// HTML
if (process.env.NODE_ENV !== 'production') {
  require('./index.html')
}

// CSS
require('./styles/main.scss');

// JavaScript
window.$ = require('jquery');
