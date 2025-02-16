import React, { createContext } from "react";
import ReactDom from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from "./components/App";
import Store from "./store/store.js";

const store = new Store();

export const Context = createContext({ store });

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
    <Context.Provider value={{store}}>
        <BrowserRouter future={{ v7_startTransition: true, }}>
                <App />
        </BrowserRouter>
    </Context.Provider>
);