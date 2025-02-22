import React from "react";
import "../stylse/Footer.css"
import footer_logo from "../images/logo_footer.svg"
import telegram_white from "../images/telegram_white.svg"

function Footer() {
    return (
        <footer className="footer">
            <img className="footer-img" src={footer_logo} alt="Логотип"/>
            <div className="footer-contact">
                <div>+7-8352-20-12-09, <a href="https://t.me/Silant_chzsa">Telegram</a></div>
                <a href="https://t.me/Silant_chzsa"><img src={telegram_white} alt="Телеграм"/></a>
            </div>
            <div className="footer-info">
                <div className="copyright">© Мой Силант, 2022</div>
            </div>

        </footer>
    )
}

export default Footer;