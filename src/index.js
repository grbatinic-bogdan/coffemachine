import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import Container from './components/Container'

const coffeItems = [
  {
    name: 'Coffee',
    type: 'coffee',
  },
  {
    name: 'Latte',
    type: 'coffee',
  },
  {
    name: 'Espresso',
    type: 'coffee',
  },
  {
    name: 'Mocha',
    type: 'coffee',
  },
  {
    name: 'Cappuccino',
    type: 'coffee',
  },
  {
    name: 'Ice coffee',
    type: 'coffee',
  },
  {
    name: 'Tea',
    type: 'tea',
  },
  {
    name: 'Matcha',
    type: 'tea',
  },
]

ReactDOM.render(<Container items={coffeItems} />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
