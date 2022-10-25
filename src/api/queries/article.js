import { gql } from '@apollo/client'

export const ARTICLE_GET_MANY = gql`
  query node(
    $where: Article_bool_exp
    $order_by: [Article_order_by!]
    $limit: Int
    $offset: Int
  ) {
    Article(
      where: $where
      order_by: $order_by
      limit: $limit
      offset: $offset
    ) {
      title
      company_id
      published_at
      id
      Occurences {
        text
        ParsedSkills {
          skill_id
          skill_mention
        }
      }
    }
  }
`

export default {
  'article.get.many': ARTICLE_GET_MANY,
}
