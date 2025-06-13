'use server'
import {cookies} from "next/headers";
import {SHOW_CATEGORIA} from "@/functions/Api";

export default async function showCategoria(value: number) {
    const {url} = SHOW_CATEGORIA(value);
    const token = await cookies();

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token.get('token')?.value}`
        }
    })
    if (!response.ok) throw new Error(response.statusText);
    const {data} = await response.json();
    return {data}
}