import React from 'react'
import ReactDOM from 'react-dom'

import Container from './components/Container'

export type BeverageType = 'coffee' | 'tea'

export interface BeverageItem {
  name: string
  type: BeverageType
}

const coffeItems: BeverageItem[] = [
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

ReactDOM.render(<Container items={coffeItems} />, document.getElementById('app'))
