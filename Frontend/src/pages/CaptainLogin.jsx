import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { CaptainContext } from "../contexts/CaptainContext";
import axios from "axios";

const CaptainLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const { setCaptain } = useContext(CaptainContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const captainLoginInfo = {
            email,
            password,
        };

        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/captain/login`,
            captainLoginInfo,
            { withCredentials: true }
        );

        if (response.status === 200) {
            setCaptain(response.data.data);

            localStorage.setItem("captain", JSON.stringify(response.data.data));
            localStorage.setItem("cptoken", response.data.token);
            navigate("/cpt-dashboard");
        }

        setEmail("");
        setPassword("");
    };

    return (
        <div className=" px-5 py-6 h-screen w-full flex flex-col justify-between">
            <h1 className="text-2xl font-semibold fixed leading-none">
                Uber <br />
                <span>→</span>
            </h1>

            <div className="form mt-18">
                <form onSubmit={handleSubmit}>
                    <h2 className="font-medium">
                        What's you Email and Password ?
                    </h2>

                    {/* email */}
                    <Input
                        type={"email"}
                        placeholder={"example@gmail.com"}
                        value={email}
                        setValue={setEmail}
                        name={"email"}
                        required
                        className={"mb-3"}
                    />

                    {/* password */}
                    <Input
                        type={"password"}
                        placeholder={"Enter Password"}
                        value={password}
                        setValue={setPassword}
                        name={"password"}
                        required
                        className={"mb-3"}
                    />
                    <button className="w-full py-3 px-4 bg-black text-gray-100 mt-10 rounded-md">
                        Login
                    </button>
                </form>
                <p className="leading-none">
                    New here?{" "}
                    <Link
                        to={"/captain-signup"}
                        className="text-blue-500 underline mt-5 inline-block"
                    >
                        Join as Captain
                    </Link>{" "}
                </p>
            </div>
        </div>
    );
};

export default CaptainLogin;
