import { gql } from '@apollo/client'

export const OCCURENCE_GET_MANY = gql`
  query Occurences(
    $where: Occurence_bool_exp
    $order_by: [Occurence_order_by!]
    $limit: Int
    $offset: Int
  ) {
    Occurence(
      where: $where
      order_by: $order_by
      limit: $limit
      offset: $offset
    ) {
      id
      text
      Article {
        title
        id
        published_at
        company_id
      }
      ParsedSkills {
        skill_mention
        skill_id
      }
    }
  }
`

export default {
  'occ.get.many': OCCURENCE_GET_MANY,
}
