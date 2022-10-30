import { gql } from '@apollo/client'

export const Skill_GET_MANY = gql`
  query skill(
    $where: Skill_bool_exp
    $order_by: [Skill_order_by!]
    $limit: Int
    $offset: Int
  ) {
    Skill(where: $where, order_by: $order_by, limit: $limit, offset: $offset) {
      id
      name
      category
      subCategory
      isSoftware
    }
  }
`

export const Skill_GET_ONE = gql`
  query skill($id: String!) {
    Skill_by_pk(id: $id) {
      id
      name
      category
      subCategory
      isSoftware
    }
  }
`

export default {
  'skill.get.many': Skill_GET_MANY,
  'skill.get.one': Skill_GET_ONE,
}
