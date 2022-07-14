import React from 'react';
import Search from "./Search";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import {BrowserRouter, Routes, Route,} from "react-router-dom";
import User from "./User";
import Header from "./Header";
import Repo from "./Repo";

function App() {
    return (
        <BrowserRouter>
            <div className="container py-2 px-5">
                <Header />
                <Routes>
                    <Route path="/" element={<Search />}/>
                    <Route path="/users/:id" element={<User />}/>
                    <Route path="/users/:id/repos/:name" element={<Repo />}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;
