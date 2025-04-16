import './Categs.scss'

export const Categs = ()=>{
    return (
        <section className="categs">
            <nav className='content'>
                <ul>
                    <li><a href='#'>TODAS CATEGORIAS</a></li>
                    <li><a href='#'>SUPERMERCADO</a></li>
                    <li><a href='#'>LIVROS</a></li>
                    <li><a href='#'>MODA</a></li>
                    <li><a href='#'>LANÇAMENTOS</a></li>
                    <li><a href='#' className='select'>OFERTAS DO DIA</a></li>
                    <li><a href='#'><img src="/crow.png" alt="coroa"/>ASSINATURA</a></li>
                    <li><a href='#' className='suplementos'>SUPLEMENTOS</a></li>
                </ul>
            </nav>
        </section>
    )
}