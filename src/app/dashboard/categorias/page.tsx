'use client'
import styles from './clientes.module.css'
import React from "react";
import Link from "next/link";
import getCategorias, {ICategoria} from "@/actions/categorias/get-categorias";
import Swal from "sweetalert2";
import deleteCategoria from "@/actions/categorias/delete-categoria";


export default function PageLista() {
    const [categorias, setCategorias] = React.useState([]);
    const [idAcao, setIdAcao] = React.useState<number | null>(null);
    const [atualiza, setAtualiza] = React.useState(false);
    const [pesquisa, setPesquisa] = React.useState("");

3
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
                    deleteCategoria(id).then(() => {
                        setAtualiza(true);
                    });
                });
            }
        });

    }


    function handleId(value: number) {
        setIdAcao(value);
    }


    React.useEffect(() => {
        async function loadingCategorias() {
            const {data} = await getCategorias(pesquisa);
            setCategorias(data);

        }

        loadingCategorias();
    }, [atualiza, pesquisa])


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


    return (
        <>
            <div className="acoesTable">

                <div className="acoes">
                    {
                        idAcao ?
                            <div className="opcoesAcoes">

                                <Link href={`/dashboard/categorias/${idAcao}`}
                                      className="btnAcoes editar">
                                </Link>

                                <Link href="#" onClick={() => handleDelete(idAcao)}
                                      className="btnAcoes restricao"></Link>


                            </div>

                            :

                            <Link href="/dashboard/categorias/novo" className="btnPadrao ">Novo</Link>

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
                            <th>Categoria</th>


                        </tr>
                        </thead>
                        <tbody>

                        {categorias?.map((item: ICategoria) =>
                            <tr key={Number(item.id)} onClick={() => handleId(Number(item.id))}
                                className={idAcao === Number(item.id) ? 'active' : ''}>
                                <td>{item.name}</td>


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

            </div>
        </>

    )
}