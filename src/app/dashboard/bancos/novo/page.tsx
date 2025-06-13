'use client'
import styles from '../clientes.module.css'
import React from "react";
import Link from "next/link";
import {redirect} from "next/navigation";
import Swal from 'sweetalert2'
import postBancos from "@/actions/bancos/post-bancos";



export default function NovoClientePage() {

    const [nome, setNome] = React.useState("");


    const [state, action] = React.useActionState(postBancos, {
        ok: false,
        error: '',
        data: null
    })

    if (state.ok) {

        Swal.fire({
            title: "Criado com sucesso",
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
                    <Link href="/dashboard/categorias" className="btnPadrao">Voltar</Link>
                </div>
            </div>
            <section className={`conteiner ${styles.section}`}>
                <form className={styles.form} action={action}>


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