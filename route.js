import React from "react";
import Navi from "./navigation";
import Home from "./home";
import About from "./about";
import Login from "./login";
import Signup from "./signup";
import ExpenseForm from "./expense";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Approute() {
    return (
        <div className="content">
            <Router>
                <Navi />
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/expense" element={<ExpenseForm />} /> 
                </Routes>
            </Router>
        </div>
    );
}

export default Approute;
