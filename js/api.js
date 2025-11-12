console.log("API.js loaded");

export const Api = {
    login: "https://learn.zone01oujda.ma/api/auth/signin",
    graphQl : "https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql",
}
console.log("API endpoints defined:", Api);
export const QUERY = `{ 
    user {
        login firstName lastName email auditRatio totalUp totalDown
        
        finished_projects: groups(where: {
            group: {status: {_eq: finished}, _and: 
                {eventId: {_eq: 41}}
            }
        }) {
            group { path members { userLogin } }
        }

        transactions_aggregate(where: {eventId: {_eq: 41}, type: {_eq: "xp"}}) {
            aggregate { sum { amount } }
        }
    }
}`;



export const userData = {}
