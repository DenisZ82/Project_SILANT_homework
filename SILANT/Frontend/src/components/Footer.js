import React from "react";
import "../stylse/Footer.css"

function Footer() {
    return (
        <footer className="footer">
            <img className="footer-img" alt="Логотип"/>
            <div className="footer-info">
                <div className="footer-address">
                    <p>г. Москва, Цветной б-р, 40</p>
                    <p>+7 495 771 21 11</p>
                    <p>info@skan.ru</p>
                </div>
                <div className="copyright">Copyright. 2022</div>
            </div>

        </footer>
    )
}

export default Footer;