'use server'
import {POST_BANCOS} from "@/functions/Api";
import {cookies} from "next/headers";

export default async function postBancos(state: object, formData: FormData) {

    const {url} = POST_BANCOS();
    const token = await cookies();

    try {
        const banco = {
            name: formData.get("name") as string,
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.get('token')?.value}`
            },
            body: JSON.stringify(banco)

        })

        if (!response.ok) throw new Error("Falha registrar bancos");
        const data = await response.json()


        return {ok: data.success, error: '', data: null}
    } catch (error) {
        return {error: error};
    }

}