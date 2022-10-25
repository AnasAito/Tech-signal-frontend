import { gql } from "@apollo/client";

export const NODE_GET_MANY = gql`
  query node(
    $where: node_bool_exp
    $order_by: [node_order_by!]
    $limit: Int
    $offset: Int
  ) {
    node(where: $where, order_by: $order_by, limit: $limit, offset: $offset) {
      id
      label
      description
      type
      score
      node_tags {
        tag {
          label
        }
      }
      link
      created_at
    }
  }
`;

export const NODE_GET_ONE = gql`
  query node_by_pk($id: uuid!) {
    node_by_pk(id: $id) {
      id
      label
      description
      type
      score
      node_tags {
        tag {
          label
        }
      }
      link
      created_at
    }
  }
`;
export const NODE_GET_NEIGHBORS = gql`
  query node_neighbors($id: uuid!) {
    node_by_pk(id: $id) {
      label
      edges_to {
        node_from {
          id
          label
        }
      }
      edges_from {
        node_to {
          id
          label
        }
      }
    }
  }
`;
export default {
  "node.get.many": NODE_GET_MANY,
  "node.get.one": NODE_GET_ONE,
  "node.get.neighbors": NODE_GET_NEIGHBORS,
};
