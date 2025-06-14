'use server'
import {POST_MOVIMENTO} from "@/functions/Api";
import {cookies} from "next/headers";
import {parseCurrencyToFloat} from "@/functions/format-money-bd";

export default async function postMovimento(state: object, formData: FormData) {

    const {url} = POST_MOVIMENTO();
    const token = await cookies();

    try {
        const movimento = {
            name: formData.get("name") as string,
            type_moviment: formData.get("type_moviment") as string,
            date_venciment: formData.get("date_venciment") as string,
            valor: parseCurrencyToFloat(String(formData.get("valor"))),
            category_id: formData.get("category_id") as string,
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.get('token')?.value}`
            },
            body: JSON.stringify(movimento)

        })

        if (!response.ok) throw new Error("Falha registrar movimento");
        const data = await response.json()

        return {ok: data.success, error: '', data: null}
    } catch (error) {
        return {error: error};
    }

}