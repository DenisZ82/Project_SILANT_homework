import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Context } from "../index.js";
import $api from "../http/index_http.js";
import DeviceDetect from "./DeviceDetect.js";

import "../stylse/Header.css";
import header_avatar from "../images/header_avatar.svg";
import rotation_animate from "../images/rotation_animate.svg"
import mobile_menu from "../images/mobile_menu.svg"

function Header() {
    const {store} = useContext(Context);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const { isMobile } = DeviceDetect();


    // useEffect(() => {
    //     // '/info'     '/user/'
    //     if (store.isAuth) {
    //         $api.get('/info').then(res => {
    //             setUser(res.data.eventFiltersInfo);
    //             console.log(res.data.eventFiltersInfo);
    //             setTimeout(() => {
    //                 setLoading(false);
    //             }, 1000);
    //         })
    //     }
    // }, [store.isAuth]);

    return (
        <header className="header">
            <img className="header-img" alt="Логотип"/>
            { !isMobile ? 
            <nav className="header-nav">
                <ul className="header-ul">
                    <li><a href="/">Главная</a></li>
                    <li><a href="#">Тарифы</a></li>
                    <li><a href="#">FAQ</a></li>
                </ul>
            </nav> : 
            <div></div>
            }

            { !store.isAuth ? 
                (!isMobile ?
                (<div className="header-reg">
                    <div className="header-register"><a href="#">Зарегистрироваться</a></div>
                    <div className="header-line"></div>
                    <Link to={"/auth"}>
                        <button className="header-but">Войти</button>
                    </Link>
                </div>) : <img className="mobile-menu" src={mobile_menu} />) : 

                <div className="header-logged">
                    <div className="header-limit">
                        { loading ? 
                            <img className="rotation_small" src={ rotation_animate }/> : 
                            <><div className="limit-used">Username пользователя: 
                                <span>username</span></div>
                            <div className="limit-available">Название компании: 
                                <span>Компания ООО</span></div>
                            <div className="limit-available">Группа пользователей: 
                                <span>Название группы</span></div></>
                        }
                    </div>
                    { !isMobile ? 
                    (<div className="header-user">
                        <div>
                            <div className="header-username">Алексей А.</div>
                            <Link to={'/'} className="header-logout" onClick={() => store.logout()} >
                                Выйти
                            </Link>
                        </div>
                        <img src={ header_avatar }/>
                    </div>) : <img className="mobile-menu" src={mobile_menu} />
                    }
                </div>
            }
        </header>
    );
}

export default observer(Header);