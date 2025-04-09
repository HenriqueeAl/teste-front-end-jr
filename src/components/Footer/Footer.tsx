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
                                <img src="./footer/elo.png" alt="elo"/>
                                <img src="./footer/alelo.png" alt="alelo"/>
                                <img src="./footer/dinners.png" alt="dinners"/>
                                <img src="./footer/ifood.png" alt="ifood"/>
                                <img src="./footer/mastercard.png" alt="mastercard"/>
                                <img src="./footer/pix.png" alt="pix"/>
                                <img src="./footer/amex.png" alt="amex"/>
                                <img src="./footer/ticket.png" alt="ticket"/>
                                <img src="./footer/sodexo.png" alt="sodexo"/>
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
                <div className='footer_testimonials'>
                    <h5>O que dizem nossos clientes</h5>
                    <div className='testimonials_container'>
                         <div className='testimonial_item'>
                             <p>"Amei a experiência de compra! Produtos de ótima qualidade e entrega super rápida."</p>
                             <span>- Joana S.</span>
                         </div>
                         {/* Adicione mais depoimentos conforme necessário */}
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
                            <img src="./footer/econverse.png" alt="econverse" />
                            <img src="./footer/vtex.png" alt="vtex" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}