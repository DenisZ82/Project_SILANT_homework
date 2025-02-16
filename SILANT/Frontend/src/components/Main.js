import React, { useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index.js";

import MainTable from "./MainTable";
import "../stylse/Main.css"

function Main() {
    const { store } = useContext(Context);

    return (
        <main>
            <div className="main-header">
                <h1>Проверьте комплектацию и технические характеристики техники Силант</h1>
                <h4>User id: <span>{store.isAuth ? store.isUser.pk : ""}</span></h4>
            </div>
            
            <MainTable />
        </main>
    );
}

export default observer(Main);