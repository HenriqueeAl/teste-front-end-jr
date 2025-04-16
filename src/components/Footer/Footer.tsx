import './Footer.scss'

export const Footer = ()=>{
    return (
        <footer className="footer">
            <div className='content'>
                <div className='footer_top'>
                    <div className='footer_left'>
                        <div className='footer_about'>
                            <h5>Sobre nós</h5>
                            <p>CONHEÇA</p>
                            <p>COMO COMPRAR</p>
                            <p>INDICAÇÃO E DESCONTO</p>
                            <div className='footer_redes'>
                                <div className='footer_imgbox'>
                                    <img src="./footer/face.png" alt="facebook" />
                                </div>
                                <div className='footer_imgbox'>
                                    <img src="./footer/insta.png" alt="instagram" />
                                </div>
                                <div className='footer_imgbox'>
                                    <img src="./footer/yout.png" alt="youtube" />
                                </div>
                            </div>
                        </div>
                        <div className='footer_infos'>
                            <h5>INFORMAÇÕES ÚTEIS</h5>
                            <p>FALE CONOSCO</p>
                            <p>DÚVIDAS</p>
                            <p>PRAZOS DE ENTREGA</p>
                            <p>FORMAS DE PAGAMENTOS</p>
                            <p>POLÍTICA DE PRIVACIDADE</p>
                            <p>TROCAS E DEVOLUÇÕES</p>
                        </div>
                        <div className='footer_pays'>
                            <h5>FORMAS DE PAGAMENTO</h5>
                            <div className='footer_flags'>
                                <img src="./footer/visa.png" alt="visa"/>
                                <img src="./footer/elo.png" alt="visa"/>
                                <img src="./footer/alelo.png" alt="visa"/>
                                <img src="./footer/dinners.png" alt="visa"/>
                                <img src="./footer/ifood.png" alt="visa"/>
                                <img src="./footer/mastercard.png" alt="visa"/>
                                <img src="./footer/pix.png" alt="visa"/>
                                <img src="./footer/amex.png" alt="visa"/>
                                <img src="./footer/ticket.png" alt="visa"/>
                                <img src="./footer/sodexo.png" alt="visa"/>
                            </div>
                        </div>
                    </div>
                    <div className='footer_register'>
                        <h5>CADASTRE-SE E RECEBA NOSSAS <strong>NOVIDADES E PROMOÇÕES</strong></h5>
                        <p>Excepteur sint occaecat cudatat non ent, sunt in culpa qui officia lorem ipsum</p>
                        <form>
                            <input type="text" placeholder='SEU E-MAIL'/>
                            <button>OK</button>
                        </form>
                    </div>
                </div>
                <div className='footer_bottom'>
                    <div className='content'>
                        <p>
                            COPYRIGHT © 2019. TODOS OS DIREITOS RESERVADOS. TODAS AS MARCAS E SUAS IMAGENS
                            SÃO DE PROPRIEDADE DE SEUS RESPECTIVOS DONOS. É VEDADA A REPRODUÇÃO, TOTAL OU PARCIAL,
                            DE QUALQUER CONTEÚDO SEM EXPRESSA AUTORIZAÇÃO
                        </p>
                        <div className='logos'>
                            <img src="https://imgs.search.brave.com/vNdkOvO7WR__rvpRasDuNX-tP8QtSvxxPNviF3wByGc/rs:fit:860:0:0:0/g:ce/aHR0cDovL3RyYXlj/b3JwLmtpbmdob3N0/Lm5ldC93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMy8xMS93YWtl/LWNvbW1lcmNlLWFw/bGljYWNhby1mdW5k/by1wcmV0by1lbS10/b25zLWRlLWNpbnph/LnBuZw" alt="econverse" />
                            <img src="./footer/vtex.png" alt="vtex" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}