import React, { useState, useContext, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { observer } from "mobx-react-lite";

import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';

import { Context } from "../index.js";
import { API_URL } from "../http/index_http.js";

import "../stylse/Main.css";

function MainTableMaintenance() {
    const { store } = useContext(Context);
    const [maintenance, setMaintenance] = useState([]);

    // определение столбцов для библиотеки material-react-table
    const columns = useMemo(
        () => [
            {
                accessorKey: "machine_factory_number",
                header: "Зав. № машины",
            },
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
                accessorKey: "type_maintenance_name",
                header: "Вид ТО",
            },
            {
                accessorKey: "date_maintenance",
                header: "Дата проведения ТО",
                // minSize: 100,
                // maxSize: 350,
                // size: 290,
            },
            {
                accessorKey: "operating_time",
                header: "Наработка, м/час",
            },
            {
                accessorKey: "order_number",
                header: "№ заказ-наряда",
            },
            {
                accessorKey: "order_date",
                header: "Дата заказ-наряда",
            },
            {
                accessorKey: "organization_maintenance",
                header: "Организация, проводившая ТО",
            },
            {
                accessorKey: "service_company.name_company",
                header: "Сервисная компания",
            },
        ],
        []
      );

    const dataMaintenance = async () => {
        try {
            const response = await axios.get(`${API_URL}/maintenance/`);
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

    // const table = useMaterialReactTable({
    //     columns: columns || [],
    //     data: machines || [],
    //   });

    return (
        <>
            <div className="material-react-table">
                <MaterialReactTable 
                data={maintenance} 
                columns={columns} 
                initialState={{ 
                    sorting: [{ id: 'date_maintenance', desc: false }, ],
                    showColumnFilters: true,
                    showGlobalFilter: true,
                }}
                localization={MRT_Localization_RU}
                positionGlobalFilter="left"
                globalFilterFn="contains"
                muiSearchTextFieldProps={{
                    placeholder: `Поисковый запрос`,
                    sx: { minWidth: '150px' },
                    variant: 'outlined',
                }}
                enableStickyHeader
                muiTableContainerProps={{ sx: { maxHeight: '600px' } }}
                muiTableHeadCellProps={{ sx: {fontSize:'17,5px',}, }}
                muiTableBodyCellProps={{
                    sx: {fontSize:'17,5px', borderRight:'1px solid #163E6C',},
                }}
                />
            </div>
        </>
    );

}

export default observer(MainTableMaintenance);