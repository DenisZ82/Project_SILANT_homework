import React, { useState, useContext, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index.js";

// import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';

import MainTable from "./MainTable";
import MainTableAuth from "./MainTableAuth.js";
import "../stylse/Main.css"

function Main() {
    const { store } = useContext(Context);

    // const data = [
    //         {
    //           name: 'John',
    //           age: 30,
    //         },
    //         {
    //           name: 'Sara',
    //           age: 25,
    //         },
    //       ];
    
    // const columns = useMemo(
    //   () => [
    //     {
    //       accessorKey: "name", //simple recommended way to define a column
    //       header: "Name",
    //       muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
    //       Cell: ({ renderedCellValue }) => <strong>{renderedCellValue}</strong> //optional custom cell render
    //     },
    //     {
    //       accessorFn: (row) => row.age, //alternate way
    //       id: "age", //id required if you use accessorFn instead of accessorKey
    //       header: "Age",
    //       Header: <i style={{ color: "red" }}>Age</i> //optional custom markup
    //     }
    //   ],
    //   []
    // );

    // const table = useMaterialReactTable({
    //     data,
    //     columns
    // });

    return (
        <main>
            <div className="main-header">
                <h4>User id: <span>{store.isAuth ? store.isUser.pk : ""}</span></h4>
            </div>
            {store.isAuth ? <MainTableAuth /> : null}
            
            <MainTable />
            {/* <MaterialReactTable table={table} /> */}
        </main>
    );
}

export default observer(Main);