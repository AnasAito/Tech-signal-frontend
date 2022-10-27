import { gql } from '@apollo/client'

export const staticTrends = [
  {
    id: 'KS1208P6ZMZ4N872Y7X5',
    name: 'API',
    trend: [
      { value: 1 },
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 6 },
      { value: 8 },
      { value: 8 },
    ],
  },
  {
    id: 'KS120SQ5W4Q57JMD2Y81',
    name: 'Automation',
    trend: [
      { value: 1 },
      { value: 1 },
      { value: 1 },
      { value: 2 },
      { value: 2 },
      { value: 3 },
      { value: 5 },
      { value: 6 },
    ],
  },
  {
    id: 'KS128FH5WCM4TPGLCS8T',
    name: 'Real-Time Computing',
    trend: [
      { value: 1 },
      { value: 1 },
      { value: 1 },
      { value: 1 },
      { value: 1 },
      { value: 1 },
      { value: 2 },
      { value: 4 },
      { value: 4 },
    ],
  },
  {
    id: 'ES2933FAEF72CE4E2840',
    name: 'Machine Learning',
    trend: [
      { value: 0 },
      { value: 0 },
      { value: 0 },
      { value: 0 },
      { value: 0 },
      { value: 0 },
      { value: 0 },
      { value: 0 },
      { value: 1 },
      { value: 3 },
      { value: 3 },
      { value: 7 },
    ],
  },
]

export default {
  'ts.get.many': staticTrends,
}
