import { gql } from '@apollo/client'

export const STATS = gql`
  query Occurences(
    $where: Occurence_bool_exp
    $order_by: [Occurence_order_by!]
    $limit: Int
    $offset: Int
  ) {
    ParsedSkill_aggregate {
      aggregate {
        count
      }
    }
    Article_aggregate {
      aggregate {
        count
      }
    }
    Company_aggregate {
      aggregate {
        count
      }
    }
  }
`

export default {
  'stats.get.many': STATS,
}
