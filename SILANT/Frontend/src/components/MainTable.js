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
            <h1>Контент Main</h1>
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
                        <td>{machine.machine_model.name}</td>
                        <td>{machine.factory_number}</td>
                        <td>{machine.engine_model.name}</td>
                        <td>{machine.engine_factory_num}</td>
                        <td>{machine.transmission_model.name}</td>
                        <td>{machine.factory_num_transmission}</td>
                        <td>{machine.drive_axle_model.name}</td>
                        <td>{machine.factory_num_drive_axle}</td>
                        <td>{machine.guiding_bridge_model.name}</td>
                        <td>{machine.factory_num_guiding_bridge}</td>
                    </tr>
                ))}
                </tbody>
            </Table>


        </div>
    );

}

export default observer(MainTable);