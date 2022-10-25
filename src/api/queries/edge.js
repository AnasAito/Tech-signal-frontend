import { gql } from "@apollo/client";

export const EDGE_GET_MANY = gql`
  query edge(
    $where: edge_bool_exp
    $order_by: [edge_order_by!]
    $limit: Int
    $offset: Int
  ) {
    edge(where: $where, order_by: $order_by, limit: $limit, offset: $offset) {
      id
      node_from {
        id
      }
      node_to {
        id
      }
    }
  }
`;

export const EDGE_GET_ONE = gql`
  query edge_by_pk($id: uuid!) {
    edge_by_pk(id: $id) {
      id
      node_from {
        id
        label
      }
      node_to {
        id
        label
      }
    }
  }
`;
export default {
  "edge.get.many": EDGE_GET_MANY,
  "edge.get.one": EDGE_GET_ONE,
};
