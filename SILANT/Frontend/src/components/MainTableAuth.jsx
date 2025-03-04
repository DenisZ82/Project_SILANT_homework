import React, { useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import {Tabs , Tab} from 'react-bootstrap';

import { Context } from "../index.jsx";
import MainTableGeneral from "./MainTableGeneral.jsx";
import MainTableMaintenance from "./MainTableMaintenance.jsx";
import MainTableComplaints from "./MainTableComplaints.jsx";
import "../stylse/Main.css"

function MainTableAuth() {
    const [key , setKey] = useState ('general');
    const { store } = useContext(Context);

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