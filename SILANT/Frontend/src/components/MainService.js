import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../index.js";

import "../stylse/MainServis.css"

function MainService() {
    const { store } = useContext(Context);

    return (
        <div className="service">
            <h1>Контент Main</h1>


            <img className="service-banner"  alt="Баннер в блоке Сервис"/>
        </div>
    );

}

export default observer(MainService);