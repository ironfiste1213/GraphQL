import { Api, QUERY, userData } from "./api.js";
import { gettoken } from "./jwt.js";
export async function fetchlogin() {
    const Token = gettoken();
    try {
        console.log("DEBUG: Starting fetchlogin process");
        console.log("DEBUG: token in fetchlogin:", Token);
        const response = await fetch(Api.graphQl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Token}`
            },
            body: JSON.stringify({
                query: QUERY
        })
        })
        if (!response.ok) throw Error('failed to fetch data user login ')
        const result = await response.json();

        console.log("DEBUG: User login fetched:", result);
        if (result.errors) {
            console.error("GraphQL errors:", result.errors);
            throw new Error("GraphQL query failed: " + result.errors[0].message);
        }
        const user = result.data.user[0];
        console.log("DEBUG: USER OBJECT AFTER THR FETCHING", user);

        console.log("DEBUG: userlogin--->",user.login);

        console.log("DEBUG: Setting userData properties");
        userData.id = user.id;
        userData.userName = user.login;
        console.log("DEBUG: userData.userName set to:", userData.userName);
        userData.firstName = user.firstName;
        console.log("DEBUG: userData.firstName set to:", userData.firstName);
        userData.lastName = user.lastName;
        console.log("DEBUG: userData.lastName set to:", userData.lastName);
        userData.email = user.email;
        console.log("DEBUG: userData.email set to:", userData.email);
        userData.avatarUrl = user.avatarUrl;
        console.log("DEBUG: userData.avatarUrl set to:", userData.avatarUrl);
        userData.auditRatio = parseFloat(user.auditRatio).toFixed(1);
        userData.totalUp = user.totalUp;
        console.log("DEBUG: userData.totalUp set to:", userData.totalUp);
        userData.totalDown = user.totalDown;
        console.log("DEBUG: userData.totalDown set to:", userData.totalDown);
        userData.xp = user.xp;
        userData.projects = user.finished_projects;
        console.log("DEBUG: userData.projects set to:", userData.projects);
        userData.projectCount = user.finished_projects.length;
        console.log("DEBUG: userData.projectCount set to:", userData.projectCount);
        userData.audits = user.audits;
        userData.progresses = user.progresses;
        userData.totalXP = user.xp_aggregate.aggregate.sum.amount;
        console.log("DEBUG: userData.totalXP set to:", userData.totalXP);
        console.log("DEBUG: userData fully populated", userData);
        return result;
    } catch (error) {
        console.error("Error fetching user login:", error);
        throw error;
    }
}
