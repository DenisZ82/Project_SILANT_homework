import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Context } from "../index.js";
import axios from 'axios';
import $api from "../http/index_http.js";
import { API_URL } from "../http/index_http.js";
import DeviceDetect from "./DeviceDetect.js";

import "../stylse/Header.css";
import header_logo from "../images/logo.svg"
import rotation_animate from "../images/rotation_animate.svg"
import mobile_menu from "../images/mobile_menu.svg"
import telegram_dark_blue from "../images/telegram_dark_blue.svg"


function Header() {
    const {store} = useContext(Context);
    const [user, setUser] = useState({});
    const [errorDataUser, setErrorDataUser] = useState(false);
    const [loading, setLoading] = useState(true);
    const { isMobile } = DeviceDetect();

    useEffect(() => {
        if (store.isAuth) {
            console.log('store.isUser: ', store.isUser)
            console.log('store.isAuth: ', store.isAuth)
        }
    }, [store.isAuth])

    const dataUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`${API_URL}/auth/user/`, config);
            console.log('Header response.data: ', response.data);
            setUser(response.data);
        } catch (error) {
            console.log(error);
            if (error.response.status == 401) {
                setErrorDataUser(true);
                alert(`Авторизуйтесь повторно`);
            } else {
                setErrorDataUser(false);
                alert(`Авторизация прошла успешно`);
            }
        }
    }

    useEffect(() => {
        if (store.isAuth) {
            dataUser();
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [store.isAuth]);

    return (
        <header className="header">
            <div className="header-title">
            <a href="/"><img className="header-img" src={header_logo} alt="Логотип"/></a>
            <div className="title-txt">Электронная сервисная книжка "Мой Силант"</div>
            </div>
            { !isMobile ? 
            <div className="header-contact">
                <div>+7-8352-20-12-09, <a href="https://t.me/Silant_chzsa">Telegram</a></div>
                <a href="https://t.me/Silant_chzsa"><img src={telegram_dark_blue} alt="Телеграм"/></a>
            </div> : 
            <div></div>
            }

            { !store.isAuth || errorDataUser ? 
                (!isMobile ?
                (<div className="header-auth">
                    <Link to={"/auth"}>
                        <button className="header-but">Авторизация</button>
                    </Link>
                </div>) : <img className="mobile-menu" src={mobile_menu} />) : 
                <div className="header-logged">
                    <div className="header-user">
                        { loading ? 
                            (<div className="rotation-div">
                                <img className="rotation-small" src={ rotation_animate }/>
                            </div>) : 
                            <>
                            { user.client || user.service ? 
                                <div className="available">Компания: 
                                <span>{user.client ? user.client : user.service}</span></div> :
                                null
                            }
                            { user.client || user.service || user.group_name.includes('managers') ? 
                                <div className="available">Группа: 
                                <span>{user.group_name}</span></div> :
                                null
                            }
                            </>
                        }
                    </div>
                    { !isMobile ? 
                    (<div className="header-username">
                        <div className="username"><span>{user.username}</span></div>
                            {/* <div className="header-username">User id: {store.isUser.pk}</div> */}
                            <Link to={'/'} onClick={() => store.logout()} >
                                <button className="header-logout">Выход</button>
                            </Link>
                    </div>) : 
                    <img className="mobile-menu" src={mobile_menu} />
                    }
                </div>
            }
        </header>
    );
}

export default observer(Header);