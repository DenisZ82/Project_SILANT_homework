import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { observer } from "mobx-react-lite";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Main from "./Main.jsx";
import AuthForm from "./AuthForm.jsx";
import Reference from "./Reference.jsx"

import { Context } from "../index.jsx";
import "../stylse/App.css";


function App() {
    const { store } = useContext(Context);

    return(
        <>
            <Header />
            <>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/auth" element={<AuthForm />} />
                    <Route path="/" element={<Main />} />
                    <Route path="/reference/:id" element={<Reference />} />
                </Routes>
            </>
            <Footer />
        </>

    );
}

export default observer(App);