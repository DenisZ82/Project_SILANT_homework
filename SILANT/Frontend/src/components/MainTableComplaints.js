import React, { useState, useContext, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { observer } from "mobx-react-lite";

import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';

import { Context } from "../index.js";
import { API_URL } from "../http/index_http.js";

import "../stylse/Main.css";

function MainTableComplaints() {
    const { store } = useContext(Context);
    const [complaints, setComplaints] = useState([]);

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
                accessorKey: "date_machine_failure",
                header: "Дата отказа",
            },
            {
                accessorKey: "operating_time",
                header: "Наработка, м/час",
            },
            {
                accessorKey: "machine_failure_node",
                header: "Узел отказа",
            },
            {
                accessorKey: "description_machine_failure",
                header: "Описание отказа",
            },
            {
                accessorKey: "method_restoring",
                header: "Способ восстановления",
            },
            {
                accessorKey: "used_spare_parts",
                header: "Используемые запасные части",
            },
            {
                accessorKey: "date_restoration",
                header: "Дата восстановления",
            },
            {
                accessorKey: "machine_downtime",
                header: "Время простоя техники, дней",
            },
        ],
        []
      );

    const dataComplaints = async () => {
        try {
            const response = await axios.get(`${API_URL}/complaints/`);
            console.log('Complaints data: ', response.data);
            // console.log('store.isUser.group_name: ', store.isUser.group_name);

            let userData = null;
            if (store.isUser.group_name.includes('clients')) {
                userData = response.data.filter(
                    user => user.client.user_id === store.isUser.pk
                );
                // console.log('Рекламации: данные для клиента получены');
            } else if(store.isUser.group_name.includes('service')) {
                userData = response.data.filter(
                    user => user.service_company.user_id === store.isUser.pk
                );
                // console.log('Рекламации: данные для сервисной компании получены');
            } else {
                userData = response.data;
                // console.log('Рекламации: данные для менеджера получены');
            }

            setComplaints(userData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect (() => {
        dataComplaints();
    }, []);

    // const table = useMaterialReactTable({
    //     columns: columns || [],
    //     data: machines || [],
    //   });

    return (
        <>
            <div className="material-react-table">
                <MaterialReactTable 
                data={complaints} 
                columns={columns} 
                initialState={{ 
                    sorting: [{ id: 'date_machine_failure', desc: false }, ],
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

export default observer(MainTableComplaints);