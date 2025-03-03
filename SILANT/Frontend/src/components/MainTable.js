import React, { useState, useMemo, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { observer } from "mobx-react-lite";

import { MaterialReactTable, } from 'material-react-table';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';
import { ThemeProvider } from '@mui/material/styles';

import { Context } from "../index.js";
import { API_URL } from "../http/index_http.js";
import DeviceDetect from "./DeviceDetect.js";

import theme from "./Theme.js";
import "../stylse/Main.css";

function MainTable() {
    const { store } = useContext(Context);
    const [machines, setMachines] = useState([]);
    const { fontSizeTable } = DeviceDetect();

    // определение столбцов для библиотеки material-react-table
    const columns = useMemo(
        () => [
            {
                accessorKey: "machine_model.name",
                header: "Модель техники",
                Cell: ({ row }) => (
                  <Link to={`/reference/${row.original.machine_model.id}`}>
                    {row.original.machine_model.name}
                  </Link>
                ),
            },
            {
                accessorKey: "factory_number",
                header: "Зав. № машины",
            },
            {
                accessorKey: "engine_model.name",
                header: "Модель двигателя",
                Cell: ({ row }) => (
                  <Link to={`/reference/${row.original.engine_model.id}`}>
                    {row.original.engine_model.name}
                  </Link>
                ),
            },
            {
                accessorKey: "engine_factory_num",
                header: "Зав. № двигателя",
            },
            {
                accessorKey: "transmission_model.name",
                header: "Модель трансмиссии",
                Cell: ({ row }) => (
                  <Link to={`/reference/${row.original.transmission_model.id}`}>
                    {row.original.transmission_model.name}
                  </Link>
                ),
            },
            {
                accessorKey: "factory_num_transmission",
                header: "Зав. № трансмиссии",
            },
            {
                accessorKey: "drive_axle_model.name",
                header: "Модель ведущего моста",
                Cell: ({ row }) => (
                  <Link to={`/reference/${row.original.drive_axle_model.id}`}>
                    {row.original.drive_axle_model.name}
                  </Link>
                ),
            },
            {
                accessorKey: "factory_num_drive_axle",
                header: "Зав. № ведущего моста",
            },
            {
                accessorKey: "guiding_bridge_model.name",
                header: "Модель управляемого моста",
                Cell: ({ row }) => (
                  <Link to={`/reference/${row.original.guiding_bridge_model.id}`}>
                    {row.original.guiding_bridge_model.name}
                  </Link>
                ),
            },
            {
                accessorKey: "factory_num_guiding_bridge",
                header: "Зав. № управляемого моста",
            },
          ],
          []
        );

    const data = async () => {
        try {
            const response = await axios.get(`${API_URL}/machines/`);
            console.log('response.data: ', response.data);
            setMachines(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect (() => {
        data();
    }, []);

    return (
        <div className={!store.isAuth ? "main-table" : "main-table-isAuth"}>
            <h1 className="main-table-title">
                Проверьте комплектацию и технические характеристики техники Силант.
            </h1>
            <p className="main-table-note">
                Введите поисковый запрос в поле таблицы. Например, заводской номер машины.
            </p>

            <div className="material-react-table">
            <ThemeProvider theme={theme}>
                <MaterialReactTable 
                data={machines} 
                columns={columns} 
                initialState={{ 
                    // sorting - сортировка указанного поля по умолчанию
                    sorting: [{ id: 'machine_model.name', desc: false }, ],
                    showColumnFilters: true,
                    showGlobalFilter: true,
                }}
                localization={MRT_Localization_RU}
                positionGlobalFilter="right"
                globalFilterFn="contains"
                muiSearchTextFieldProps={{
                    placeholder: `Поисковый запрос`,
                    sx: { minWidth: '200px' },
                    variant: 'outlined',
                }}
                enableStickyHeader
                muiTableContainerProps={{ sx: { maxHeight: '600px' } }}
                muiTableHeadCellProps={{ sx: {fontSize: fontSizeTable,}, }}
                muiTableBodyCellProps={{
                    sx: {fontSize: fontSizeTable, borderRight:'1px solid #163E6C',},
                }}
                />
            </ThemeProvider>
            </div>
        </div>
    );
}

export default observer(MainTable);