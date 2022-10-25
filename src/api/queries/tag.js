import { gql } from "@apollo/client";

export const TAG_GET_MANY = gql`
  query tag(
    $where: tag_bool_exp
    $order_by: [tag_order_by!]
    $limit: Int
    $offset: Int
  ) {
    tag(where: $where, order_by: $order_by, limit: $limit, offset: $offset) {
      id
      label

      tag_nodes {
        node {
          id
        }
      }
    }
  }
`;

export const TAG_GET_ONE = gql`
  query tag_by_pk($id: uuid!) {
    node_by_pk(id: $id) {
      id
      label

      tag_nodes {
        node {
          id
        }
      }
    }
  }
`;
export default {
  "tag.get.many": TAG_GET_MANY,
  "tag.get.one": TAG_GET_ONE,
};
