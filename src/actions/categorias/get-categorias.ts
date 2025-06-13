'use server'
import {GET_CATEGORIA} from "@/functions/Api";
import {cookies} from "next/headers";

export type ICategoria = {
    id: number;
    name: string;


}

export default async function getCategorias(value? :string) {

    const {url} = GET_CATEGORIA(value);
    const token = await cookies();
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.get('token')?.value}`
        }
    })
    const {data} = await response.json();
    return {data}

}