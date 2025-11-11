import { Api } from "./api.js";
import { gettoken } from "./jwt.js";
export async function fetchlogin() {
    const Token = gettoken();
    try {

        console.log("token in fetchlogin:", Token);
        const response = await fetch(Api.graphQl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Token}`
            },
            body: JSON.stringify({
                query: `
            {
            user {
            login
            }
            }`})
        })
        if (!response.ok) throw Error('failed to fetch data user login ')
        const result = await response.json();
        console.log("User login fetched:", result);
        return result.data;
    } catch (error) {
        console.error("Error fetching user login:", error);
        throw error;
    }
}