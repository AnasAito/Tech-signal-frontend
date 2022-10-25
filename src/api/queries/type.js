import { gql } from "@apollo/client";

export const TYPE_GET_MANY = gql`
  query type(
    $where: type_bool_exp
    $order_by: [type_order_by!]
    $limit: Int
    $offset: Int
  ) {
    type(where: $where, order_by: $order_by, limit: $limit, offset: $offset) {
      label
    }
  }
`;

export default {
  "type.get.many": TYPE_GET_MANY,
};
