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
    id: 'KS120D96FHL88PZDKZKH',
    name: 'Algorithms',
    trend: [
      { value: 0 },
      { value: 0 },
      { value: 1 },
      { value: 1 },
      { value: 2 },
      { value: 2 },
      { value: 4 },
      { value: 4 },
      { value: 6 },
    ],
  },
  {
    id: 'KSIF64ADSNL8EWGKPF0O',
    name: 'Dataset',
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
      { value: 1 },
      { value: 5 },
      { value: 5 },
    ],
  },
]

export default {
  'ts.get.many': staticTrends,
}
