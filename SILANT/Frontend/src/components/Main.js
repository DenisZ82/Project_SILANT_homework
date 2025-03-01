import React, { useState, useContext, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index.js";

// import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';

import MainTable from "./MainTable";
import MainTableAuth from "./MainTableAuth.js";
import "../stylse/Main.css"

function Main() {
    const { store } = useContext(Context);

    return (
        <main>
            {store.isAuth ? <MainTableAuth /> : null}
            <MainTable />
        </main>
    );
}

export default observer(Main);