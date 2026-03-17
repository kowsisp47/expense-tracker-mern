import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordc, setPasswordc] = useState("");
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const navigate = useNavigate();

    const validInput = () => {
        const errors = {};
        if (!username.trim()) errors.username = "Username is required";
        if (!email.trim()) errors.email = "Email is required";
        if (!password.trim()) errors.password = "Password is required";
        if (password.length < 8) errors.password = "Password must be at least 8 characters";
        if (password !== passwordc) errors.passwordc = "Passwords don't match";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const submit = async (event) => {
        event.preventDefault();
        setServerError("");
        if (!validInput()) return;

        try {
            await axios.post("http://localhost:5000/signup", { username, email, password });
            navigate("/");
        } catch (error) {
            setServerError("Signup failed. Please try again.");
        }
    };

    return (
        <div className="container">
            <form id="form" onSubmit={submit}>
                <center>
                    <h1>Sign Up</h1>
                    {serverError && <div className="error">{serverError}</div>}

                    <div>
                        <label>Username</label><br />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <div className="error">{errors.username}</div>
                    </div>

                    <div>
                        <label>Email</label><br />
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="error">{errors.email}</div>
                    </div>

                    <div>
                        <label>Password</label><br />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="error">{errors.password}</div>
                    </div>

                    <div>
                        <label>Confirm Password</label><br />
                        <input
                            type="password"
                            value={passwordc}
                            onChange={(e) => setPasswordc(e.target.value)}
                        />
                        <div className="error">{errors.passwordc}</div>
                    </div>

                    <br />
                    <button type="submit">Sign Up</button>
                </center>
            </form>
        </div>
    );
}

export default Signup;
