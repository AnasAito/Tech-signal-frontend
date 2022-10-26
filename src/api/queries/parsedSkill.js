import { gql } from "@apollo/client";

export const PARSEDSKILL_GET_MANY = gql`
  query parsedSkill(
    $where: ParsedSkill_bool_exp
    $order_by: [ParsedSkill_order_by!]
    $limit: Int
    $offset: Int
  ) {
    ParsedSkill(where: $where, order_by: $order_by, limit: $limit, offset: $offset) {
      occurence_id
    }
  }
`;


export default {
  "parsedSkill.get.many": PARSEDSKILL_GET_MANY,

};
