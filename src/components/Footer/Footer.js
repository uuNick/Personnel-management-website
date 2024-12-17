import './Footer.css'
const vk = require("../../images/contacts/Vk.png");
const instagram = require("../../images/contacts/Instagram.png");
const youtube = require("../../images/contacts/YouTube.png");

const Footer = () => {

    return (
        <footer>
            <div className="footer">
                <div className="row">
                    <a href="https://vk.com/zenit.mogilev" target='blank'><img className='img_icon' src={vk} /></a>
                    <a href="https://www.instagram.com/zavod_zenit_mogilev/" target='blank'><img className="img_icon" src={instagram}></img></a>
                    <a href="https://www.youtube.com/channel/UCyjteIV7U0Pug6Q1ofa8irQ" target='blank'><img className="img_icon" src={youtube}></img></a>
                </div>
                <div className="row">
                    <a href="mailto:zenit@zenit.by">zenit@zenit.by</a>
                    <a href="tel:+375222738945">+375 (222) 73-89-45</a>
                    <a href="tel:+375222738961">+375 (222) 73-89-61</a>
                    <a href="https://github.com/uuNick" target='blank'>uuNick</a>
                </div>
                <div className="row">
                    Авторское право © 2024 ОАО "Зенит" - Все права защищены || Разработал: uuNick
                </div>
            </div>
        </footer>
    );
};

export default Footer