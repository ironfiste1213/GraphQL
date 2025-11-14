console.log("API.js loaded");

export const Api = {
  login: "https://learn.zone01oujda.ma/api/auth/signin",
  graphQl: "https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql",
};
console.log("API endpoints defined:", Api);
export const QUERY = `{
  user {
    id
    login
    firstName
    lastName
    email
    auditRatio
    totalUp
    totalDown
    avatarUrl
    xp: transactions(
      where: { type: { _eq: "xp" }, eventId: { _eq: 41 } }
      order_by: { createdAt: asc }
    ) {
      amount
      createdAt
      path
    }
    xp_aggregate: transactions_aggregate(where: { type: { _eq: "xp" }, eventId: { _eq: 41 } }) {
      aggregate {
        sum {
          amount
        }
      }
    }
    audits(
      order_by: { createdAt: desc }
    ) {
      grade
      createdAt
      auditorId
      auditor {
        id
        login
      }
      group {
        id
        path
      }
    }
    progresses(
      order_by: { createdAt: asc }
    ) {
      id
      grade
      createdAt
      objectId
      path
    }
    finished_projects: groups(
      where: { group: { status: { _eq: finished }, eventId: { _eq: 41 } } }
    ) {
      group {
        path
        createdAt
        members {
          userLogin
          user {
            avatarUrl
          }
        }
      }
    }
  }
}`;
export const skilsquery = ` {
      user {
        transactions(
          where: {type: {_nin: ["xp", "level", "up", "down"]}}
          order_by: {amount: desc}
        ) {
          skillType: type
          skillAmount: amount
        }
      }
    }` 
export const userData = {};
