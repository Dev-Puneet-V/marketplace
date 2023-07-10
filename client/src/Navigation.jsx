import React from "react";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import Home from './container/Home.jsx';
import "./App.css";

export default function Navigation() {

    return (
        <Router>

                <Routes>

                    <Route path="/" element={<Home />} />
                </Routes>

                <Outlet />

            <Outlet />
        </Router>
    );
}
