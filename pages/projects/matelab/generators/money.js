import { randInt, mcq, numQ, generateDistractors, pickAndShuffle } from './utils'

const ukCoins = ['1p', '2p', '5p', '10p', '20p', '50p', '£1', '£2']
const coinValues = { '1p': 1, '2p': 2, '5p': 5, '10p': 10, '20p': 20, '50p': 50, '£1': 100, '£2': 200 }

function identifyCoin() {
  const coin = ukCoins[randInt(0, ukCoins.length - 1)]
  const wrongs = ukCoins.filter((c) => c !== coin).slice(0, 3)
  return mcq(
    'What coin is this?',
    coin, wrongs,
    { kind: 'coins', data: { coins: [coin] } }
  )
}

function addCoins() {
  const numCoins = randInt(2, 4)
  const smallCoins = ['1p', '2p', '5p', '10p', '20p', '50p']
  const chosen = []
  for (let i = 0; i < numCoins; i++) {
    chosen.push(smallCoins[randInt(0, smallCoins.length - 1)])
  }
  const total = chosen.reduce((s, c) => s + coinValues[c], 0)
  const answer = total >= 100 ? `£${(total / 100).toFixed(2)}` : `${total}p`
  const d = generateDistractors(total, 3, 1, 200).map((v) =>
    v >= 100 ? `£${(v / 100).toFixed(2)}` : `${v}p`
  )
  return mcq(
    'How much money is here?',
    answer, d,
    { kind: 'coins', data: { coins: chosen } }
  )
}

function makeAmount() {
  const amounts = [15, 20, 30, 35, 50, 75]
  const target = amounts[randInt(0, amounts.length - 1)]
  const options = [
    { coins: ['10p', '5p'], total: 15 },
    { coins: ['10p', '10p'], total: 20 },
    { coins: ['20p', '10p'], total: 30 },
    { coins: ['20p', '10p', '5p'], total: 35 },
    { coins: ['50p'], total: 50 },
    { coins: ['50p', '20p', '5p'], total: 75 },
  ]
  const correct = options.find((o) => o.total === target)
  const wrongs = options.filter((o) => o.total !== target).slice(0, 3).map((o) => o.coins.join(' + '))
  return mcq(
    `Which coins make ${target}p?`,
    correct.coins.join(' + '),
    wrongs
  )
}

function giveChange() {
  const prices = [15, 20, 25, 30, 35, 40, 45]
  const price = prices[randInt(0, prices.length - 1)]
  const paid = 50
  const change = paid - price
  const d = generateDistractors(change, 3, 1, 50)
  return mcq(`Something costs ${price}p. You pay 50p. How much change?`, `${change}p`, d.map((v) => `${v}p`))
}

function compareAmounts() {
  const a = randInt(10, 90)
  const b = randInt(10, 90)
  if (a === b) return compareAmounts()
  const more = a > b ? `${a}p` : `${b}p`
  return mcq(`Which is more: ${a}p or ${b}p?`, more, [`${a > b ? b : a}p`, 'They are the same', 'Cannot tell'])
}

function poundsAndPence() {
  const pounds = randInt(1, 5)
  const pence = randInt(1, 9) * 10
  const total = pounds * 100 + pence
  const answer = `£${pounds}.${String(pence).padStart(2, '0')}`
  const wrongs = [
    `£${pounds + 1}.${String(pence).padStart(2, '0')}`,
    `£${pounds}.${String(pence + 10 > 90 ? pence - 10 : pence + 10).padStart(2, '0')}`,
    `${total}p`,
  ]
  return mcq(`${pounds} pound${pounds > 1 ? 's' : ''} and ${pence}p = ?`, answer, wrongs)
}

export function generate(count = 10) {
  return pickAndShuffle([
    identifyCoin, addCoins, makeAmount, giveChange,
    compareAmounts, poundsAndPence,
  ], count)
}

export default function _() { return null }
