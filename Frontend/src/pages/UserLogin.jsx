import React, { useContext, useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

const UserLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const { user, setUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userInfo = {
            email,
            password,
        };

        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/user/login`,
            userInfo,
            {withCredentials: true}
        );

        if (response.status === 200) {
            setUser(response.data.data);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.data));
            navigate("/user/dashboard");

            setEmail("");
            setPassword("");
        }
    };

    return (
        <div className=" px-5 py-6 h-screen w-full flex flex-col justify-between">
            <h1 className="text-2xl font-semibold fixed">Uber</h1>

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
                        to={"/user/signup"}
                        className="text-blue-500 underline mt-5 inline-block"
                    >
                        Create New Account
                    </Link>{" "}
                </p>
            </div>

            <div className="mt-6">
                <Link
                    to={"/captain/login"}
                    className="py-3 px-5 flex items-center justify-center bg-[#FA9934]  rounded-md w-full mt-12"
                >
                    Login as Captain
                </Link>
            </div>
        </div>
    );
};

export default UserLogin;
