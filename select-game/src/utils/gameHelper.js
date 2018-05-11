import { getRandomNumber } from './number'

export function createItems() {
  const indexWithVal = getRandomNumber([0, 1, 2])

  return [0, 1, 2].map(i => {
    return {
      id: i,
      value: i === indexWithVal ? 'bingo' : undefined,
      isMarked: false
    }
  })
}
