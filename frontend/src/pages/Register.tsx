import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth.api";

const Register = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        try {

            setLoading(true);

            await registerUser({

                name,

                email,

                password

            });

            alert("Registration Successful!");

            navigate("/login");

        } catch (error: any) {

            alert(

                error.response?.data?.message ||

                "Registration Failed"

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh"
            }}
        >

            <form
                onSubmit={handleSubmit}
                style={{
                    width: 350,
                    display: "flex",
                    flexDirection: "column",
                    gap: 15
                }}
            >

                <h1>Register</h1>

                <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button disabled={loading}>

                    {loading ? "Creating..." : "Register"}

                </button>

                <Link to="/login">

                    Already have an account? Login

                </Link>

            </form>

        </div>

    );

};

export default Register;