'use server'
import {GET_BANCOS} from "@/functions/Api";
import {cookies} from "next/headers";

export type IBancos = {
    id: number;
    name: string;


}

export default async function getBancos(value? :string) {

    const {url} = GET_BANCOS(value);
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