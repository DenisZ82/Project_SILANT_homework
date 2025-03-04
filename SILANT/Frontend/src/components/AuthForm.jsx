import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { observer } from 'mobx-react-lite'

import { Context } from "../index.jsx";
import "../stylse/AuthForm.css"
import auth_lock from "../images/auth_lock.svg";

function AuthForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { store } = useContext(Context);

    return(
        <div className="auth">

            <div className="auth-block">
                <img className="auth-imglock" src={auth_lock}/>

                <div className="auth-form">

                    <form className="login-form">
                        <p>Логин:</p>
                        <input 
                            className="input-login" 
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            autoComplete={"username"}
                        />
                        <p>Пароль:</p>
                        <input
                            className="input-password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                    </form>

                    { username && password ? 
                        <Link to={"/"}>
                            <button
                                onClick={() => store.login(username, password)}
                                className={"login-but-active"}>
                                Войти
                            </button>
                        </Link> : 
                        <button className={"login-but"}>Войти</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default observer(AuthForm);