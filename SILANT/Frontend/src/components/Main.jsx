import React, { useState, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index.jsx";

import MainTable from "./MainTable.jsx";
import MainTableAuth from "./MainTableAuth.jsx";
import "../stylse/Main.css"

function Main() {
    const { store } = useContext(Context);
    const [ showTable, useShowTable ] = useState(true);

        useEffect(() => {
            if (store.isAuth) {
                useShowTable(false)
            }
        }, [store.isAuth]);

        const showMainTable = () => {
            useShowTable(true);
        };

        const hideMainTable = () => {
            useShowTable(false);
        };

    return (
        <main>
            {store.isAuth ? <MainTableAuth /> : null}

            {
                !store.isAuth ? 
                <MainTable /> : showTable ? 
                (<>
                <button className="main-table-but" onClick={hideMainTable}>Скрыть таблицу всей техники</button>
                <MainTable />
                <button className="main-table-but" onClick={hideMainTable}>Скрыть таблицу всей техники</button>
                </>) :
                <button className="main-table-but" onClick={showMainTable}>Показать всю технику Силант</button>
            }
        </main>
    );
}

export default observer(Main);