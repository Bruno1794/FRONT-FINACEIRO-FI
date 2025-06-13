'use client'
import styles from '../../categorias/clientes.module.css'
import React from "react";
import Link from "next/link";
import {redirect, useParams} from "next/navigation";
import Swal from 'sweetalert2'
import putCategoria from "@/actions/categorias/put-categoria";
import showBancos from "@/actions/bancos/show-bancos";
import putBanco from "@/actions/bancos/put-banco";


export default function NovoClientePage() {

    const [nome, setNome] = React.useState("");
    const {id} = useParams();


    React.useEffect(() => {
        async function showCat() {
            const {data} = await showBancos(Number(id))
            setNome(data.name)
        }

        showCat();
    }, [id])


    const [state, action] = React.useActionState(putBanco, {
        ok: false,
        error: '',
        data: null
    })

    if (state.ok) {

        Swal.fire({
            title: "Alterado com sucesso",
            icon: "success",
            draggable: true
        }).then(() => {
            redirect("/dashboard/bancos");
        });
    }

    return (
        <>
            <div className="acoesTable">
                <div className="acoes">
                    <Link href="/dashboard/bancos" className="btnPadrao">Voltar</Link>
                </div>
            </div>
            <section className={`conteiner ${styles.section}`}>
                <form className={styles.form} action={action}>

                    <input type="hidden" name="id" value={id}/>
                    <div className={styles.agrupar}>
                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                name="name"
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                                placeholder=" "
                                required={true}
                            />
                            <label>Banco</label>
                        </div>


                    </div>

                    <button type="submit" className="btnPadrao">
                        Salvar
                    </button>
                </form>

            </section>
        </>
    )
}