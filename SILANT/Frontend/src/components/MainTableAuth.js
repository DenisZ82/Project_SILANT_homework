import React, { useState, useContext, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { observer } from "mobx-react-lite";
import Table from 'react-bootstrap/Table';

import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';

import { Context } from "../index.js";
import { API_URL } from "../http/index_http.js";

import "../stylse/Main.css"

function MainTableAuth() {
    const { store } = useContext(Context);
    const [machines, setMachines] = useState([]);

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
          {
              accessorKey: "delivery_agreement",
              header: "Договор поставки №, дата",
          },
          {
              accessorKey: "date_shipment_factory",
              header: "Дата отгрузки с завода",
          },
          {
              accessorKey: "consignee",
              header: "Грузополучатель",
          },
          {
              accessorKey: "shipping_address",
              header: "Адрес поставки",
          },
          {
              accessorKey: "equipment",
              header: "Комплектация",
          },
          {
              accessorKey: "client.name_company",
              header: "Клиент",
          },
          {
              accessorKey: "service_company.name_company",
              header: "Сервисная компания",
          },
        ],
        []
      );

    const dataMachines = async () => {
        try {
            const response = await axios.get(`${API_URL}/machines/`);
            console.log('response.data: ', response.data);
            console.log('store.isUser.group_name: ', store.isUser.group_name);

            let userData = null;
            if (store.isUser.group_name.includes('clients')) {
                userData = response.data.filter(
                    user => user.client.user_id === store.isUser.pk
                );
                console.log('Данные клиента получены');
            } else if(store.isUser.group_name.includes('service')) {
                userData = response.data.filter(
                    user => user.service_company.user_id === store.isUser.pk
                );
                console.log('Данные сервисной компании получены');
            } else {
                userData = response.data;
                console.log('Данные для менеджера получены');
            }

            setMachines(userData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect (() => {
        dataMachines();
    }, []);

    // const columns = useMemo(
    //   () => [
    //     {
    //         accessorKey: "machine_model.name",
    //         header: "Модель техники",
    //     },
    //     {
    //         accessorKey: "factory_number",
    //         header: "Зав. № машины",
    //     },
    //     {
    //         accessorKey: "engine_model.name",
    //         header: "Модель двигателя",
    //     },
    //     {
    //         accessorKey: "engine_factory_num",
    //         header: "Зав. № двигателя",
    //     },
    //     {
    //         accessorKey: "transmission_model.name",
    //         header: "Модель трансмиссии",
    //     },
    //     {
    //         accessorKey: "factory_num_transmission",
    //         header: "Зав. № трансмиссии",
    //     },
    //     {
    //         accessorKey: "drive_axle_model.name",
    //         header: "Модель ведущего моста",
    //     },
    //     {
    //         accessorKey: "factory_num_drive_axle",
    //         header: "Зав. № ведущего моста",
    //     },
    //     {
    //         accessorKey: "guiding_bridge_model.name",
    //         header: "Модель управляемого моста",
    //     },
    //     {
    //         accessorKey: "factory_num_guiding_bridge",
    //         header: "Зав. № управляемого моста",
    //     },
    //     {
    //         accessorKey: "delivery_agreement",
    //         header: "Договор поставки №, дата",
    //     },
    //     {
    //         accessorKey: "date_shipment_factory",
    //         header: "Дата отгрузки с завода",
    //     },
    //     {
    //         accessorKey: "consignee",
    //         header: "Грузополучатель",
    //     },
    //     {
    //         accessorKey: "shipping_address",
    //         header: "Адрес поставки",
    //     },
    //     {
    //         accessorKey: "equipment",
    //         header: "Комплектация",
    //     },
    //     {
    //         accessorKey: "client.name_company",
    //         header: "Клиент",
    //     },
    //     {
    //         accessorKey: "service_company.name_company",
    //         header: "Сервисная компания",
    //     },
    //   ],
    //   []
    // );

    console.log(columns);
    console.log("Columns:", Array.isArray(columns));

    // const table = useMaterialReactTable({
    //     columns: columns || [],
    //     data: machines || [],
    //   });

    return (
        <div className="main-table">
            <h1 className="main-table-title">
                Проверьте комплектацию и технические характеристики техники Силант
            </h1>
            <div className="block-search"> </div>
            <Table striped bordered hover className="data-table">
                <thead>
                    <tr>
                        <th>Модель техники</th>
                        <th>Зав. № машины</th>
                        <th>Модель двигателя</th>
                        <th>Зав. № двигателя</th>
                        <th>Модель трансмиссии</th>
                        <th>Зав. № трансмиссии</th>
                        <th>Модель ведущего моста</th>
                        <th>Зав. № ведущего моста</th>
                        <th>Модель управляемого <br/> моста</th>
                        <th>Зав. № управляемого <br/> моста</th>
                        <th>Договор поставки №, дата</th>
                        <th>Дата отгрузки с завода</th>
                        <th>Грузополучатель</th>
                        <th>Адрес поставки</th>
                        <th>Комплектация</th>
                        <th>Клиент</th>
                        <th>Сервисная компания</th>
                    </tr>
                </thead>
                <tbody>
                {machines.map(machine => (
                    <tr key={machine.id}>
                        <td><Link to={`/reference/${machine.machine_model.id}`}>
                            {machine.machine_model.name}
                        </Link></td>
                        <td>{machine.factory_number}</td>
                        <td><Link to={`/reference/${machine.engine_model.id}`}>
                            {machine.engine_model.name}
                        </Link></td>    
                        <td>{machine.engine_factory_num}</td>
                        <td><Link to={`/reference/${machine.transmission_model.id}`}>
                            {machine.transmission_model.name}
                        </Link></td>
                        <td>{machine.factory_num_transmission}</td>
                        <td><Link to={`/reference/${machine.drive_axle_model.id}`}>
                            {machine.drive_axle_model.name}
                        </Link></td>
                        <td>{machine.factory_num_drive_axle}</td>
                        <td><Link to={`/reference/${machine.guiding_bridge_model.id}`}>
                            {machine.guiding_bridge_model.name}
                        </Link></td>
                        <td>{machine.factory_num_guiding_bridge}</td>
                        <td>{machine.delivery_agreement}</td>
                        <td>{machine.date_shipment_factory}</td>
                        <td>{machine.consignee}</td>
                        <td>{machine.shipping_address}</td>
                        <td>{machine.equipment}</td>
                        <td>{machine.client.name_company}</td>
                        <td>{machine.service_company.name_company}</td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <div className="material-react-table">
                <MaterialReactTable 
                data={machines} 
                columns={columns} 
                localization={MRT_Localization_RU}
                />
            </div>


        </div>
    );

}

export default observer(MainTableAuth);