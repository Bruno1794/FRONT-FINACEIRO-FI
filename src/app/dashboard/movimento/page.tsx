'use client'
import styles from './movimento.module.css'
import React from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import getMovimento, {IMovimento} from "@/actions/movimento/get-movimento";
import ModalModern from "@/app/components/modal/modal-modern";
import {formatMoneyInput} from "@/functions/format-money";
import getCategorias, {ICategoria} from "@/actions/categorias/get-categorias";
import postMovimento from "@/actions/movimento/post-movimento";
import deleteMovimento from "@/actions/movimento/delete-movimento";
import {formatDate} from "@/functions/format-Data";


export default function PageLista() {
    const [movimentos, setMovimentos] = React.useState([]);
    const [idAcao, setIdAcao] = React.useState<number | null>(null);
    const [atualiza, setAtualiza] = React.useState(false);
    const [pesquisa, setPesquisa] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false);
    const [name, setName] = React.useState("");
    const [tipo, setTipo] = React.useState("Receita");
    const [valor, setValor] = React.useState("");
    const [vencimento, setVencimento] = React.useState("");
    const [categorias, setCategorias] = React.useState([]);
    const [categoria, setCategoria] = React.useState("");


    const [state, action] = React.useActionState(postMovimento, {
        ok: false,
        error: '',
        data: null
    })

    function handleDelete(id: number) {
        setAtualiza(false)
        Swal.fire({
            title: "Tem certeza?",
            text: "Você não poderá reverter isso!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, apague!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Excluído!",
                    text: "Seu registro foi excluído.",
                    icon: "success"
                }).then(() => {
                    deleteMovimento(id).then(() => {
                        setAtualiza(true);
                        setIdAcao(null)
                        setName("")
                        setValor("")
                        setVencimento("")
                        setTipo("Receita")
                    });
                });
            }
        });

    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {

        const input = e.target.value;
        const formatted = formatMoneyInput(input);
        setValor(formatted);
    }

    function handleId(value: number) {
        setIdAcao(value);
    }

    function handleCloe() {
        setIsOpen(false);

    }


    React.useEffect(() => {
        async function loadingCategorias() {
            const {data} = await getMovimento(pesquisa);
            setMovimentos(data);

        }

        loadingCategorias();
    }, [atualiza, pesquisa, state])

    React.useEffect(() => {
        async function loadingCategorias() {
            const {data} = await getCategorias(pesquisa);
            setCategorias(data);
        }

        loadingCategorias();
    }, [pesquisa])


    // Função para desmarcar a linha ativa ao clicar fora
    function handleOutsideClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        // Verifica se o clique foi fora da tabela
        if (!target.closest(`.${styles.table}`) && !target.closest('.acoesTable') &&
            target.closest(`.${styles.overlay}`)) {
            setIdAcao(null);

        }
    }

    // Função para detectar a tecla Esc
    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            setIdAcao(null);


        }
    }


    React.useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        document.addEventListener('keydown', handleKeyDown);


        return () => {
            document.removeEventListener('click', handleOutsideClick);
            document.removeEventListener('keydown', handleKeyDown);

        };
    }, []);


    React.useEffect(() => {

        if (state.ok) {

            Swal.fire({
                title: "Criado com sucesso",
                icon: "success",
                draggable: true
            }).then(() => {
                setIsOpen(false);
                setName("")
                setValor("")
                setVencimento("")
                setTipo("Receita")
                setCategoria("")
            })

        }


    }, [state])

    return (
        <>
            <div className="acoesTable">

                <div className="acoes">
                    {
                        idAcao ?
                            <div className="opcoesAcoes">
                                <Link href="#" onClick={() => handleDelete(idAcao)}
                                      className="btnAcoes restricao"></Link>
                            </div>
                            :
                            <Link href="#" className="btnPadrao" onClick={() => setIsOpen(true)}>Novo</Link>

                    }

                </div>
            </div>
            <section className={`conteiner`}>

                <div className={styles.filtro}>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.pesquisar}
                            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
                                setPesquisa(e.currentTarget.value)
                            }
                            placeholder=" "
                            required={false}

                        />
                        <label>pesquisar</label>
                    </div>
                </div>

                <div className={styles.tableContainer}>

                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>Referencia</th>
                            <th>Tipo</th>
                            <th>Valor</th>
                            <th>Categoria</th>
                            <th>Vencimento</th>
                            <th>Status</th>


                        </tr>
                        </thead>
                        <tbody>

                        {movimentos?.map((item: IMovimento) =>
                            <tr key={Number(item.id)} onClick={() => handleId(Number(item.id))}
                                className={idAcao === Number(item.id) ? 'active' : ''}>
                                <td>{item.name}</td>
                                <td>{item.type_moviment}</td>
                                <td>{formatMoneyInput(item.valor)}</td>
                                <td>{item.Category?.name}</td>
                                <td>{ formatDate(item.date_venciment) }</td>
                                <td><span className="pendente">{item.status}</span></td>



                            </tr>
                        )}


                        </tbody>
                    </table>
                    {/* <div className={styles.pagination}>
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Anterior
                        </button>

                         Reticências no início
                        {adjustedStartPage > 1 && (
                            <>
                                <button onClick={() => setCurrentPage(1)}>1</button>
                                {adjustedStartPage > 2 && <span className={styles.dots}>...</span>}
                            </>
                        )}

                         Páginas Dinâmicas
                        {pageNumbers.map((number) => (
                            <button
                                key={number}
                                className={currentPage === number ? styles.activePage : ''}
                                onClick={() => setCurrentPage(number)}
                            >
                                {number}
                            </button>
                        ))}

                         Reticências no final
                        {endPage < lastPage && (
                            <>
                                {endPage < lastPage - 1 && <span className={styles.dots}>...</span>}
                                <button onClick={() => setCurrentPage(lastPage)}>{lastPage}</button>
                            </>
                        )}

                        <button
                            onClick={() => setCurrentPage((p) => Math.min(p + 1, lastPage))}
                            disabled={currentPage === lastPage}
                        >
                            Próxima
                        </button>
                    </div>*/}

                </div>
            </section>
            <div>

                <ModalModern isOpen={isOpen} onClose={handleCloe}>
                    <form action={action} className={styles.form}>
                        <h2>Novo movimento</h2>
                        <br/>
                        <div className={styles.formGroup}>
                            <select
                                name="type_moviment"
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                                required>
                                <option value="RECEITA">Receita</option>
                                <option value="DESPESAS">Despesas</option>
                            </select>
                            <label>Tipo</label>
                        </div>

                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder=" "
                                required={true}
                            />
                            <label>Referencia</label>
                        </div>
                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                name="valor"
                                value={valor}
                                onChange={handleChange}
                                placeholder=" "
                                required={true}
                            />
                            <label>Valor</label>
                        </div>

                        <div className={styles.formGroup}>
                            <select
                                name="category_id"
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                                required>
                                <option value="" disabled hidden>Preferencia de pagamento</option>
                                {
                                    categorias.map((item: ICategoria) =>

                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    )
                                }
                            </select>
                            <label>Preferencia</label>
                        </div>

                        <div className={styles.formGroup}>
                            <input
                                type="date"
                                name="date_venciment"
                                value={vencimento}
                                onChange={e => setVencimento(e.target.value)}
                                placeholder=" "
                                required={true}
                            />
                            <label>Vencimento</label>
                        </div>


                        <button className={`btnPadrao ${styles.btnModal}`}>Salvar</button>
                    </form>
                </ModalModern>

            </div>
        </>

    )
}