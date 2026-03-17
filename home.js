import React from "react";
import './App.css';

function Home() {
    return (
        <div className="home-container">
            <div className="home-heading">
                <h1>SPENTRA</h1>
                <h2>EXPENDITURE MONITORING</h2>
                <center>
                <h5>Welcome to Spentra – Your Easy and Efficient Expense Tracker!</h5>
                </center>
                           
            </div>
            

            <div className="home-features">
                <img src="home1.png" alt="Expense Tracking" />
                <img src="home2.png" alt="Budget Management" />
                <img src="home3.png" alt="Expense Analytics" />
            </div>

            <p>Spentra is a user-friendly platform that helps you monitor and manage your daily expenses effortlessly. Track what you spend, where you spend it, and how you can save for the future.</p>
        </div>
    );
}

export default Home;