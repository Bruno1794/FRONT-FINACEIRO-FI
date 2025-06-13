'use server'
import {GET_USER} from "@/functions/Api";
import {cookies} from "next/headers";

export default async function getUser() {

    const {url} = GET_USER();
    const token = await cookies();

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token.get('token')?.value}`
        }
    })
    const {user} = await response.json();

    return {user};

}