import React, { use, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { observer } from 'mobx-react-lite'

import { Context } from "../index.js";
import "../stylse/AuthForm.css"

import auth_google from "../images/auth_google.svg";
import auth_facebook from "../images/auth_facebook.svg";
import auth_yandex from "../images/auth_yandex.svg";
import auth_lock from "../images/auth_lock.svg";

function AuthForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { store } = useContext(Context);

    return(
        <div className="auth">

            <div className="auth-block">
                <img className="auth-imglock" src={ auth_lock }/>

                <div className="auth-form">
                    <div className="auth-actions">
                        <div className="auth-login">Войти</div>
                        <div className="auth-register">Зарегистрироваться</div>
                    </div>

                    <form className="login-form">
                        <p>Логин или номер телефона:</p>
                        <input 
                            className="input-login" 
                            type="text"
                            value={ username }
                            onChange={ e => setUsername(e.target.value) }
                            autoComplete={"username"}
                        />
                        <p>Пароль:</p>
                        <input
                            className="input-password"
                            type="password"
                            value={ password }
                            onChange={ e => setPassword(e.target.value) }
                            autoComplete="current-password"
                        />
                    </form>

                    { username && password ? 
                        <Link to={"/"}>
                            <button
                                onClick={() => store.login(username, password)}
                                className={ "login-but-active" }>
                                Войти
                            </button>
                        </Link> : 
                        <button className={ "login-but" }>Войти</button>
                    }

                    <a className="auth-recover" href="#">Восстановить пароль</a>

                    <div className="auth-socialnet">
                        <p>Войти через</p>
                        <div className="networks">
                            <button><img src={ auth_google } /></button>
                            <button><img src={ auth_facebook } /></button>
                            <button><img src={ auth_yandex } /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(AuthForm);