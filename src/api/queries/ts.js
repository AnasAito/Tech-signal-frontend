import { gql } from '@apollo/client'

export const staticTrends = [
  {
    id: 'KS120SQ5W4Q57JMD2Y81',
    name: 'Automation',
    trend: [
      { value: 1 },
      { value: 1 },
      { value: 1 },
      { value: 1 },
      { value: 1 },
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 5 },
      { value: 6 },
      { value: 7 },
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
      { value: 3 },
      { value: 4 },
      { value: 6 },
      { value: 8 },
    ],
  },

  {
    id: 'KS124RX787SQ1WVD8XF6',
    name: 'Scalability',
    trend: [
      { value: 1 },
      { value: 1 },
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 6 },
      { value: 8 },
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
      { value: 1 },
      { value: 3 },
      { value: 4 },
      { value: 4 },
      { value: 8 },
    ],
  },
]

export default {
  'ts.get.many': staticTrends,
}
