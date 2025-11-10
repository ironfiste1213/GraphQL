import { Api } from "./api.js";
import { Token } from "./auth.js";

export async function fetchlogin() {
    const response = await fetch(Api.graphQl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token}`
        },
        body : JSON.stringify({ query :`
            {
            user {
            login
            }
            }`})
    })
    if (!response.ok) throw Error('failed to fetch data user login ')
    const result = await response.json();
    return result.data.user[0].login;
}
