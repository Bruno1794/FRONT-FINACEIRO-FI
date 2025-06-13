'use server'
import {DELETE_BANCOS} from "@/functions/Api";
import {cookies} from "next/headers";

export default async function deleteBancos(value: number) {

    const {url} = DELETE_BANCOS(value);
    const token = await cookies();

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token.get('token')?.value}`
        }
    });
    if (!response.ok) throw new Error("Falha ao deletar banco");
    const data = await response.json();
    return {data}

}