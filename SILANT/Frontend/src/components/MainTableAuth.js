import React, { useState, useContext, useEffect, useMemo } from "react";
// import { Link } from "react-router-dom";
// import axios from 'axios';
import { observer } from "mobx-react-lite";
import {Tabs , Tab} from 'react-bootstrap';
// import Table from 'react-bootstrap/Table';

// import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';
// import { MRT_Localization_RU } from 'material-react-table/locales/ru';

import { Context } from "../index.js";
// import { API_URL } from "../http/index_http.js";

import MainTableGeneral from "./MainTableGeneral.js";
import MainTableMaintenance from "./MainTableMaintenance.js";
import MainTableComplaints from "./MainTableComplaints.js";
import "../stylse/Main.css"

function MainTableAuth() {
    const [key , setKey] = useState ('general');
    const { store } = useContext(Context);
    // const [machines, setMachines] = useState([]);

    return (
        <div className="main-table">
            {store.isAuth ? 
                <div className="table-name-company">
                { store.isUser.client || store.isUser.service ? 
                    (<h4>
                        Вы вошли в систему как: <span>{store.isUser.client ? store.isUser.client : 
                        store.isUser.service}</span>
                    </h4>) : null
                }
                {store.isUser.client ? 
                    (<h4>
                        Ваша сервисная компания: <span>{store.isUser.assigned_service.join(', ')}</span>
                    </h4>) : null
                }
                </div> : 
                null
            }

            <h1 className="main-table-title">
                Информация о комплектации и технических характеристиках Вашей техники
            </h1>

            <Tabs
                id="controlled-tab-example"
                className="custom-tabs"
                activeKey={key}
                onSelect={(k) => {setKey(k)}}
            >
                <Tab eventKey="general" title="Общая информация">
                    {key === 'general' && <MainTableGeneral />}
                </Tab>
                <Tab eventKey="maintenance" title="ТО">
                    {key === 'maintenance' && <MainTableMaintenance />}
                </Tab>
                <Tab eventKey="complaints" title="Рекламации">
                    {key === 'complaints' && <MainTableComplaints />}
                </Tab>
            </Tabs>
        </div>
    );

}

export default observer(MainTableAuth);