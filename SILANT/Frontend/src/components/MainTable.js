import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { observer } from "mobx-react-lite";
import Table from 'react-bootstrap/Table';

import { Context } from "../index.js";
import { API_URL } from "../http/index_http.js";

import "../stylse/Main.css"

function MainTable() {
    const { store } = useContext(Context);
    const [machines, setMachines] = useState([]);

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
                    </tr>
                ))}
                </tbody>
            </Table>


        </div>
    );

}

export default observer(MainTable);