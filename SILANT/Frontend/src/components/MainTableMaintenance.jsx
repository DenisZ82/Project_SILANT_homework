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

function MainTableMaintenance() {
    const { store } = useContext(Context);
    const [maintenance, setMaintenance] = useState([]);
    const { fontSizeTable, layoutModeTable } = DeviceDetect();

    // определение столбцов для библиотеки material-react-table
    const columns = useMemo(
        () => [
            {
                accessorKey: "machine_factory_number",
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
                accessorKey: "type_maintenance_name",
                header: "Вид ТО",
                grow: true,
                size: 240,
            },
            {
                accessorKey: "date_maintenance",
                header: "Дата проведения ТО",
                grow: true,
                size: 240,
            },
            {
                accessorKey: "operating_time",
                header: "Наработка, м/час",
                grow: true,
                size: 240,
            },
            {
                accessorKey: "order_number",
                header: "№ заказ-наряда",
                grow: true,
                size: 240,
            },
            {
                accessorKey: "order_date",
                header: "Дата заказ-наряда",
                grow: true,
                size: 240,
            },
            {
                accessorKey: "organization_maintenance",
                header: "Организация, проводившая ТО",
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

    const dataMaintenance = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`${API_URL}/maintenance/`, config);
            console.log('Maintenance data: ', response.data);
            // console.log('store.isUser.group_name: ', store.isUser.group_name);

            let userData = null;
            if (store.isUser.group_name.includes('clients')) {
                userData = response.data.filter(
                    user => user.client.user_id === store.isUser.pk
                );
                // console.log('TO: данные для клиента получены');
            } else if(store.isUser.group_name.includes('service')) {
                userData = response.data.filter(
                    user => user.service_company.user_id === store.isUser.pk
                );
                // console.log('TO: данные для сервисной компании получены');
            } else {
                userData = response.data;
                // console.log('ТО: данные для менеджера получены');
            }

            setMaintenance(userData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect (() => {
        dataMaintenance();
    }, []);

    return (
        <>
            <div className="material-react-table">
            <ThemeProvider theme={theme}>
                <MaterialReactTable 
                data={maintenance} 
                columns={columns} 
                initialState={{ 
                    sorting: [{ id: 'date_maintenance', desc: false }, ],
                    columnPinning: { left: ['machine_factory_number'] },
                    pagination:{ pageSize: 50, },
                    showColumnFilters: true,
                    showGlobalFilter: true,
                }}
                localization={MRT_Localization_RU}
                positionGlobalFilter="right"
                globalFilterFn="contains"
                muiSearchTextFieldProps={{
                    placeholder: `Поисковый запрос`,
                    sx: { minWidth: '100px' },
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

export default observer(MainTableMaintenance);