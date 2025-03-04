import React, { useState, useContext, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { observer } from "mobx-react-lite";

import { MaterialReactTable, } from 'material-react-table';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';
import { ThemeProvider } from '@mui/material/styles';

import { Context } from "../index.jsx";
import { API_URL } from "../http/index_http.js";
import DeviceDetect from "./DeviceDetect.jsx";

import theme from "./Theme.js";
import "../stylse/Main.css";

function MainTableGeneral() {
    const { store } = useContext(Context);
    const [machines, setMachines] = useState([]);
    const { fontSizeTable, layoutModeTable } = DeviceDetect();

    // определение столбцов для библиотеки material-react-table
    const columns = useMemo(
        () => [
            {
                accessorKey: "factory_number",
                header: "Зав. № машины",
                grow: false,
                size: 100,
            },
            {
                accessorKey: "machine_model.name",
                header: "Модель техники",
                Cell: ({ row }) => (
                  <Link to={`/reference/${row.original.machine_model.id}`}>
                    {row.original.machine_model.name}
                  </Link>
                ),
                grow: true,
                size: 240,
            },
            {
                accessorKey: "engine_model.name",
                header: "Модель двигателя",
                Cell: ({ row }) => (
                  <Link to={`/reference/${row.original.engine_model.id}`}>
                    {row.original.engine_model.name}
                  </Link>
                ),
                grow: true,
                size: 240,
            },
            {
                accessorKey: "engine_factory_num",
                header: "Зав. № двигателя",
                grow: true,
                size: 240,
            },
            {
                accessorKey: "transmission_model.name",
                header: "Модель трансмиссии",
                Cell: ({ row }) => (
                  <Link to={`/reference/${row.original.transmission_model.id}`}>
                    {row.original.transmission_model.name}
                  </Link>
                ),
                grow: true,
                size: 240,
            },
            {
                accessorKey: "factory_num_transmission",
                header: "Зав. № трансмиссии",
                grow: true,
                size: 240,
            },
            {
                accessorKey: "drive_axle_model.name",
                header: "Модель ведущего моста",
                Cell: ({ row }) => (
                  <Link to={`/reference/${row.original.drive_axle_model.id}`}>
                    {row.original.drive_axle_model.name}
                  </Link>
                ),
                grow: true,
                size: 240,
            },
            {
                accessorKey: "factory_num_drive_axle",
                header: "Зав. № ведущего моста",
                grow: true,
                size: 240,
            },
            {
                accessorKey: "guiding_bridge_model.name",
                header: "Модель управляемого моста",
                Cell: ({ row }) => (
                  <Link to={`/reference/${row.original.guiding_bridge_model.id}`}>
                    {row.original.guiding_bridge_model.name}
                  </Link>
                ),
                grow: true,
                size: 240,
            },
            {
                accessorKey: "factory_num_guiding_bridge",
                header: "Зав. № управляемого моста",
                grow: true,
                size: 240,
            },
            {
                accessorKey: "delivery_agreement",
                header: "Договор поставки №, дата",
                grow: true,
                size: 240,
            },
            {
                accessorKey: "date_shipment_factory",
                header: "Дата отгрузки с завода",
                grow: true,
                size: 240,
            },
            {
                accessorKey: "consignee",
                header: "Грузополучатель",
                grow: true,
                size: 240,
            },
            {
                accessorKey: "shipping_address",
                header: "Адрес поставки",
                grow: true,
                size: 240,
            },
            {
                accessorKey: "equipment",
                header: "Комплектация",
                grow: true,
                size: 240,
            },
            {
                accessorKey: "client.name_company",
                header: "Клиент",
                grow: true,
                size: 240,
            },
            {
                accessorKey: "service_company.name_company",
                header: "Сервисная компания",
                grow: true,
                size: 240,
            },
          ],
          []
        );

    const dataMachines = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`${API_URL}/machines/`, config);
            console.log('Machines data: ', response.data);
            // console.log('store.isUser.group_name: ', store.isUser.group_name);

            let userData = null;
            if (store.isUser.group_name.includes('clients')) {
                userData = response.data.filter(
                    user => user.client.user_id === store.isUser.pk
                );
                // console.log('Машины: данные для клиента получены');
            } else if(store.isUser.group_name.includes('service')) {
                userData = response.data.filter(
                    user => user.service_company.user_id === store.isUser.pk
                );
                // console.log('Машины: данные для сервисной компании получены');
            } else {
                userData = response.data;
                // console.log('Машины: данные для менеджера получены');
            }

            setMachines(userData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect (() => {
        dataMachines();
    }, []);

    // const table = useMaterialReactTable({
    //     columns: columns || [],
    //     data: machines || [],
    //   });

    return (
        <>
            <div className="material-react-table">
            <ThemeProvider theme={theme}>
                <MaterialReactTable 
                data={machines} 
                columns={columns} 
                initialState={{ 
                    sorting: [{ id: 'date_shipment_factory', desc: false }, ],
                    columnPinning: { left: ['factory_number'] },
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
                layoutMode={layoutModeTable}
                enableStickyHeader
                muiTableContainerProps={{ sx: { maxHeight: '600px' } }}
                muiTableHeadCellProps={{ sx: {fontSize: fontSizeTable,}, }}
                muiTableBodyCellProps={{
                    sx: {fontSize: fontSizeTable, borderRight:'1px solid #163E6C',},
                }}/>
            </ThemeProvider>
            </div>
        </>
    );

}

export default observer(MainTableGeneral);