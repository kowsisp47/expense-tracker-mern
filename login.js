import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import "./App.css";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [serverMessage, setServerMessage] = useState("");
    const navigate = useNavigate();

    const validInput = () => {
        const errors = {};
        const emailValue = email.trim();
        const passwordValue = password.trim();

        if (emailValue === '') {
            errors.email = 'Email is Required';
        } else if (!isValidEmail(emailValue)) {
            errors.email = 'Provide a Valid Email Address';
        }

        if (passwordValue === '') {
            errors.password = 'Password is required';
        } else if (passwordValue.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValidEmail = (email) => {
        const crt = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return crt.test(email);
    };

    const submit = async (event) => {
        event.preventDefault();
        setServerMessage("");            
        if (!validInput()) return;
        
        try {
            const response = await axios.post("http://localhost:5000/login", { email, password });

            if (response.status === 200) {
                setServerMessage("Login successful!");
                localStorage.setItem("token", response.data.token);
                navigate("/expense");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    setServerMessage("User not found. Redirecting to sign up...");
                    setTimeout(() => navigate("/signup"), 2000);
                } else if (error.response.status === 401) {
                    setServerMessage("Incorrect password. Try again!");
                } else {
                    setServerMessage("Login failed. Please try again.");
                }
            } else {
                setServerMessage("Server error. Please try again later.");
            }
        }
    };

    return (
        <div className="Container">
            <form className="form" onSubmit={submit}>
                <center>
                    <h1>Login</h1>
                    <div>
                        <label>Email-Id</label>
                        <input 
                            name="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="error">{errors.email || ''}</div>
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="error">{errors.password || ''}</div>
                    </div>
                    <br />
                    <button type="submit">Login</button>
                    <p style={{ fontSize: "0.9rem", marginTop: "1rem" }}>
                        Don't have an account? {" "}
                        <a href="/signup" style={{ color: "#6d2932", textDecoration: "underline", fontWeight: "bold", cursor: "pointer" }}>
                            Sign up
                        </a>
                    </p>
                    <div className="server-message">{serverMessage}</div>
                </center>
            </form>
        </div>
    );
} 

export default Login;
