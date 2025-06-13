'use server'
import {POST_LOGIN} from "@/functions/Api";
import {cookies} from "next/headers";

export default async function postLogin(state: object, formData: FormData) {

    const {url} = POST_LOGIN();

    try {
        const dados = {
            username: formData.get('username'),
            password: formData.get('password')
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {"content-type": "application/json"},
            body: JSON.stringify(dados)
        })
        if (!response.ok) throw new Error("Failed to login");
        const data = await response.json();

        const cookie = await cookies();
        cookie.set('token', data.token, {
            httpOnly: true,
            secure: true
        });


        return {ok: true, error: '', data: null}

    } catch (error) {
        return {error: error};
    }


}