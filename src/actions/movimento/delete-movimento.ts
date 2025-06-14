'use server'
import {DELETE_MOVIMENTO} from "@/functions/Api";
import {cookies} from "next/headers";

export default async function deleteMovimento(value: number) {

    const {url} = DELETE_MOVIMENTO(value);
    const token = await cookies();

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token.get('token')?.value}`
        }
    });
    if (!response.ok) throw new Error("Falha ao deletar movimento");
    const data = await response.json();
    return {data}

}