import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { observer } from "mobx-react-lite";

import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import AuthForm from "./AuthForm";
// import Search from "./Search";
// import ResultsPage from "./ResultsPage.js";

import { Context } from "../index.js";
import "../stylse/App.css";


function App() {
    const { store } = useContext(Context);

    return(
        <>
            <Header />
            <div>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/auth" element={<AuthForm />} />
                    {/* { store.isAuth ? 
                        <Route path="/search" element={<Search />} /> : 
                        <Route path="/" element={<Main />} />
                    } */}
                    {/* { store.isAuth ? 
                        <Route path="/results" element={<ResultsPage />} /> : 
                        <Route path="/" element={<Main />} />
                    } */}
                    <Route path="/" element={<Main />} />
                </Routes>
            </div>
            <Footer />
        </>

    );
}

export default observer(App);