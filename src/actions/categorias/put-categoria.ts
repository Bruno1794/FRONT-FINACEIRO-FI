'use server'
import {PUT_CATEGORIA} from "@/functions/Api";
import {cookies} from "next/headers";

export default async function putCategoria(state: object, formData: FormData) {

    const {url} = PUT_CATEGORIA(Number(formData.get('id')));
    const token = await cookies();

    try {
        const categoria = {
            name: formData.get("name") as string,
        }
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.get('token')?.value}`
            },
            body: JSON.stringify(categoria)

        })

        if (!response.ok) throw new Error("Falha ao alterar categoria");
        const data = await response.json()


        return {ok: data.status, error: '', data: null}
    } catch (error) {
        return {error: error};
    }

}