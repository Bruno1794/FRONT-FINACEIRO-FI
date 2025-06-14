'use server'
import { GET_MOVIMENTO} from "@/functions/Api";
import {cookies} from "next/headers";
import {ICategoria} from "@/actions/categorias/get-categorias";
import {IBancos} from "@/actions/bancos/get-bancos";

export type IMovimento = {
    id: number;
    name: string;
    type_moviment: string;
    valor: string;
    Category: ICategoria;
    Banck: IBancos;
    status:string;
    date_venciment:string;
    date_pagamento:string;


}

export default async function getMovimento(value? :string) {

    const {url} = GET_MOVIMENTO(value);
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